/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { logicalCSS } from '../../global_styling';
import { euiMarkdownEditorVariables } from './markdown_editor.styles';

export const euiMarkdownEditorToolbarStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;
  const { barsBackgroundColor } = euiMarkdownEditorVariables(euiThemeContext);

  return {
    euiMarkdownEditorToolbar: css`
      display: flex;
      flex-wrap: wrap;
      padding: ${euiTheme.size.xs};
      background-color: ${barsBackgroundColor};
      border: ${euiTheme.border.thin};
      ${logicalCSS('border-bottom', 'none')}
    `,
    euiMarkdownEditorToolbar__buttons: css`
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      column-gap: ${euiTheme.size.xs};
    `,
    euiMarkdownEditorToolbar__divider: css`
      display: block;
      ${logicalCSS('height', euiTheme.size.l)}
      ${logicalCSS('margin-left', euiTheme.size.xs)}
      ${logicalCSS('padding-right', euiTheme.size.xs)}
      ${logicalCSS(
        'border-left',
        `${euiTheme.border.width.thin} solid ${euiTheme.border.color}`
      )}
    `,
  };
};
