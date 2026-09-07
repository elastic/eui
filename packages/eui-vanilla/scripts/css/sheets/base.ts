/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { rule } from '../../emotion_to_css';
import type { CssSheet } from '../engine';

export const baseSheet: CssSheet = (ctx, root) =>
  rule(
    `${root} html`,
    `
      font-family: ${ctx.euiTheme.font.family};
      background-color: ${ctx.euiTheme.colors.body};
      color: ${ctx.euiTheme.colors.textParagraph};
    `
  );
