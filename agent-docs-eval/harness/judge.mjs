#!/usr/bin/env node
// Experiment: asks gpt-6-luna (OpenAI Decisions API) yes/no questions about each run, as review
// notes next to grade.mjs. Never feeds the pass rate. node judge.mjs <batch>
// Writes results/<batch>/judge.json.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { cases } from './cases.mjs';

const ROOT = path.join(os.homedir(), 'eui-eval');
const BASE_A = path.join(os.homedir(), 'kbx/base-a/kibana');
const KEY = fs.readFileSync(path.join(ROOT, '.openai-key'), 'utf8').trim();
const caseById = Object.fromEntries(cases.map((c) => [c.id, c]));
const batch = process.argv[2];
const batchDir = path.join(ROOT, 'results', batch);

const COMMON = {
  implements_task: 'Does the change implement everything the task asks for?',
  scoped: 'Is the change limited to the feature the task describes, with no unrelated edits?',
  accessible: 'Does every new interactive control, menu or popover have an accessible name (visible text, aria-label or aria-labelledby)?',
  summary_matches_diff: "Does the agent's final summary accurately describe what the diff does, without claiming anything the diff does not do?",
};
const PER_CASE = {
  S1: {
    filter_has_new_states: 'Does the status filter above the table offer Paused and Degraded?',
    distinct_icons: 'Do Paused and Degraded each get an icon that differs from each other and from the Active and Revoked icons?',
  },
  S5: {
    single_control: "Is 'Upload package' offered only from the same control as 'Create integration' (for example a split button menu), with no separate button or link?",
    create_one_click: "Does 'Create integration' stay a single click?",
    upload_links_to_upload_page: "Does 'Upload package' navigate to the package upload page?",
  },
  I1: {
    copies_workflow_id: "Does the new action copy the created workflow's ID (not its name or URL) to the clipboard?",
    next_to_open: "Is the copy action placed next to the 'Open in Workflows' button on the success screen?",
    copy_feedback: 'Does the user get feedback that the ID was copied (for example a tooltip or toast)?',
  },
  I2: {
    only_icons_changed: 'Does the change only replace icon names, leaving other code untouched?',
    replacements_equivalent: 'Is each replacement icon a sensible current equivalent of the icon it replaces (same meaning)?',
  },
};

function transcriptSummary(file) {
  const events = fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const steps = [];
  for (const e of events) {
    if (e.type !== 'assistant' || !Array.isArray(e.message?.content)) continue;
    for (const p of e.message.content) if (p.type === 'tool_use') steps.push(`${p.name} ${JSON.stringify(p.input).slice(0, 200)}`);
  }
  return { steps, finalSummary: events.findLast((e) => e.type === 'result')?.result ?? '' };
}

async function judgeRun(dir) {
  const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
  const c = caseById[meta.case];
  const diff = fs.readFileSync(path.join(dir, 'diff.patch'), 'utf8');
  // The pre-change files give the diff its context; sources are the same in every base.
  const changed = [...diff.matchAll(/^\+\+\+ b\/(.+)$/gm)].map((m) => m[1]);
  const before = Object.fromEntries(changed.filter((f) => fs.existsSync(path.join(BASE_A, f))).map((f) => [f, fs.readFileSync(path.join(BASE_A, f), 'utf8')]));
  const t = transcriptSummary(path.join(dir, 'transcript.jsonl'));
  // Code questions never see the agent's summary: with it, identical I1 diffs scored 0 and 0.95 on
  // copy_feedback, following what the summary claimed rather than the code.
  const { summary_matches_diff, ...codeQs } = { ...COMMON, ...PER_CASE[meta.case] };
  const [code, summary] = await Promise.all([
    decide({ task: c.prompt, diff, filesBefore: before }, codeQs),
    decide({ task: c.prompt, diff, agentSteps: t.steps, finalSummary: t.finalSummary }, { summary_matches_diff }),
  ]);
  const err = code.error ?? summary.error;
  if (err) return { runId: meta.runId, error: err };
  return { runId: meta.runId, answers: { ...code.answers, ...summary.answers }, inputTokens: code.inputTokens + summary.inputTokens };
}

async function decide(data, qs) {
  const body = {
    model: 'gpt-6-luna',
    input: [{
      role: 'user',
      content: [
        { type: 'input_text', text: 'A coding agent was given the task below in a Kibana checkout that uses the EUI React component library. Judge its change from the data given. filesBefore holds the changed files before the change; diff is the change; agentSteps and finalSummary, when present, are from its transcript.' },
        { type: 'input_json', data },
      ],
    }],
    questions: Object.entries(qs).map(([name, instructions]) => ({ type: 'predicate', name, instructions })),
  };
  const res = await fetch('https://api.openai.com/v1/decisions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) return { error: `${res.status} ${JSON.stringify(json).slice(0, 300)}` };
  return {
    answers: Object.fromEntries(json.answers.map((a) => [a.name, a.type === 'refusal' ? 'refusal' : +a.probability.toFixed(2)])),
    inputTokens: json.usage?.input_tokens ?? 0,
  };
}

const dirs = fs.readdirSync(batchDir).map((d) => path.join(batchDir, d)).filter((d) => fs.existsSync(path.join(d, 'meta.json')));
const out = await Promise.all(dirs.map(judgeRun));
fs.writeFileSync(path.join(batchDir, 'judge.json'), JSON.stringify(out, null, 2));
for (const r of out) {
  console.log(r.runId, r.error ?? '', r.inputTokens ? `(${r.inputTokens} tok)` : '');
  for (const [k, p] of Object.entries(r.answers ?? {})) console.log(`  ${typeof p === 'number' && p < 0.5 ? 'NO ' : typeof p === 'number' && p < 0.8 ? '?? ' : '   '} ${p}  ${k}`);
}
