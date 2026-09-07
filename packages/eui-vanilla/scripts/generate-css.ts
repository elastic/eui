/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { emit, type CssSheet } from './css/engine';
import { baseReset, baseSheet } from './css/sheets/base';
import { buttonSheet } from './css/sheets/button';

const HEADER = `/* Generated from EUI Emotion style fns. Rebuild after EUI style changes. Do not edit. */\n\n`;

/** Add a sheet here when adding a new vanilla component. */
const outputs: Record<string, { sheets: CssSheet[]; reset?: string }> = {
  base: { reset: baseReset, sheets: [baseSheet] },
  button: { sheets: [buttonSheet] },
};

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'generated');
mkdirSync(outDir, { recursive: true });

for (const [name, { sheets, reset }] of Object.entries(outputs)) {
  const css = `${HEADER}${reset ? `${reset}\n` : ''}${emit(sheets)}`;

  writeFileSync(join(outDir, `${name}.css`), css);
  console.log(`wrote generated/${name}.css (${css.length} bytes)`);
}
