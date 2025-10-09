/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../services';

export const euiCodeTextColors = ({ euiTheme }: UseEuiTheme) => {
  return {
    backgroundColor: euiTheme.components.codeBackground,
    color: euiTheme.components.codeColor,
  };
};

/**
 * These variables are computationally expensive - do not call them outside `useEuiMemoizedStyles`
 */
export const euiCodeSyntaxVariables = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;
  const { backgroundColor, color } = euiCodeTextColors(euiThemeContext);

  return {
    backgroundColor,
    color,
    inlineBackgroundColor: euiTheme.components.codeInlineBackground,
    inlineCodeColor: euiTheme.components.codeInlineColor,
    selectedBackgroundColor: euiTheme.components.codeBackgroundSelected,
    commentColor: euiTheme.components.codeCommentColor,
    selectorTagColor: euiTheme.components.codeSelectorColor,
    stringColor: euiTheme.components.codeStringColor,
    tagColor: euiTheme.components.codeTagColor,
    nameColor: euiTheme.components.codeNameColor,
    numberColor: euiTheme.components.codeNumberColor,
    keywordColor: euiTheme.components.codeKeywordColor,
    inlineCodeKeywordColor: euiTheme.components.codeInlineCodeKeywordColor,
    functionTitleColor: euiTheme.components.codeFunctionTitleColor,
    typeColor: euiTheme.components.codeTypeColor,
    attributeColor: euiTheme.components.codeAttributeColor,
    symbolColor: euiTheme.components.codeSymbolColor,
    paramsColor: euiTheme.components.codeParamsColor,
    metaColor: euiTheme.components.codeMetaColor,
    titleColor: euiTheme.components.codeTitleColor,
    sectionColor: euiTheme.components.codeSectionColor,
    additionColor: euiTheme.components.codeAdditionColor,
    deletionColor: euiTheme.components.codeDeletionColor,
    selectorClassColor: euiTheme.components.codeSelectorClassColor,
    selectorIdColor: euiTheme.components.codeSelectorIdColor,

    get tokensCss() {
      return `
  .token.punctuation:not(.interpolation-punctuation):not([class*='attr-']) {
    opacity: ${highContrastMode ? '1' : '.7'};
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata,
  .token.coord,
  .token.blockquote {
    color: ${this.commentColor};
    font-style: italic;
  }

  .token.selector {
    color: ${this.selectorTagColor};
  }

  .token.string,
  .token.interpolation,
  .token.interpolation-punctuation,
  .token.doc-comment .token.keyword,
  .token.attr-value,
  .token.url .token.content {
    color: ${this.stringColor};
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
    color: ${this.numberColor};
  }

  .token.atrule .token.rule,
  .token.key.atrule,
  .token.keyword {
    color: ${this.keywordColor};
  }

  .token.function {
    color: ${this.functionTitleColor};
  }

  .token.tag {
    color: ${this.tagColor};
  }

  .token.class-name {
    color: ${this.typeColor};
  }

  .token.property {
    color: ${this.attributeColor};
  }

  .token.console,
  .token.list-punctuation,
  .token.url-reference,
  .token.url .token.url {
    color: ${this.symbolColor};
  }

  .token.paramater {
    color: ${this.paramsColor};
  }

  .token.meta,
  .token.important {
    color: ${this.metaColor};
  }

  .token.title {
    color: ${this.titleColor};
  }

  .token.section {
    color: ${this.sectionColor};
  }

  .token.prefix.inserted,
  .token.prefix.deleted {
    padding-inline-start: -${euiTheme.size.xs};
    margin-inline-start:  -${euiTheme.size.xs};
  }

  .token.prefix.inserted {
    box-shadow: -${euiTheme.size.xs} 0 ${this.additionColor};
    color: ${this.additionColor};
  }

  .token.prefix.deleted {
    box-shadow: -${euiTheme.size.xs} 0 ${this.deletionColor};
    color: ${this.deletionColor};
  }

  .token.selector .token.class {
    color: ${this.selectorClassColor};
  }

  .token.selector .token.id {
    color: ${this.selectorIdColor};
  }

  .token.italic {
    font-style: italic;
  }

  .token.important,
  .token.bold {
    font-weight: ${euiTheme.font.weight.bold};
  }

  .token.url-reference,
  .token.url .token.url {
    text-decoration: underline;
  }

  .token.entity {
    cursor: help;
  }`;
    },
  };
};
