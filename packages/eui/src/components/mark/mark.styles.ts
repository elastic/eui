/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiScreenReaderOnly } from '../accessibility';

export const euiMarkStyles = ({ euiTheme, highContrastMode }: UseEuiTheme) => {
  const backgroundColor = highContrastMode
    ? euiTheme.colors.primaryText
    : euiTheme.focus.backgroundColor;

  const textColor = highContrastMode
    ? `${euiTheme.colors.ghost} !important`
    : euiTheme.colors.text;

  return {
    euiMark: css`
      background-color: ${backgroundColor};
      font-weight: ${euiTheme.font.weight.bold};
      color: ${textColor};
    `,
  };
};

export const euiMarkScreenReaderStyles = (
  highlightStart: string,
  highlightEnd: string
) => {
  return {
    hasScreenReaderHelpText: css`
      &::before,
      &::after {
        ${euiScreenReaderOnly()}
      }

      &::before {
        content: ' [${highlightStart}] ';
      }

      &::after {
        content: ' [${highlightEnd}] ';
      }
    `,
  };
};
