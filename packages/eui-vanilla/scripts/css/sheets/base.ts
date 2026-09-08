/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { logicalCSS } from '@elastic/eui/src/global_styling/functions';
import { euiFocusRing } from '@elastic/eui/src/global_styling/mixins/_states';
import { euiTextTruncate } from '@elastic/eui/src/global_styling/mixins/_typography';
import { resetStyles } from '@elastic/eui/src/global_styling/reset/reset';

import { rule } from '../../emotion_to_css';
import type { CssSheet } from '../engine';

export const baseReset = resetStyles;

/**
 * Theme-dependent global styles from `EuiGlobalStyles`.
 *
 * `data-theme` lives on `<html>`, `root` is that element.
 */
export const baseSheet: CssSheet = (ctx, root) => {
  const { euiTheme } = ctx;
  const { base, colors, font } = euiTheme;
  const fontBodyScale = font.scale[font.body.scale];
  const fontSize = `${
    font.defaultUnits === 'px' ? fontBodyScale * base : fontBodyScale
  }${font.defaultUnits}`;
  const lineHeight = base / (fontBodyScale * base);

  return [
    rule(
      root,
      `
        font-family: ${font.family};
        font-size: ${fontSize};
        line-height: ${lineHeight};
        font-weight: ${font.weight[font.body.weight]};
        color-scheme: ${ctx.colorMode.toLowerCase()};
        text-size-adjust: 100%;
        font-kerning: normal;
        ${logicalCSS('height', '100%')}
        background-color: ${colors.body};
        color: ${colors.textParagraph};
      `
    ),
    rule(
      `${root} button`,
      `
        font: inherit;
        font-family: ${font.family};
      `
    ),
    rule(`${root} :focus`, euiFocusRing(ctx)),
    rule(`${root} .eui-textTruncate`, euiTextTruncate()),
  ]
    .filter(Boolean)
    .join('\n');
};
