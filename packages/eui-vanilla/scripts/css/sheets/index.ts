/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { CssOutput } from '../engine';
import { baseReset, baseSheet } from './base';
import { buttonSheet } from './button';

/**
 * CSS files to generate. Key is the file stem (`base.css`, `button.css`).
 */
export const cssOutputs: Record<string, CssOutput> = {
  base: { reset: baseReset, sheets: [baseSheet] },
  button: { sheets: [buttonSheet] },
};
