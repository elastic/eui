#!/usr/bin/env node
// Runs eval cases: node run.mjs --cases S1,S2 --arms a,c --k 3 --parallel 6 [--batch name]
// Each run: APFS copy of the arm's base checkout, fresh CLAUDE_CONFIG_DIR, claude -p, then the
// diff and transcript are saved under results/<batch>/<runId>/ for grade.mjs.
import { spawn, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { parseArgs } from 'node:util';
import { cases } from './cases.mjs';

const ROOT = path.join(os.homedir(), 'eui-eval');
// Neutral names: the agent sees its cwd, so nothing in it should say "eval" or "eui".
const WORK = path.join(os.homedir(), 'kbx');
const BASES = { a: path.join(WORK, 'base-a/kibana'), b: path.join(WORK, 'base-b/kibana'), c: path.join(WORK, 'base-c/kibana'), d: path.join(WORK, 'base-d/kibana'), l: path.join(WORK, 'base-l/kibana'), t: path.join(WORK, 'base-t/kibana') };
const TOKEN_FILE = path.join(ROOT, '.oauth-token');
// pi runs through the user's GitHub Copilot login: each run gets a fresh PI_CODING_AGENT_DIR holding
// only a copy of auth.json, so no personal skills, extensions or AGENTS.md leak in. pi has no sandbox
// of its own, so it runs under srt (@anthropic-ai/sandbox-runtime), the one Claude Code's Bash uses.
const PI_BIN = path.join(os.homedir(), '.nvm/versions/node/v24.22.1/bin/pi');
const SRT_BIN = path.join(path.dirname(PI_BIN), 'srt');
const PI_AUTH = path.join(os.homedir(), '.pi/agent/auth.json');

const { values } = parseArgs({
  options: {
    cases: { type: 'string', default: 'all' },
    arms: { type: 'string', default: 'a,c' },
    k: { type: 'string', default: '3' },
    parallel: { type: 'string', default: '6' },
    batch: { type: 'string', default: new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-') },
    keep: { type: 'boolean', default: false },
    agent: { type: 'string', default: 'claude' },
    effort: { type: 'string', default: 'medium' },
    model: { type: 'string' },
  },
});

// Dropped cases stay in cases.mjs so earlier batches still grade; name one in --cases to run it.
const selected = values.cases === 'all' ? cases.filter((c) => !c.dropped) : cases.filter((c) => values.cases.split(',').includes(c.id));
const arms = values.arms.split(',');
const k = Number(values.k);
const batchDir = path.join(ROOT, 'results', values.batch);
fs.mkdirSync(batchDir, { recursive: true });

const pi = values.agent === 'pi';
const MODEL = values.model ?? (pi ? 'github-copilot/gpt-6.1-sol' : 'claude-sonnet-5-5');
// Pinned in both harnesses: left unset, each used its own default and runs weren't matched.
const EFFORT = values.effort;
const token = pi ? null : fs.readFileSync(TOKEN_FILE, 'utf8').trim();

const queue = [];
for (const c of selected) for (const arm of arms) for (let i = 1; i <= k; i++) queue.push({ c, arm, i });

// node_modules is a symlink to the base, and Claude Code resolves it: without the base's node_modules
// as an extra directory, Read, `cd` and some greps into the docs or EUI source were denied (P1-c-1).
// Edits stay denied there because every run shares it.
// Agents running the type check themselves took P1 runs from ~11 to ~28 min; grade.mjs runs tsc and Jest anyway.
const NO_SLOW = "Don't run a type check (`node scripts/type_check` or `tsc`) or Jest tests, and don't write new tests: they take too long in this checkout.";
// Arm L tests whether lint warnings alone steer the agent. `scripts/check.js` sees no changed files in the shallow base, so it lints the files directly.
const checksFor = (arm) => arm === 'l'
  ? `${NO_SLOW} Before finishing, lint the files you changed with \`node scripts/lint.js <files>\` and fix what it reports.`
  : `${NO_SLOW} Don't run lint either: it's checked after you finish.`;

const settingsFor = (arm) => JSON.stringify({
  sandbox: { enabled: true, autoAllowBashIfSandboxed: true },
  permissions: {
    additionalDirectories: [path.join(BASES[arm], 'node_modules')],
    deny: ['WebFetch', 'WebSearch', `Edit(/${BASES[arm]}/**)`],
  },
});

// Everything that shapes a run except the case prompt: a resumed batch must not mix experiments
// (the type-check rule changed between P1 batches).
const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);
function hashTree(dir) {
  if (!fs.existsSync(dir)) return null;
  const h = createHash('sha256');
  for (const f of fs.readdirSync(dir, { recursive: true }).sort()) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isFile()) h.update(f).update(fs.readFileSync(p));
  }
  return h.digest('hex').slice(0, 16);
}
const git = (cwd, ...a) => execFileSync('git', a, { cwd, maxBuffer: 256 << 20 }).toString();
const envFp = Object.fromEntries(arms.map((arm) => [arm, {
  head: git(BASES[arm], 'rev-parse', 'HEAD').trim(),
  dirty: sha(git(BASES[arm], 'diff', 'HEAD') + git(BASES[arm], 'ls-files', '--others', '--exclude-standard')),
  docs: hashTree(path.join(BASES[arm], 'node_modules/@elastic/eui/docs')),
  settings: sha(settingsFor(arm)),
}]));
const common = { agent: values.agent, model: MODEL, effort: EFFORT, cli: execFileSync(pi ? PI_BIN : 'claude', ['--version']).toString().trim(), runner: sha(fs.readFileSync(new URL(import.meta.url))) };
const fingerprint = (c, arm) => ({ ...common, ...envFp[arm], prompt: sha(`${c.prompt}\n\n${checksFor(arm)}`), budget: c.budgetUsd ?? 4, timeout: c.timeoutMin ?? 20 });

