/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiPaddingSize,
  euiFontSize,
  euiScrollBarStyles,
  mathWithUnits,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';

import { euiCodeSyntaxVariables } from './code_syntax.styles';

export const euiCodeBlockStyles = (euiThemeContext: UseEuiTheme) => {
  const codeSyntaxVariables = euiCodeSyntaxVariables(euiThemeContext);
  const { euiTheme } = euiThemeContext;

  return {
    euiCodeBlock: css`
      max-inline-size: 100%;
      display: block;
      position: relative;
      background: ${codeSyntaxVariables.backgroundColor};

      ${codeSyntaxVariables.tokensCss}
    `,
    // Font size
    s: css`
      ${euiFontSize(euiThemeContext, 'xs')}
    `,
    m: css`
      ${euiFontSize(euiThemeContext, 's')}
    `,
    l: css`
      ${euiFontSize(euiThemeContext, 'm')}
    `,
    // Variants
    transparentBackground: css`
      background: transparent;
    `,
    isFullScreen: css`
      position: fixed;
      inset: 0;
    `,
    // Account for control heights
    hasControls: generatePaddingCss(euiThemeContext, (paddingSize: string) => {
      return css`
        min-block-size: ${mathWithUnits(
          [euiTheme.size.l, paddingSize],
          (iconSize, paddingSize) => iconSize + paddingSize * 2
        )};
      `;
    }),
    hasBothControls: generatePaddingCss(
      euiThemeContext,
      (paddingSize: string) => {
        return css`
          min-block-size: ${mathWithUnits(
            [euiTheme.size.l, euiTheme.size.xs, paddingSize],
            (iconSize, gap, paddingSize) => iconSize * 2 + gap + paddingSize * 2
          )};
        `;
      }
    ),
  };
};

export const euiCodeBlockPreStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiCodeBlock__pre: css`
      block-size: 100%;
      overflow: auto;
      display: block;
      ${euiScrollBarStyles(euiThemeContext)}
    `,
    padding: {
      ...generatePaddingCss(euiThemeContext, (paddingSize: string) => {
        return css`
          padding: ${paddingSize};
        `;
      }),
    },
    whiteSpace: {
      pre: {
        pre: css`
          white-space: pre;
        `,
        controlsOffset: generatePaddingCss(
          euiThemeContext,
          (paddingSize: string) => {
            return css`
              margin-inline-end: ${mathWithUnits(
                [paddingSize, euiTheme.size.l, euiTheme.size.xs],
                (paddingSize, iconSize, gap) => paddingSize + gap + iconSize
              )};
            `;
          }
        ),
      },
      preWrap: {
        preWrap: css`
          white-space: pre-wrap;
        `,
        controlsOffset: generatePaddingCss(
          euiThemeContext,
          (paddingSize: string) => {
            return css`
              padding-inline-end: ${mathWithUnits(
                [paddingSize, euiTheme.size.l, euiTheme.size.xs],
                (paddingSize, iconSize, gap) => paddingSize + gap + iconSize
              )};
            `;
          }
        ),
      },
    },
  };
};

export const euiCodeBlockCodeStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiCodeBlock__code: css`
      font-family: ${euiTheme.font.familyCode};
      font-size: inherit;
      color: ${euiTheme.colors.text};
      display: block;
    `,
    isVirtualized: css`
      /* Necessary for virtualized code blocks to have appropriate padding */
      position: relative;
    `,
  };
};

/**
 * Helper for generating keys for each code block padding size
 */
const generatePaddingCss = (
  euiThemeContext: UseEuiTheme,
  callback: Function
) => {
  const cssKeys = { none: css``, s: css``, m: css``, l: css``, xl: css`` }; // xl padding used by fullscreen mode

  (['none', 's', 'm', 'l', 'xl'] as const).forEach((size) => {
    const paddingSize = euiPaddingSize(euiThemeContext, size) || 0;
    cssKeys[size] = callback(paddingSize);
  });

  return cssKeys;
};
