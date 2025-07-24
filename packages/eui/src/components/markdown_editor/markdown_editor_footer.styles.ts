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

export const euiMarkdownEditorFooterStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { borderRadius, barsBackgroundColor } =
    euiMarkdownEditorVariables(euiThemeContext);

  return {
    euiMarkdownEditorFooter: css`
      display: inline-flex;
      align-items: center;
      padding: ${euiTheme.size.xs};
      border: ${euiTheme.border.thin};
      background-color: ${barsBackgroundColor};
    `,
    euiMarkdownEditorFooter__actions: css`
      flex: 1;
      display: inline-flex;
      align-items: center;
      gap: ${euiTheme.size.xs};
    `,
    // Override default button border radius to match the overall markdown editor
    euiMarkdownEditorFooter__uploadError: css`
      border-radius: ${borderRadius};
    `,
    euiMarkdownEditorFooter__popover: css`
      ${logicalCSS('width', '300px')}
    `,
  };
};
