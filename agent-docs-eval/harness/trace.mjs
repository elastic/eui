#!/usr/bin/env node
// Prints a run's tool calls, narration and final summary: node trace.mjs <batch>/<runId>
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const file = path.join(os.homedir(), 'eui-eval/results', process.argv[2], 'transcript.jsonl');
const one = (s, n) => String(s).replace(/\s+/g, ' ').slice(0, n);
for (const l of fs.readFileSync(file, 'utf8').split('\n')) {
  let e;
  try { e = JSON.parse(l); } catch { continue; }
  if (e.type === 'assistant') for (const c of e.message.content) {
    if (c.type === 'text' && c.text.trim()) console.log('TEXT', one(c.text, 300));
    if (c.type === 'tool_use') console.log('TOOL', c.name, one(c.input.command ?? c.input.pattern ?? c.input.file_path ?? JSON.stringify(c.input), 200));
  }
  if (e.type === 'result') console.log(`RESULT (${e.num_turns} turns, $${e.total_cost_usd?.toFixed(2)})\n${e.result}`);
}
