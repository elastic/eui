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
import {
  euiFontSize,
  euiBackgroundColor,
  euiScrollBarStyles,
} from '../../global_styling';
import {
  UseEuiTheme,
  euiPaletteColorBlind,
  makeHighContrastColor,
} from '../../services';

const visColors = euiPaletteColorBlind();

export const euiCodeBlockColors = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const backgroundColor = euiTheme.colors.lightestShade;

  return {
    backgroundColor: backgroundColor,
    color: makeHighContrastColor(euiTheme.colors.text)(backgroundColor),
    inlineCodeColor: makeHighContrastColor(visColors[3])(backgroundColor),
    selectedBackgroundColor: 'inherit',
    commentColor: makeHighContrastColor(euiTheme.colors.subduedText)(
      backgroundColor
    ),
    selectorTagColor: 'inherit',
    stringColor: makeHighContrastColor(visColors[2])(backgroundColor),
    tagColor: makeHighContrastColor(visColors[1])(backgroundColor),
    nameColor: makeHighContrastColor(visColors[1])(backgroundColor),
    numberColor: makeHighContrastColor(visColors[0])(backgroundColor),
    keywordColor: makeHighContrastColor(visColors[3])(backgroundColor),
    functionTitleColor: 'inherit',
    typeColor: makeHighContrastColor(visColors[1])(backgroundColor),
    attributeColor: 'inherit',
    symbolColor: makeHighContrastColor(visColors[9])(backgroundColor),
    paramsColor: 'inherit',
    metaColor: makeHighContrastColor(euiTheme.colors.subduedText)(
      backgroundColor
    ),
    titleColor: makeHighContrastColor(visColors[7])(backgroundColor),
    sectionColor: makeHighContrastColor(visColors[9])(backgroundColor),
    additionColor: makeHighContrastColor(visColors[0])(backgroundColor),
    deletionColor: makeHighContrastColor(euiTheme.colors.danger)(
      backgroundColor
    ),
    selectorClassColor: 'inherit',
    selectorIdColor: 'inherit',
  };
};

export const euiCodeSyntaxTokens = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiCodeBlock = euiCodeBlockColors(euiThemeContext);

  return `
  .token.punctuation:not(.interpolation-punctuation):not([class*='attr-']) {
    opacity: .7;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata,
  .token.coord,
  .token.blockquote {
    color: ${euiCodeBlock.commentColor};
    font-style: italic;
  }

  .token.selector {
    color: ${euiCodeBlock.selectorTagColor};
  }

  .token.string,
  .token.interpolation,
  .token.interpolation-punctuation,
  .token.doc-comment .token.keyword,
  .token.attr-value,
  .token.url .token.content {
    color: ${euiCodeBlock.stringColor};
  }

  .token.number,
  .token.boolean,
  .token.keyword.nil,
  .token.regex,
  .token.variable,
  .token.unit,
  .token.hexcode,
  .token.attr-name,
  .token.attr-equals {
    color: ${euiCodeBlock.numberColor};
  }

  .token.atrule .token.rule,
  .token.keyword {
    color: ${euiCodeBlock.keywordColor};
  }

  .token.function {
    color: ${euiCodeBlock.functionTitleColor};
  }

  .token.tag {
    color: ${euiCodeBlock.tagColor};
  }

  .token.class-name {
    color: ${euiCodeBlock.typeColor};
  }

  .token.property {
    color: ${euiCodeBlock.attributeColor};
  }

  .token.console,
  .token.list-punctuation,
  .token.url-reference,
  .token.url .token.url {
    color: ${euiCodeBlock.symbolColor};
  }

  .token.paramater {
    color: ${euiCodeBlock.paramsColor};
  }

  .token.meta,
  .token.important {
    color: ${euiCodeBlock.metaColor};
  }

  .token.title {
    color: ${euiCodeBlock.titleColor};
  }

  .token.section {
    color: ${euiCodeBlock.sectionColor};
  }

  .token.prefix.inserted,
  .token.prefix.deleted {
    padding-inline-start: -${euiTheme.size.xs};
    margin-inline-start:  -${euiTheme.size.xs};
  }

  .token.prefix.inserted {
    box-shadow: -${euiTheme.size.xs} 0 ${euiCodeBlock.additionColor};
    color: ${euiCodeBlock.additionColor};
  }

  .token.prefix.deleted {
    box-shadow: -${euiTheme.size.xs} 0 ${euiCodeBlock.deletionColor};
    color: ${euiCodeBlock.deletionColor};
  }

  .token.selector .token.class {
    color: ${euiCodeBlock.selectorClassColor};
  }

  .token.selector .token.id {
    color: ${euiCodeBlock.selectorIdColor};
  }

  .token.italic {
    font-style: italic;
  }

  .token.important,
  .token.bold {
    font-weight: $euiCodeFontWeightBold;
  }

  .token.url-reference,
  .token.url .token.url {
    text-decoration: underline;
  }

  .token.entity {
    cursor: help;
  }
  
  `;
};

export const euiCodeBlockStyles = (
  euiThemeContext: UseEuiTheme,
  paddingAmount: number
) => {
  const { euiTheme } = euiThemeContext;
  const euiCodeBlock = euiCodeBlockColors(euiThemeContext);
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
      background: ${euiCodeBlock.backgroundColor};
      ${euiCodeSyntaxTokens(euiThemeContext)};

      .euiCodeBlock__line {
        display: block;
      }

      .euiCodeBlock__lineText,
      .euiCodeBlock__lineNumber {
        display: inline-block;
      }

      .euiCodeBlock__lineText {
        padding-inline-start: ${euiTheme.size.s};
        border-inline-start: ${euiTheme.border.thin};
        user-select: text;
      }

      .euiCodeBlock__lineNumber {
        position: absolute;
        block-size: 100%;
        user-select: none;
        padding-inline-end: ${euiTheme.size.s};
        // Width is calculated in JS and padding needs to be added on to that value.
        box-sizing: content-box;

        &:before {
          content: attr(data-line-number);
          color: ${euiTheme.colors.subduedText};
          text-align: end;
          display: block;
        }
      }

      .euiCodeBlock__line--isHighlighted {
        .euiCodeBlock__lineText {
          background: ${euiBackgroundColor(euiThemeContext, 'primary')};
          border-inline-start: ${euiTheme.border.width.thick} solid
            ${euiTheme.colors.primary};
        }
      }
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
    hasLineNumbers: css`
      .euiCodeBlock__line {
        position: relative;
        user-select: none;
      }
    `,
    isFullScreen: css`
      position: fixed;
      inset-block-start: 0;
      inset-inline-start: 0;
      inset-inline-end: 0;
      inset-block-end: 0;
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
  const euiCodeBlock = euiCodeBlockColors(euiThemeContext);

  return {
    euiCodeBlock__code: css`
      font-family: ${euiTheme.font.familyCode};
      font-size: inherit;
      color: ${euiCodeBlock.color};
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
  const euiCodeBlock = euiCodeBlockColors(euiThemeContext);

  return {
    euiCodeBlock__controls: css`
      position: absolute;
      inset-block-start: ${paddingAmount}px;
      inset-inline-end: ${paddingAmount}px;
      max-inline-size: 100%;
      display: flex;
      flex-direction: column;
      background: ${euiCodeBlock.backgroundColor};
      gap: ${euiTheme.size.xs};
    `,
  };
};
