/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { Global, css } from '@emotion/react';

import { euiScreenReaderOnly } from '../../components/accessibility/screen_reader_only/screen_reader_only.styles';
import { euiTextBreakWord, euiTextTruncate } from '../mixins';

const globalStyles = css`
  .euiScreenReaderOnly {
    ${euiScreenReaderOnly()}
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
`;
export const EuiUtilityClasses = () => <Global styles={globalStyles} />;
