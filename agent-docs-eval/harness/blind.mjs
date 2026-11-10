#!/usr/bin/env node
// Blind review for held-out batches, after grade.mjs:
//   node blind.mjs <batch>         writes results/<batch>/blind/<case>.md with runs shuffled and relabeled
//   node blind.mjs <batch> merge   folds blind/<case>.verdicts.json ({ label: { works, conventions, note } })
//                                  into review.json
// blind/key.json maps labels to runs; reviewers never get it.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { cases } from './cases.mjs';

const [batch, cmd] = process.argv.slice(2);
const batchDir = path.join(os.homedir(), 'eui-eval/results', batch);
const blindDir = path.join(batchDir, 'blind');
const keyFile = path.join(blindDir, 'key.json');

if (cmd === 'merge') {
  const key = JSON.parse(fs.readFileSync(keyFile, 'utf8'));
  const reviewFile = path.join(batchDir, 'review.json');
  const review = fs.existsSync(reviewFile) ? JSON.parse(fs.readFileSync(reviewFile, 'utf8')) : {};
  for (const [caseId, labels] of Object.entries(key)) {
    const vf = path.join(blindDir, `${caseId}.verdicts.json`);
    if (!fs.existsSync(vf)) { console.error(`${caseId}: no verdicts`); continue; }
    const verdicts = JSON.parse(fs.readFileSync(vf, 'utf8'));
    for (const [label, runId] of Object.entries(labels)) {
      const v = verdicts[label];
      if (!v) { console.error(`${caseId} ${label}: no verdict`); continue; }
      review[runId] = { ...review[runId], works: v.works, conventions: v.conventions, note: `blind ${label}: ${v.note}` };
    }
  }
  fs.writeFileSync(reviewFile, JSON.stringify(review, null, 2));
  process.exit(0);
}

const grades = JSON.parse(fs.readFileSync(path.join(batchDir, 'grades.json'), 'utf8'));
fs.mkdirSync(blindDir, { recursive: true });
const key = {};
for (const c of cases.filter((x) => x.kind === 'heldout')) {
  const gs = grades.filter((g) => g.case === c.id && !g.unavailable && !g.failed);
  if (!gs.length) continue;
  // Order by a hash of the run id, so the arm isn't recoverable from position.
  const order = gs.map((g) => [createHash('sha256').update(`${batch}/${g.runId}`).digest('hex'), g]).sort(([x], [y]) => x.localeCompare(y));
  key[c.id] = {};
  const parts = [`# ${c.id}: ${c.title}`, '', '## Ticket', '', c.prompt, '', '## Acceptance criteria', '', ...c.acceptance.map((x) => `- ${x}`), ''];
  order.forEach(([, g], i) => {
    const label = `R${i + 1}`;
    key[c.id][label] = g.runId;
    const patch = fs.readFileSync(path.join(batchDir, g.runId, 'diff.patch'), 'utf8');
    parts.push(`## ${label}`, '', `tsc: ${g.tsc ?? 'not run'}. Lint and pattern issues: ${g.cleanIssues?.join('; ') || 'none'}.`, '', '```diff', patch.trim() || '(empty diff)', '```', '');
  });
  fs.writeFileSync(path.join(blindDir, `${c.id}.md`), parts.join('\n'));
}
fs.writeFileSync(keyFile, JSON.stringify(key, null, 2));
console.log(`Wrote ${Object.keys(key).length} packets to ${blindDir}`);
