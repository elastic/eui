/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { keyframes, css } from '@emotion/react';
import { UseEuiTheme, transparentize } from '../../services';

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

export const euiMarkStyles = (
  { euiTheme, colorMode }: UseEuiTheme,
  {
    hasScreenReaderHelpText,
    highlightStart,
    highlightEnd,
  }: {
    hasScreenReaderHelpText: boolean;
    highlightStart: string;
    highlightEnd: string;
  }
) => {
  // TODO: Was $euiFocusBackgroundColor
  const transparency = { LIGHT: 0.1, DARK: 0.3 };

  return css`
    display: inline-block;
    animation: ${bounce} 1s ease infinite;

    background-color: ${transparentize(
      euiTheme.colors.primary,
      transparency[colorMode]
    )};
    font-weight: ${euiTheme.font.weight.bold};
    // Override the browser's black color.
    // Can't use 'inherit' because the text to background color contrast may not be sufficient
    color: ${euiTheme.colors.text};

    // https://seanconnolly.dev/emotion-conditionals
    ${hasScreenReaderHelpText === true &&
    `
      &:before,
      &:after {
        clip-path: inset(100%);
        clip: rect(1px, 1px, 1px, 1px);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      }

      &:before {
        content: ' [${highlightStart}] ';
      }

      &:after {
        content: ' [${highlightEnd}] ';
      }
    `}
  `;
};
