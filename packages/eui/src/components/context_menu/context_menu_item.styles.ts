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
  logicalTextAlignCSS,
  euiFontSize,
} from '../../global_styling';

export const euiContextMenuItemStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiContextMenuItem: css`
      display: flex;
      gap: ${euiTheme.size.s};
      ${logicalCSS('width', '100%')}
      ${logicalTextAlignCSS('left')}
      color: ${euiTheme.colors.textParagraph};
      outline-offset: -${euiTheme.focus.width};

      &:where(a, button):not(:disabled) {
        &:hover,
        &:focus {
          text-decoration: underline;
        }

        &:focus {
          background-color: ${euiTheme.focus.backgroundColor};
        }
      }
    `,
    disabled: css`
      color: ${euiTheme.colors.textDisabled};
      cursor: default;
    `,
    layoutAlign: {
      center: css`
        align-items: center;
      `,
      top: css`
        align-items: flex-start;
      `,
      bottom: css`
        align-items: flex-end;
      `,
    },
    sizes: {
      m: css`
        padding: ${euiTheme.size.m};
      `,
      s: css`
        padding: ${euiTheme.size.s};
      `,
    },
    // Children
    euiContextMenu__icon: css`
      flex-shrink: 0;
    `,
    text: {
      euiContextMenuItem__text: css`
        flex-grow: 1;
        overflow: hidden; /* allows for text truncation */
      `,
      s: css`
        ${euiFontSize(euiThemeContext, 's')}
      `,
    },
    euiContextMenuItem__arrow: css`
      align-self: flex-end;
    `,
  };
};