// Refuse to resume into a batch whose finished runs used a different setup.
const mismatched = queue.flatMap(({ c, arm, i }) => {
  const metaFile = path.join(batchDir, `${c.id}-${arm}-${i}`, 'meta.json');
  if (!fs.existsSync(metaFile)) return [];
  const { fingerprint: fp } = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
  const want = fingerprint(c, arm);
  const diff = fp ? Object.keys(want).filter((k) => fp[k] !== want[k]) : ['no fingerprint'];
  return diff.length ? [`${c.id}-${arm}-${i}: ${diff.join(', ')}`] : [];
});
if (mismatched.length) {
  console.error(`Batch ${values.batch} has runs from a different setup; use a new --batch.\n${mismatched.join('\n')}`);
  process.exit(1);
}

async function runOne({ c, arm, i }) {
  const runId = `${c.id}-${arm}-${i}`;
  const out = path.join(batchDir, runId);
  if (fs.existsSync(path.join(out, 'meta.json'))) return log(`${runId} skip (done)`);
  fs.mkdirSync(out, { recursive: true });

  const runRoot = path.join(WORK, 'r', `${Date.now().toString(36)}${i}`);
  const cwd = path.join(runRoot, 'kibana');
  fs.mkdirSync(runRoot, { recursive: true });
  const t0 = Date.now();
  // A full APFS copy takes ~3.5 min (node_modules + in-repo .pnpm-store). Copy the rest (~45s) and
  // symlink node_modules to the arm's base: @kbn links are relative, so they resolve into the base's
  // identical sources, and the sandbox keeps the agent from writing there.
  fs.mkdirSync(cwd);
  for (const entry of fs.readdirSync(BASES[arm])) {
    if (entry === 'node_modules' || entry === '.pnpm-store') continue;
    execFileSync('cp', ['-c', '-R', path.join(BASES[arm], entry), path.join(cwd, entry)]);
  }
  fs.symlinkSync(path.join(BASES[arm], 'node_modules'), path.join(cwd, 'node_modules'));
  // .gitignore's `node_modules/` only matches directories, not the symlink.
  fs.appendFileSync(path.join(cwd, '.git/info/exclude'), '\n/node_modules\n');
  const copySec = (Date.now() - t0) / 1000;

  const configDir = path.join(ROOT, 'cfg', runId);
  fs.rmSync(configDir, { recursive: true, force: true });
  fs.mkdirSync(configDir, { recursive: true });

  const args = pi ? [
    '-p', `${c.prompt}\n\n${checksFor(arm)}`,
    '--model', MODEL,
    '--thinking', EFFORT,
    '--mode', 'json',
    '--no-session',
    '--no-extensions', '--no-skills', '--no-prompt-templates', '--no-themes', '--no-mcp',
    // Arm D: only the EUI skill; --no-skills still loads paths passed with --skill.
    ...(arm === 'd' ? ['--skill', path.join(cwd, '.agents/skills/eui')] : []),
    // Arm C: Kibana's own kibana-ui skill when the base has it (Claude loads it via project settings).
    ...(arm === 'c' && fs.existsSync(path.join(cwd, '.agents/skills/kibana-ui')) ? ['--skill', path.join(cwd, '.agents/skills/kibana-ui')] : []),
  ] : [
    '-p', `${c.prompt}\n\n${checksFor(arm)}`,
    '--model', MODEL,
    '--effort', EFFORT,
    '--output-format', 'stream-json', '--verbose',
    '--no-session-persistence',
    '--strict-mcp-config',
    '--setting-sources', 'project',
    '--settings', settingsFor(arm),
    '--permission-mode', 'acceptEdits',
    '--disallowedTools', 'WebFetch', 'WebSearch',
    '--max-budget-usd', String(c.budgetUsd ?? 4),
  ];
  if (pi) {
    fs.copyFileSync(PI_AUTH, path.join(configDir, 'auth.json'));
    // Kept in the results dir, which the agent can't write. allowRead wins over denyRead, so other
    // runs' copies and configs stay hidden while this run's are readable.
    fs.writeFileSync(path.join(out, 'srt.json'), JSON.stringify({
      network: { allowedDomains: ['*.githubcopilot.com', 'api.github.com'], deniedDomains: [] },
      filesystem: {
        denyRead: ['~/.ssh', '~/.pi', TOKEN_FILE, path.join(ROOT, 'results'), path.join(ROOT, 'cfg'), path.join(WORK, 'r')],
        allowRead: [runRoot, configDir],
        allowWrite: [runRoot, configDir, '/tmp', '/private/tmp', fs.realpathSync(os.tmpdir())],
        denyWrite: [],
      },
    }, null, 2));
  }
  const env = {
    PATH: process.env.PATH,
    HOME: process.env.HOME,
    TERM: 'dumb',
    LANG: process.env.LANG ?? 'en_US.UTF-8',
    // Node's fetch ignores srt's HTTPS_PROXY without NODE_USE_ENV_PROXY. NODE_USE_SYSTEM_CA (set in the
    // user's shell, not passed here) reads keychain trust settings, which the sandbox blocks.
    ...(pi ? { PI_CODING_AGENT_DIR: configDir, PI_TELEMETRY: '0', NODE_USE_ENV_PROXY: '1' } : { CLAUDE_CONFIG_DIR: configDir, CLAUDE_CODE_OAUTH_TOKEN: token }),
    // @kbn/swc-register's LMDB cache aborts node (exit 134, no output) inside the sandbox, so every
    // `node scripts/jest` and other setup_node_env script died and agents asked to leave the sandbox.
    DISABLE_SWC_REGISTER_CACHE: '1',
    // Keep the CLI at one version across a multi-hour batch.
    DISABLE_AUTOUPDATER: '1',
  };

  // File fds, not pipes: Node writes to pipes asynchronously on macOS, and the CLI's exit dropped
  // the tail of the stream (S1-c-1 lost its result event).
  const transcript = fs.openSync(path.join(out, pi ? 'pi.jsonl' : 'transcript.jsonl'), 'w');
  const stderr = fs.openSync(path.join(out, 'stderr.log'), 'w');
  const timeoutMin = c.timeoutMin ?? 20;
  log(`${runId} start (copy ${copySec.toFixed(0)}s) ${cwd}`);
  const started = Date.now();
  const { code, timedOut } = await new Promise((resolve) => {
    const child = pi
      ? spawn(SRT_BIN, ['-s', path.join(out, 'srt.json'), PI_BIN, ...args], { cwd, env, stdio: ['ignore', transcript, stderr] })
      : spawn('claude', args, { cwd, env, stdio: ['ignore', transcript, stderr] });
    fs.closeSync(transcript);
    fs.closeSync(stderr);
    let timedOut = false;
    const timer = setTimeout(() => { timedOut = true; child.kill('SIGTERM'); setTimeout(() => child.kill('SIGKILL'), 10_000); }, timeoutMin * 60_000);
    child.on('close', (code) => { clearTimeout(timer); resolve({ code, timedOut }); });
  });

  if (pi) {
    fs.writeFileSync(path.join(out, 'transcript.jsonl'), piToClaude(fs.readFileSync(path.join(out, 'pi.jsonl'), 'utf8')));
    fs.rmSync(configDir, { recursive: true, force: true });
  }

  // Untracked files are part of the change; add -N makes them show up in git diff.
  // A git command the agent started (or that was killed with it) can leave .git/index.lock behind.
  const lock = path.join(cwd, '.git/index.lock');
  for (let t = 0; t < 20 && fs.existsSync(lock); t++) execFileSync('sleep', ['0.5']);
  fs.rmSync(lock, { force: true });
  execFileSync('git', ['add', '-N', '.'], { cwd });
  const diff = execFileSync('git', ['diff', 'HEAD'], { cwd, maxBuffer: 256 << 20 }).toString();
  fs.writeFileSync(path.join(out, 'diff.patch'), diff);
  const meta = { runId, case: c.id, arm, i, cwd, exitCode: code, timedOut, wallSec: (Date.now() - started) / 1000, copySec, model: MODEL, fingerprint: fingerprint(c, arm) };
  // The exact text the agent got, so a later prompt edit can't be confused with this run's.
  fs.writeFileSync(path.join(out, 'prompt.txt'), args[1]);
  fs.writeFileSync(path.join(out, 'meta.json'), JSON.stringify(meta, null, 2));
  // Keep the copy until grading (eslint and tsc need it); grade.mjs --cleanup removes it.
  log(`${runId} done exit=${code}${timedOut ? ' TIMEOUT' : ''} ${(meta.wallSec / 60).toFixed(1)}min`);
}

