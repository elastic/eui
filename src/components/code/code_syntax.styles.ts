/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  UseEuiTheme,
  makeHighContrastColor,
  euiPaletteColorBlind,
} from '../../services';

const visColors = euiPaletteColorBlind();

export const euiCodeSyntaxColors = (euiThemeContext: UseEuiTheme) => {
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
  const euiCodeBlock = euiCodeSyntaxColors(euiThemeContext);

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
