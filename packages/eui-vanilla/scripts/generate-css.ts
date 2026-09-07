/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { emit, type CssSheet } from './css/engine';

const HEADER = `/* Generated from EUI Emotion style fns. Rebuild after EUI style changes. Do not edit. */\n\n`;

export type CssOutput = { sheets: CssSheet[]; reset?: string };

/**
 * Write generated CSS files for each sheet.
 *
 * @param outputs - map of file stem → sheets (`base` may include `reset`)
 */
export const writeGenerated = (outputs: Record<string, CssOutput>): void => {
  const outDir = join(process.cwd(), 'generated');
  mkdirSync(outDir, { recursive: true });

  for (const [name, { sheets, reset }] of Object.entries(outputs)) {
    const css = `${HEADER}${reset ? `${reset}\n` : ''}${emit(sheets)}`;

    writeFileSync(join(outDir, `${name}.css`), css);
    console.log(`wrote generated/${name}.css (${css.length} bytes)`);
  }
};
