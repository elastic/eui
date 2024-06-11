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
  logicalSizeCSS,
  euiScrollBarStyles,
} from '../../global_styling';
import {
  euiFormControlText,
  euiFormControlDefaultShadow,
  euiFormControlFocusStyles,
} from '../form/form.styles';
import { euiMarkdownEditorVariables } from './markdown_editor.styles';

export const euiMarkdownEditorTextAreaStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;
  const { minHeight } = euiMarkdownEditorVariables(euiThemeContext);

  const borderCSS = `
    border: ${euiTheme.border.thin};
    ${logicalCSS('border-bottom', 'none')}
  `;

  return {
    euiMarkdownEditorTextArea: css`
      ${logicalSizeCSS('100%')}
      ${logicalCSS('min-height', minHeight)}
      ${euiScrollBarStyles(euiThemeContext)}
      resize: vertical;

      margin: 0; /* Removes default Firefox margin */
      padding: ${euiTheme.size.m};
      ${euiFormControlText(euiThemeContext)}
      line-height: ${euiTheme.font.lineHeightMultiplier};
    `,
    readOnly: css`
      ${borderCSS}
      background-color: ${euiTheme.colors.emptyShade};
      cursor: default;

      &:focus {
        outline: none;
      }
    `,
    editable: css`
      ${euiFormControlDefaultShadow(euiThemeContext)}
      /* Override euiFormControlDefaultShadow's border/box-shadow */
      ${borderCSS}
      box-shadow: none;

      /* Prevent the text area from losing the focus outline when 
         clicking on an action button from the toolbar */
      &:focus,
      .euiMarkdownEditor:focus-within & {
        ${euiFormControlFocusStyles(euiThemeContext)}
      }
    `,
  };
};
