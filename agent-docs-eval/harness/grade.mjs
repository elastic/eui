#!/usr/bin/env node
// Grades a batch: node grade.mjs <batch> [--no-lint] [--checks all|runId,runId] [--cleanup]
// Run outside the sandbox: lint, tsc and jest need the run copies under ~/kbx/r.
// Writes results/<batch>/grades.json and report.md.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { createRequire } from 'node:module';
import { cases } from './cases.mjs';
import { analyze } from './analyze.mjs';

const ROOT = path.join(os.homedir(), 'eui-eval');
const BASE_A = path.join(os.homedir(), 'kbx/base-a/kibana');
const DOCS_MARK = '@elastic/eui/docs';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { lint: { type: "boolean", default: true }, "no-lint": { type: "boolean" }, checks: { type: 'string', default: '' }, cleanup: { type: 'boolean', default: false } },
});
const batchDir = path.join(ROOT, 'results', positionals[0]);
const caseById = Object.fromEntries(cases.map((c) => [c.id, c]));

const iconMap = createRequire(path.join(BASE_A, 'package.json'))('@elastic/eui/lib/components/icon/icon_map.js').typeToPathMap;
const validIcon = (v) => typeof v !== 'string' || v in iconMap || /^(https?:|data:|\/)/.test(v) || /[{(]/.test(v);

function readTranscript(file) {
  const events = fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  // A run that waits on a background task resumes and emits another result event. Cost is
  // cumulative, so the last one has it; turns are per segment and need summing.
  const results = events.filter((e) => e.type === 'result');
  const result = results.at(-1);
  const turns = results.length ? results.reduce((n, e) => n + (e.num_turns ?? 0), 0) : null;
  const calls = new Map();
  let docsBytes = 0;
  const docsCalls = [];
  // A grep -l or ls of the docs folder touches the docs but reads nothing (S8-c). Reads and pages count
  // only when the call succeeded: a denied command delivers nothing (P1-c-1, step-P1-permfix).
  const docsPages = new Set();
  let docsReads = 0;
  let docsDenied = 0;
  const outside = [];
  const toolCounts = {};
  const lookups = { euiSrc: 0, examples: 0 };
  for (const e of events) {
    const content = e.message?.content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (part.type === 'tool_use') {
        const input = JSON.stringify(part.input);
        toolCounts[part.name] = (toolCounts[part.name] ?? 0) + 1;
        const isDocs = input.includes(DOCS_MARK) || /eui\/docs\b/.test(input);
        calls.set(part.id, { name: part.name, isDocs, read: isDocs ? docsRead(part) : null });
        if (isDocs) docsCalls.push(`${part.name} ${input.slice(0, 160)}`);
        // Lookup effort: digging through EUI's installed source/types, or grepping Kibana for EUI usage
        // to copy. Paths only: edits (Write/Edit, or Bash heredoc scripts) contain `from '@elastic/eui'`.
        if (part.name !== 'Write' && part.name !== 'Edit') {
          if (/node_modules\/@elastic\/eui\b|@elastic\/eui\/\w/.test(input.replaceAll(DOCS_MARK, ''))) lookups.euiSrc++;
          else if (!isDocs && /\bEui[A-Z]\w*/.test(input) && (part.name === 'Grep' || /\b(grep|rg|find)\b/.test(input))) lookups.examples++;
        }
        for (const m of input.matchAll(/(?:\/Users\/[^\s"'\\]+|~\/[^\s"'\\]+)/g)) outside.push(m[0]);
      } else if (part.type === 'tool_result') {
        const call = calls.get(part.tool_use_id);
        if (!call?.isDocs) continue;
        if (part.is_error) { docsDenied++; continue; }
        if (call.read) { docsReads++; for (const f of call.read) docsPages.add(f.replace(/^.*eui\/docs\//, '')); }
        const c = part.content;
        docsBytes += typeof c === 'string' ? c.length : Array.isArray(c) ? c.reduce((s, x) => s + (x.text?.length ?? 0), 0) : 0;
      }
    }
  }
  return { result, turns, docsBytes, docsCalls, docsReads, docsDenied, docsPages: [...docsPages], outside, toolCounts, lookups };
}

// Returns the .md files a docs call showed content from (possibly none, e.g. grep -n over the folder),
// or null when it only listed files.
function docsRead(part) {
  const { name, input } = part;
  if (name === 'Read') return [input.file_path ?? ''];
  if (name === 'Grep') return input.output_mode === 'content' ? [input.path ?? ''].filter((f) => f.endsWith('.md')) : null;
  if (name !== 'Bash') return null;
  const listing = (seg) => /^\s*(ls|find|cd|tree)\b/.test(seg) || /^\s*(grep|rg)\b.*\s-[a-zA-Z]*[lLc][a-zA-Z]*\b/.test(seg);
  // Blank out quoted patterns first: grep alternations contain pipes.
  const segs = (input.command ?? '').replace(/"(?:\\.|[^"\\])*"|'[^']*'/g, '""').split(/\|\||&&|[|;\n]/).filter(
    (seg) => /^\s*(cat|sed|head|tail|less|awk|grep|rg)\b/.test(seg) && !listing(seg) && /eui\/docs\b|\.md\b/.test(seg)
  );
  return segs.length ? segs.flatMap((seg) => seg.match(/[\w./@-]+\.md\b/g) ?? []) : null;
}

function cleanChecks(a) {
  const issues = [];
  for (const e of a.els) if (e.isNew && /^(select|input|table|button|textarea)$/.test(e.name)) issues.push(`raw <${e.name}> ${e.file}:${e.line}`);
  for (const m of a.added.matchAll(/\.eui(?!Theme\b)[A-Z]\w*|className=["'{`][^\n]*?\beui[A-Z]\w*/g)) issues.push(`eui internal: ${m[0].slice(0, 80)}`);
  if (/!important/.test(a.added)) issues.push('!important');
  for (const i of a.icons) if (i.isNew && !validIcon(i.value)) issues.push(`invalid icon "${i.value}" ${i.file}:${i.line}`);
  return issues;
}

function lintEuiCounts(cwd, files) {
  const lintable = files.filter((f) => /\.(tsx?|jsx?)$/.test(f) && fs.existsSync(path.join(cwd, f)));
  if (!lintable.length) return {};
  // Kibana runs the @elastic/eui rules in oxlint, not eslint (.oxlint/eui.mts).
  const r = spawnSync('node_modules/.bin/oxlint', ['-c', 'oxlint.config.mjs', '--format', 'json', ...lintable], { cwd, maxBuffer: 64 << 20, encoding: 'utf8' });
  const counts = {};
  try {
    for (const d of JSON.parse(r.stdout).diagnostics) if (d.code?.startsWith('@elastic/eui(')) counts[d.code] = (counts[d.code] ?? 0) + 1;
  } catch {
    counts['eslint-error'] = 1;
  }
  return counts;
}

function newLintViolations(cwd, files) {
  const after = lintEuiCounts(cwd, files);
  const before = lintEuiCounts(BASE_A, files.filter((f) => fs.existsSync(path.join(BASE_A, f))));
  const out = {};
  for (const [rule, n] of Object.entries(after)) if (n > (before[rule] ?? 0)) out[rule] = n - (before[rule] ?? 0);
  return out;
}

function gradeRun(dir) {
  const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
  const c = caseById[meta.case];
  const t = readTranscript(path.join(dir, 'transcript.jsonl'));
  const r = t.result;
  const g = {
    runId: meta.runId, case: meta.case, arm: meta.arm,
    cost: r?.total_cost_usd ?? null,
    turns: t.turns,
    wallMin: +(meta.wallSec / 60).toFixed(1),
    tokens: r?.usage ? { in: r.usage.input_tokens, out: r.usage.output_tokens, cacheRead: r.usage.cache_read_input_tokens, cacheWrite: r.usage.cache_creation_input_tokens } : null,
    docsRead: t.docsReads > 0,
    docsTouched: t.docsCalls.length > 0,
    docsPages: t.docsPages,
    docsDenied: t.docsDenied,
    docsBytes: t.docsBytes,
    docsCalls: t.docsCalls,
    toolCounts: t.toolCounts,
    lookups: t.lookups,
  };
  const baseModules = path.join(os.homedir(), `kbx/base-${meta.arm}/kibana/node_modules`);
  const outside = [...new Set(t.outside.filter((p) => !p.startsWith(meta.cwd) && !p.startsWith(baseModules)))];
  if (outside.length) g.outside = outside;
  // Timeout, budget and turn limits are the agent's own bounds and count as failed attempts: excluding
  // them would drop the slower arm's hardest runs from N. Only a missing result is unavailable.
  const bounded = meta.timedOut ? 'timeout' : ['error_max_budget_usd', 'error_max_turns'].includes(r?.subtype) ? r.subtype : null;
  if (!bounded && !r) g.unavailable = 'no result event';
  else if (!bounded && r.subtype !== 'success') g.unavailable = r.subtype;
  if (g.unavailable) return g;
  if (bounded) {
    Object.assign(g, { failed: bounded, pick: false, use: false, clean: false, why: bounded });
    if (c.kind === 'composite') {
      g.checklist = Object.fromEntries(Object.keys(c.checklist).map((k) => [k, false]));
      g.checklistScore = `0/${Object.keys(c.checklist).length}`;
    }
    return g;
  }

  const patch = fs.readFileSync(path.join(dir, 'diff.patch'), 'utf8');
  if (!patch.trim()) { Object.assign(g, { pick: false, use: false, clean: true, why: 'empty diff' }); return g; }
  // analyze() parses post-change files from the run copy; once ~/kbx/r is cleaned, every pick would read as false.
  if (!fs.existsSync(meta.cwd)) { g.unavailable = 'run copy deleted'; return g; }
  const a = analyze(meta.cwd, patch);
  g.files = a.files;
  const unresolved = a.unresolvedIcons.filter((i) => i.isNew);
  if (unresolved.length) g.unresolvedIcons = unresolved.map((i) => `${i.el} ${i.expr} ${i.file}:${i.line}`);

  const clean = cleanChecks(a);
  if (values.lint && !values["no-lint"]) {
    const lint = newLintViolations(meta.cwd, a.changedCode);
    for (const [rule, n] of Object.entries(lint)) clean.push(`${rule} x${n}`);
  }
  g.cleanIssues = clean;
  g.clean = clean.length === 0;
  g.iconsValid = !clean.some((x) => x.startsWith('invalid icon'));
  if (c.kind === 'heldout') return g;

  if (c.kind === 'composite') {
    g.checklist = Object.fromEntries(Object.entries(c.checklist).map(([k, fn]) => [k, !!fn(a)]));
    g.checklistScore = `${Object.values(g.checklist).filter(Boolean).length}/${Object.keys(g.checklist).length}`;
    g.extra = c.extra?.(a);
    return g;
  }

  const p = c.pick(a);
  g.pick = p.ok;
  g.pickWhy = p.why;
  if (g.pick && c.use) {
    g.useChecks = c.use(a);
    g.use = Object.values(g.useChecks).every(Boolean);
  } else g.use = g.pick && !c.use;
  g.extra = c.extra?.(a);
  return g;
}

function median(xs) {
  const s = xs.filter((x) => x != null).sort((x, y) => x - y);
  if (!s.length) return null;
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
const usd = (x) => (x == null ? '–' : `$${x.toFixed(2)}`);

const runDirs = fs.readdirSync(batchDir).map((d) => path.join(batchDir, d)).filter((d) => fs.existsSync(path.join(d, 'meta.json')));
const grades = runDirs.map(gradeRun);
const touchOnly = (k) => (k ? ` (+${k} touched)` : '');
const lookupsOf = (g) => (g.lookups ? g.lookups.euiSrc + g.lookups.examples : null);

// Human verdicts from transcript and diff review, one entry per reviewed run, agreements included:
// { "<runId>": { pick?, use?, clean?, checklist?: { item: bool }, works?, note } }. `works` is task
// behavior (renders, does what was asked), kept apart from the EUI-pattern verdicts. The report uses
// reviewed verdicts; `auto` keeps the grader's so agreement can be reported.
const reviewFile = path.join(batchDir, 'review.json');
const review = fs.existsSync(reviewFile) ? JSON.parse(fs.readFileSync(reviewFile, 'utf8')) : {};
const VERDICTS = ['pick', 'use', 'clean'];
for (const g of grades) {
  const r = review[g.runId];
  if (!r || g.unavailable) continue;
  g.auto = { pick: g.pick, use: g.use, clean: g.clean, ...(g.checklist && { checklist: { ...g.checklist } }) };
  for (const k of VERDICTS) if (r[k] !== undefined) g[k] = r[k];
  if (r.checklist && g.checklist) {
    Object.assign(g.checklist, r.checklist);
    g.checklistScore = `${Object.values(g.checklist).filter(Boolean).length}/${Object.keys(g.checklist).length}`;
  }
  if (r.works !== undefined) g.works = r.works;
  if (r.conventions !== undefined) g.conventions = r.conventions;
  g.reviewNote = r.note;
}
const disagreements = (g) => [
  ...VERDICTS.filter((k) => g.auto[k] !== undefined && g.auto[k] !== g[k]),
  ...Object.keys(g.auto.checklist ?? {}).filter((k) => g.auto.checklist[k] !== g.checklist[k]),
];

// tsc on the case project and jest on touched or co-located tests. ~4 min per run, so only composite
// runs get them by default; --checks adds runs (or all).
const checkEnv = { ...process.env, DISABLE_SWC_REGISTER_CACHE: '1' };
const plain = (s) => s.replace(/\x1b\[[0-9;]*m/g, '');
const checkIds = values.checks.split(',').filter(Boolean);
const wantsChecks = (g) => checkIds.includes('all') || checkIds.includes(g.runId) || ['composite', 'heldout'].includes(caseById[g.case]?.kind);
for (const g of grades.filter((x) => !x.unavailable && x.files?.length && wantsChecks(x))) {
  const meta = JSON.parse(fs.readFileSync(path.join(batchDir, g.runId, 'meta.json'), 'utf8'));
  const c = caseById[meta.case];
  const t0 = Date.now();
  const tsc = spawnSync('node', ['scripts/type_check', '--project', path.join(c.project, 'tsconfig.json')], { cwd: meta.cwd, env: checkEnv, encoding: 'utf8', maxBuffer: 256 << 20 });
  // Only errors in files the run changed count: with node_modules symlinked to the base, tsc -b fails
  // upstream (TS2883 "not portable" in @kbn/test-jest-helpers, then missing exports in its importers).
  const tscOut = plain(tsc.stdout + tsc.stderr).split('\n').map((l) => l.replace(/^\s*proc \[tsc\]\s*/, ''));
  const errs = tscOut.filter((l) => /error TS\d+/.test(l) && g.files.some((f) => l.startsWith(`${f}:`)) && !/TS2883|@kbn\/test-jest-helpers/.test(l));
  g.tsc = errs.length ? `fail: ${errs.slice(0, 5).join(' | ')}` : tsc.status === 0 || tscOut.some((l) => /error TS\d+/.test(l)) ? 'pass' : `error: exit ${tsc.status}`;

  const tests = new Set(g.files.filter((f) => /\.test\.[jt]sx?$/.test(f) && fs.existsSync(path.join(meta.cwd, f))));
  for (const f of g.files) for (const ext of ['.test.tsx', '.test.ts']) {
    const t = f.replace(/\.[jt]sx?$/, ext);
    if (t !== f && fs.existsSync(path.join(meta.cwd, t))) tests.add(t);
  }
  if (tests.size) {
    const jest = spawnSync('node', ['scripts/jest', '--ci', ...tests], { cwd: meta.cwd, env: checkEnv, encoding: 'utf8', maxBuffer: 64 << 20 });
    const summary = plain(jest.stdout + jest.stderr).split('\n').find((l) => /^Tests:/.test(l))?.trim() ?? `exit ${jest.status}`;
    g.jest = jest.status === 0 ? `pass (${tests.size} files)` : `fail: ${summary}`;
  } else g.jest = 'none';
  g.checksSec = Math.round((Date.now() - t0) / 1000);
  console.error(`${g.runId}: tsc ${g.tsc.slice(0, 80)}, jest ${g.jest} (${g.checksSec}s)`);
}

fs.writeFileSync(path.join(batchDir, 'grades.json'), JSON.stringify(grades, null, 2));

// Report
const lines = [`# Batch ${positionals[0]}`, '', 'Timeouts and budget or turn limits count as failed runs. Pass rates exclude only unavailable runs (no result event) from N.', ''];
lines.push('EUI lookups: tool calls into installed EUI source/types plus Kibana greps for Eui* usage (docs reads excluded).', '', 'Docs read: a docs call that showed page content and succeeded (denied calls are reported per run). "Touched": only listed or grepped the docs folder.', '');
lines.push('| Case | Arm | Pick | Pick+Use | Clean | Docs read | tsc ok | jest ok | Med. EUI lookups | Med. turns | Med. cost | Total | $/pass | Unavail. |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
const perArm = {};
for (const c of cases.filter((x) => !['composite', 'heldout'].includes(x.kind))) {
  for (const arm of ['a', 'b', 'c', 'd', 'l']) {
    const gs = grades.filter((g) => g.case === c.id && g.arm === arm);
    if (!gs.length) continue;
    const ok = gs.filter((g) => !g.unavailable);
    const n = (f) => `${ok.filter(f).length}/${ok.length}`;
    // tsc/jest are opt-in, so their N is the runs that got them.
    const ran = (k, f) => { const rs = ok.filter((g) => g[k]); return rs.length ? `${rs.filter(f).length}/${rs.length}` : '–'; };
    const total = gs.reduce((s, g) => s + (g.cost ?? 0), 0);
    const passes = ok.filter((g) => g.use).length;
    const pa = (perArm[arm] ??= { runs: 0, ok: 0, pick: 0, use: 0, clean: 0, docs: 0, touchOnly: 0, tsc: 0, jest: 0, checked: 0, cost: 0, costs: [], turns: [], lookups: [] });
    pa.runs += gs.length; pa.ok += ok.length; pa.pick += ok.filter((g) => g.pick).length; pa.use += passes; pa.clean += ok.filter((g) => g.clean).length;
    pa.docs += ok.filter((g) => g.docsRead).length; pa.touchOnly += ok.filter((g) => g.docsTouched && !g.docsRead).length; pa.tsc += ok.filter((g) => g.tsc === 'pass').length; pa.jest += ok.filter((g) => g.jest && !g.jest.startsWith('fail')).length; pa.checked += ok.filter((g) => g.tsc).length; pa.cost += total; pa.costs.push(...gs.map((g) => g.cost)); pa.turns.push(...gs.map((g) => g.turns)); pa.lookups.push(...ok.map(lookupsOf));
    lines.push(`| ${c.id} | ${arm.toUpperCase()} | ${n((g) => g.pick)} | ${n((g) => g.use)} | ${n((g) => g.clean)} | ${n((g) => g.docsRead)}${touchOnly(ok.filter((g) => g.docsTouched && !g.docsRead).length)} | ${ran('tsc', (g) => g.tsc === 'pass')} | ${ran('jest', (g) => !g.jest.startsWith('fail'))} | ${median(ok.map(lookupsOf)) ?? '–'} | ${median(gs.map((g) => g.turns)) ?? '–'} | ${usd(median(gs.map((g) => g.cost)))} | ${usd(total)} | ${passes ? usd(total / passes) : '–'} | ${gs.length - ok.length} |`);
  }
}
for (const [arm, pa] of Object.entries(perArm)) {
  lines.push(`| **All** | ${arm.toUpperCase()} | ${pa.pick}/${pa.ok} | ${pa.use}/${pa.ok} | ${pa.clean}/${pa.ok} | ${pa.docs}/${pa.ok}${touchOnly(pa.touchOnly)} | ${pa.checked ? `${pa.tsc}/${pa.checked} | ${pa.jest}/${pa.checked}` : '– | –'} | ${median(pa.lookups) ?? '–'} | ${median(pa.turns)} | ${usd(median(pa.costs))} | ${usd(pa.cost)} | ${pa.use ? usd(pa.cost / pa.use) : '–'} | ${pa.runs - pa.ok} |`);
}

const reviewed = grades.filter((g) => g.auto);
const unreviewed = grades.filter((g) => !g.auto && !g.unavailable);
lines.push('', `## Review: ${reviewed.length} reviewed, ${unreviewed.length} not reviewed`, '');
if (reviewed.length) {
  const agree = reviewed.filter((g) => !disagreements(g).length);
  lines.push(`Grader agrees with the human verdict on ${agree.length}/${reviewed.length} reviewed runs (checklist items included).`, '');
  for (const g of reviewed) {
    const d = disagreements(g);
    if (d.length) lines.push(`- ${g.runId}: changed ${d.join(', ')}. ${g.reviewNote ?? ''}`);
  }
  const works = reviewed.filter((g) => g.works !== undefined);
  if (works.length) lines.push('', `Works (task behavior, reviewed): ${works.map((g) => `${g.runId}=${g.works}`).join(', ')}`);
}
if (unreviewed.length) lines.push('', `Not reviewed: ${unreviewed.map((g) => g.runId).join(', ')}`);

const comp = grades.filter((g) => caseById[g.case]?.kind === 'composite');
if (comp.length) {
  lines.push('', '## Composite', '', '| Run | Checklist | Clean issues | Docs read | EUI lookups | Turns | Cost | Wall min | tsc | jest |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  for (const g of comp) lines.push(`| ${g.runId} | ${g.unavailable ?? g.checklistScore} | ${g.cleanIssues?.length ?? '–'} | ${g.docsRead ? `yes (${(g.docsBytes / 1024).toFixed(0)}KB)` : 'no'} | ${lookupsOf(g) ?? '–'} | ${g.turns ?? '–'} | ${usd(g.cost)} | ${g.wallMin} | ${g.tsc ?? '–'} | ${g.jest ?? '–'} |`);
}

// Held-out primary outcome: correct = works (blind review) && tsc pass && no invalid icon. Failed and
// empty runs are incorrect without review; other unreviewed runs stay pending (null).
const held = grades.filter((g) => caseById[g.case]?.kind === 'heldout' && !g.unavailable);
for (const g of held) g.correct = g.failed || g.why === 'empty diff' ? false : g.works === undefined ? null : g.works && g.tsc === 'pass' && g.iconsValid;
if (held.length) {
  const ids = [...new Set(held.map((g) => g.case))].sort((x, y) => x.localeCompare(y, undefined, { numeric: true }));
  const cnt = (gs, f) => `${gs.filter(f).length}/${gs.length}`;
  lines.push('', '## Held-out', '', 'Correct = works (blind review) and tsc pass and no invalid icon. Conventions (review) and lint are secondary.', '');
  lines.push('| Ticket | Arm | Correct | Works | tsc ok | Icons ok | Lint clean | Conventions | Docs read | Med. cost | Total | $/correct | Pending |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  const rate = {};
  for (const id of ids) {
    for (const arm of ['a', 'c']) {
      const gs = held.filter((g) => g.case === id && g.arm === arm);
      if (!gs.length) continue;
      const total = gs.reduce((s, g) => s + (g.cost ?? 0), 0);
      const correct = gs.filter((g) => g.correct).length;
      (rate[id] ??= {})[arm] = correct / gs.length;
      lines.push(`| ${id} | ${arm.toUpperCase()} | ${correct}/${gs.length} | ${cnt(gs, (g) => g.works)} | ${cnt(gs, (g) => g.tsc === 'pass')} | ${cnt(gs, (g) => g.iconsValid)} | ${cnt(gs, (g) => g.clean)} | ${cnt(gs, (g) => g.conventions)} | ${cnt(gs, (g) => g.docsRead)} | ${usd(median(gs.map((g) => g.cost)))} | ${usd(total)} | ${correct ? usd(total / correct) : '–'} | ${gs.filter((g) => g.correct === null).length} |`);
    }
  }
  for (const arm of ['a', 'c']) {
    const gs = held.filter((g) => g.arm === arm);
    if (!gs.length) continue;
    const total = gs.reduce((s, g) => s + (g.cost ?? 0), 0);
    const correct = gs.filter((g) => g.correct).length;
    lines.push(`| **All** | ${arm.toUpperCase()} | ${correct}/${gs.length} | ${cnt(gs, (g) => g.works)} | ${cnt(gs, (g) => g.tsc === 'pass')} | ${cnt(gs, (g) => g.iconsValid)} | ${cnt(gs, (g) => g.clean)} | ${cnt(gs, (g) => g.conventions)} | ${cnt(gs, (g) => g.docsRead)} | ${usd(median(gs.map((g) => g.cost)))} | ${usd(total)} | ${correct ? usd(total / correct) : '–'} | ${gs.filter((g) => g.correct === null).length} |`);
  }
  // Tickets are the unit: resample tickets (seeded) for a 90% interval on the mean per-ticket C−A rate.
  const diffs = ids.filter((id) => rate[id]?.a !== undefined && rate[id]?.c !== undefined).map((id) => [id, rate[id].c - rate[id].a]);
  if (diffs.length) {
    let seed = 1;
    const rnd = () => ((seed = (seed * 48271) % 2147483647) / 2147483647);
    const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;
    const boots = Array.from({ length: 10000 }, () => mean(diffs.map(() => diffs[Math.floor(rnd() * diffs.length)][1]))).sort((x, y) => x - y);
    const f = (x) => (x >= 0 ? '+' : '') + x.toFixed(2);
    lines.push('', `Per-ticket correct rate C−A: ${diffs.map(([id, d]) => `${id} ${f(d)}`).join(', ')}. Mean ${f(mean(diffs.map((d) => d[1])))}, 90% ticket bootstrap [${f(boots[500])}, ${f(boots[9499])}]. C better/tie/worse: ${diffs.filter((d) => d[1] > 0).length}/${diffs.filter((d) => d[1] === 0).length}/${diffs.filter((d) => d[1] < 0).length}.`);
  }
}

const leaks = grades.filter((g) => g.outside);
if (leaks.length) lines.push('', '## Paths outside the run copy (check, discard if they read guidance)', '', ...leaks.map((g) => `- ${g.runId}: ${g.outside.slice(0, 5).join(', ')}`));

lines.push('', '## Per run', '', ...grades.map((g) => `- ${g.runId}: ${g.unavailable ? `unavailable (${g.unavailable})` : `pick=${g.pick ?? '–'} use=${g.use ?? '–'} clean=${g.clean} lookups=${JSON.stringify(g.lookups)} docs=${g.docsPages?.join(',') || (g.docsTouched ? 'touched' : '–')}${g.docsDenied ? ` (${g.docsDenied} denied)` : ''} tsc=${g.tsc ?? '–'} jest=${g.jest ?? '–'}`} ${g.pickWhy ?? ''} ${g.useChecks ? JSON.stringify(g.useChecks) : ''} ${g.extra ? `extra: ${JSON.stringify(g.extra)}` : ''} ${g.cleanIssues?.length ? `issues: ${g.cleanIssues.join('; ')}` : ''} ${g.failed ? `FAILED: ${g.failed}` : ''} ${g.unresolvedIcons ? `review icons: ${g.unresolvedIcons.join('; ')}` : ''}`));
fs.writeFileSync(path.join(batchDir, 'report.md'), lines.join('\n') + '\n');
console.log(lines.join('\n'));

if (values.cleanup) {
  for (const d of runDirs) {
    const { cwd } = JSON.parse(fs.readFileSync(path.join(d, 'meta.json'), 'utf8'));
    fs.rmSync(path.dirname(cwd), { recursive: true, force: true });
  }
}
