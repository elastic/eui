/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { Global, css } from '@emotion/react';

import { useEuiTheme, UseEuiTheme } from '../../services/theme/hooks';
import { euiScreenReaderOnly } from '../../components/accessibility/screen_reader_only/screen_reader_only.styles';
import {
  euiFullHeight,
  euiTextBreakWord,
  euiTextTruncate,
  euiNumberFormat,
  euiScrollBarStyles,
  euiYScroll,
  euiXScroll,
  euiYScrollWithShadows,
  euiXScrollWithShadows,
} from '../mixins';
import { logicalCSS } from '../functions';

const globalStyles = (euiThemeContext: UseEuiTheme) => {
  return css`
    // Accessibility
    .euiScreenReaderOnly {
      ${euiScreenReaderOnly()}
    }

    // Vertical alignment
    .eui-alignBaseline {
      vertical-align: baseline !important;
    }
    .eui-alignBottom {
      vertical-align: bottom !important;
    }
    .eui-alignMiddle {
      vertical-align: middle !important;
    }
    .eui-alignTop {
      vertical-align: top !important;
    }

    // Display
    .eui-displayBlock {
      display: block !important;
    }
    .eui-displayInline {
      display: inline !important;
    }
    .eui-displayInlineBlock {
      display: inline-block !important;
    }

    .eui-fullWidth {
      display: block !important;
      ${logicalCSS('width', '100% !important')}
    }
    .eui-fullHeight {
      ${euiFullHeight()}
    }

    // Text
    .eui-textCenter {
      text-align: center !important;
    }
    .eui-textLeft {
      text-align: start !important;
    }
    .eui-textRight {
      text-align: end !important;
    }
    .eui-textNoWrap {
      white-space: nowrap !important;
    }
    .eui-textInheritColor {
      color: inherit !important;
    }
    .eui-textBreakWord {
      ${euiTextBreakWord()}
    }
    .eui-textBreakAll {
      overflow-wrap: break-word !important; // Fixes FF when dashes are involved #2288
      word-break: break-all !important;
    }
    .eui-textBreakNormal {
      overflow-wrap: normal !important;
      word-wrap: normal !important;
      word-break: normal !important;
    }
    .eui-textTruncate {
      ${euiTextTruncate()}
    }
    .eui-textNumber {
      ${euiNumberFormat(euiThemeContext)}
    }

    // Scroll
    .eui-scrollBar {
      ${euiScrollBarStyles(euiThemeContext)}
    }
    .eui-yScroll {
      ${euiYScroll(euiThemeContext)}
    }
    .eui-xScroll {
      ${euiXScroll(euiThemeContext)}
    }
    .eui-yScrollWithShadows {
      ${euiYScrollWithShadows(euiThemeContext)}
    }
    .eui-xScrollWithShadows {
      ${euiXScrollWithShadows(euiThemeContext)}
    }
  `;
};
export const EuiUtilityClasses = () => {
  const euiTheme = useEuiTheme();
  return <Global styles={globalStyles(euiTheme)} />;
};
