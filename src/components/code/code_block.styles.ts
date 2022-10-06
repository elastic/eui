/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiFontSize, euiScrollBarStyles } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiCodeSyntaxColors, euiCodeSyntaxTokens } from './code_syntax.styles';

export const euiCodeBlockStyles = (
  euiThemeContext: UseEuiTheme,
  paddingAmount: number
) => {
  const { euiTheme } = euiThemeContext;
  const euiCodeSyntax = euiCodeSyntaxColors(euiThemeContext);
  const controlsPadding =
    parseInt(euiTheme.size.l) + parseInt(euiTheme.size.xs);
  const bothControlsHeight =
    parseInt(euiTheme.size.l) * 2 + parseInt(euiTheme.size.xs);
  const hasControlsMinHeight = `${controlsPadding + paddingAmount * 2}px`;
  const bothControlsMinHeight = `${bothControlsHeight + paddingAmount * 2}px`;

  return {
    euiCodeBlock: css`
      max-inline-size: 100%;
      display: block;
      position: relative;
      background: ${euiCodeSyntax.backgroundColor};

      ${euiCodeSyntaxTokens(euiThemeContext)}
    `,
    // Font size
    s: css`
      ${euiFontSize(euiThemeContext, 'xs')};
    `,
    m: css`
      ${euiFontSize(euiThemeContext, 's')};
    `,
    l: css`
      ${euiFontSize(euiThemeContext, 'm')};
    `,
    // Variants
    transparentBackground: css`
      background: transparent;
    `,
    hasControls: css`
      min-block-size: ${hasControlsMinHeight};
    `,
    hasBothControls: css`
      min-block-size: ${bothControlsMinHeight};
    `,
    isFullScreen: css`
      position: fixed;
      inset: 0;
    `,
  };
};

export const euiCodeBlockPreStyles = (
  euiThemeContext: UseEuiTheme,
  paddingAmount: number,
  hasControls?: boolean
) => {
  const { euiTheme } = euiThemeContext;
  const controlsPadding =
    parseInt(euiTheme.size.l) + parseInt(euiTheme.size.xs);
  const controlsPaddingAdjusted = controlsPadding + paddingAmount;

  return {
    euiCodeBlock__pre: css`
      block-size: 100%;
      overflow: auto;
      display: block;
      padding-inline: ${paddingAmount}px;
      padding-block: ${paddingAmount}px;
      ${euiScrollBarStyles(euiThemeContext)}
    `,
    whiteSpacePre: css`
      white-space: pre;

      ${hasControls &&
      `
        margin-inline-end: ${controlsPaddingAdjusted}px;
      `};
    `,
    whiteSpacePreWrap: css`
      white-space: pre-wrap;

      ${hasControls &&
      `
        padding-inline-end: ${controlsPaddingAdjusted}px;
      `}
    `,
    isFullScreen: css`
      padding: ${euiTheme.size.xl};
    `,
  };
};

export const euiCodeBlockCodeStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiCodeSyntax = euiCodeSyntaxColors(euiThemeContext);

  return {
    euiCodeBlock__code: css`
      font-family: ${euiTheme.font.familyCode};
      font-size: inherit;
      color: ${euiCodeSyntax.color};
      display: block;
    `,
    isVirtualized: css`
      // Necessary for virtualized code blocks to have appropriate padding
      position: relative;
    `,
  };
};

export const euiCodeBlockControlsStyles = (
  euiThemeContext: UseEuiTheme,
  paddingAmount: number
) => {
  const { euiTheme } = euiThemeContext;
  const euiCodeSyntax = euiCodeSyntaxColors(euiThemeContext);

  return {
    euiCodeBlock__controls: css`
      position: absolute;
      inset-block-start: ${paddingAmount}px;
      inset-inline-end: ${paddingAmount}px;
      max-inline-size: 100%;
      display: flex;
      flex-direction: column;
      background: ${euiCodeSyntax.backgroundColor};
      gap: ${euiTheme.size.xs};
    `,
  };
};
