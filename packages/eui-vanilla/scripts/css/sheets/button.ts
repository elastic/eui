/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { euiButtonDisplayContentStyles } from '@elastic/eui/src/components/button/button_display/_button_display_content.styles';
import { euiButtonDisplayStyles } from '@elastic/eui/src/components/button/button_display/_button_display.styles';
import { euiLoadingSpinnerStyles } from '@elastic/eui/src/components/loading/loading_spinner.styles';
import { euiButtonDisplaysColors } from '@elastic/eui/src/global_styling/mixins/_button';
import {
  BUTTON_DISPLAYS,
  BUTTON_DISPLAY_SIZES,
  EXTENDED_BUTTON_COLORS,
} from '@elastic/eui/src/global_styling/mixins/_button_constants';

import { rule } from '../../emotion_to_css';
import type { CssSheet } from '../engine';

const COLORS = [...EXTENDED_BUTTON_COLORS, 'disabled'] as const;

export const buttonSheet: CssSheet = (ctx, root) => {
  const display = euiButtonDisplayStyles(ctx);
  const colors = euiButtonDisplaysColors(ctx);
  const content = euiButtonDisplayContentStyles(ctx);
  const spinner = euiLoadingSpinnerStyles(ctx);
  const chunks: string[] = [];

  chunks.push(rule(`${root} .euiButton`, display.euiButtonDisplay));
  chunks.push(
    rule(
      `${root} .euiButton`,
      `
        -webkit-appearance: none;
        outline: none;
      `
    )
  );
  chunks.push(
    rule(
      `${root} .euiButton:is(:disabled, [aria-disabled='true'])`,
      display.isDisabled
    )
  );
  chunks.push(rule(`${root} .euiButton--fullWidth`, display.fullWidth));
  chunks.push(
    rule(`${root} .euiButton__content`, content.euiButtonDisplayContent)
  );

  for (const size of BUTTON_DISPLAY_SIZES) {
    chunks.push(
      rule(`${root} .euiButton--${size}`, [
        display[size],
        display.defaultMinWidth[size],
      ])
    );
    chunks.push(
      rule(
        `${root} .euiButton--${size} .eui-textTruncate`,
        content.content[size]
      )
    );
  }

  for (const displayName of BUTTON_DISPLAYS) {
    for (const color of COLORS) {
      const selector =
        displayName === 'base'
          ? `${root} .euiButton--${color}`
          : `${root} .euiButton--${displayName}.euiButton--${color}`;

      chunks.push(rule(selector, colors[displayName][color]));
    }
  }

  chunks.push(rule(`${root} .euiLoadingSpinner`, spinner.euiLoadingSpinner));
  chunks.push(rule(`${root} .euiLoadingSpinner--m`, spinner.m));

  chunks.push(
    rule(`${root} .euiButton:not(:focus-visible)`, 'outline: none')
  );

  chunks.push(
    rule(
      `${root} .euiButton--fill`,
      `
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      `
    )
  );

  return chunks.filter(Boolean).join('\n');
};
