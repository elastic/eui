/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, transparentize } from '../../services';

export const euiMarkStyles = ({
  euiTheme,
  colorMode,
  hasHighlightText,
  highlightStart,
  highlightEnd,
}: UseEuiTheme) => {
  // TODO: Was $euiFocusBackgroundColor
  const transparency = { LIGHT: 0.1, DARK: 0.3 };

  return css`
    background-color: ${transparentize(
      euiTheme.colors.primary,
      transparency[colorMode]
    )};
    font-weight: ${euiTheme.font.weight.bold};
    // Override the browser's black color.
    // Can't use 'inherit' because the text to background color contrast may not be sufficient
    color: ${euiTheme.colors.text};

    // https://seanconnolly.dev/emotion-conditionals
    ${hasHighlightText === true &&
    `
      &:before,
      &:after {
        content: ' [${highlightStart}] ';
        clip-path: inset(100%);
        clip: rect(1px, 1px, 1px, 1px);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      }

      &:after {
        content: ' [${highlightEnd}] ';
      }
    `}
  `;
};
