/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import {
  logicalCSS,
  logicalBorderRadiusCSS,
  euiScrollBarStyles,
} from '../../global_styling';

export const euiMarkdownEditorVariables = ({ euiTheme }: UseEuiTheme) => {
  return {
    minHeight: '150px',
    borderRadius: euiTheme.border.radius.medium,
    barsBackgroundColor: euiTheme.colors.lightestShade,
  };
};

export const euiMarkdownEditorStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const { minHeight, borderRadius } =
    euiMarkdownEditorVariables(euiThemeContext);

  return {
    euiMarkdownEditor: css`
      display: flex;
      flex-direction: column;

      .euiMarkdownEditorToolbar {
        ${logicalBorderRadiusCSS(`${borderRadius} ${borderRadius} 0 0`, true)}
      }

      .euiMarkdownEditorPreview,
      .euiMarkdownEditorFooter {
        ${logicalBorderRadiusCSS(`0 0 ${borderRadius} ${borderRadius}`, true)}
      }
    `,
    fullHeight: css`
      ${logicalCSS('height', '100%')}

      .euiMarkdownEditorTextArea {
        resize: none;
      }

      .euiMarkdownEditorDropZone {
        ${logicalCSS('height', '100%')}
      }
    `,
    euiMarkdownEditorPreview: css`
      ${logicalCSS('min-height', minHeight)}
      ${logicalCSS('overflow-y', 'auto')}
      ${euiScrollBarStyles(euiThemeContext)}
      padding: ${euiTheme.size.m};
      border: ${euiTheme.border.thin};
      background-color: ${euiTheme.colors.emptyShade};
    `,
  };
};