// Rewrites pi's json events into the stream-json shape grade.mjs reads. Cost is pi's list-price
// estimate: Copilot bills by request, not tokens.
const PI_TOOLS = { read: 'Read', bash: 'Bash', edit: 'Edit', write: 'Write', grep: 'Grep', find: 'Glob', ls: 'LS' };
function piToClaude(raw) {
  const out = [];
  let turns = 0, cost = 0, last;
  for (const line of raw.split('\n')) {
    let e;
    try { e = JSON.parse(line); } catch { continue; }
    if (e.type !== 'message_end') continue;
    const m = e.message;
    if (m.role === 'assistant') {
      turns++; cost += m.usage?.cost?.total ?? 0; last = m;
      const content = m.content.flatMap((p) => p.type === 'text' ? [{ type: 'text', text: p.text }]
        : p.type === 'toolCall' ? [{ type: 'tool_use', id: p.id, name: PI_TOOLS[p.name] ?? p.name, input: { ...p.arguments, ...(p.arguments.path && { file_path: p.arguments.path }) } }] : []);
      out.push({ type: 'assistant', message: { content } });
    } else if (m.role === 'toolResult') {
      out.push({ type: 'user', message: { content: [{ type: 'tool_result', tool_use_id: m.toolCallId, is_error: m.isError, content: m.content }] } });
    }
  }
  if (last) out.push({ type: 'result', subtype: last.stopReason === 'error' ? 'error' : 'success', num_turns: turns, total_cost_usd: cost, result: last.content.find((p) => p.type === 'text')?.text ?? '', error: last.errorMessage });
  return out.map((x) => JSON.stringify(x)).join('\n') + '\n';
}

function log(msg) {
  console.log(`[${new Date().toISOString().slice(11, 19)}] ${msg}`);
}

const parallel = Number(values.parallel);
let next = 0;
await Promise.all(
  Array.from({ length: Math.min(parallel, queue.length) }, async () => {
    while (next < queue.length) {
      const item = queue[next++];
      try { await runOne(item); } catch (e) { log(`${item.c.id}-${item.arm}-${item.i} harness error: ${e.message}`); }
    }
  })
);
log(`batch ${values.batch}: ${queue.length} runs -> ${batchDir}`);
