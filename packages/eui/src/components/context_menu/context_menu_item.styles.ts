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
  euiButtonEmptyColor,
  _EuiExtendedButtonColor,
  EXTENDED_BUTTON_COLORS,
} from '../../global_styling';

export const euiContextMenuItemStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiContextMenuItem: css`
      /* needed to ensure all items are navigable in NVDA browse mode ¯\_(ツ)_/¯ */
      display: flex;
    `,
    layoutAlign: {
      center: css`
        .euiListItemLayout__prepend {
          align-self: center;
        }
      `,
      top: css`
        .euiListItemLayout__prepend {
          align-self: flex-start;
          ${logicalCSS('margin-top', euiTheme.size.s)}
        }
      `,
      bottom: css`
        .euiListItemLayout__prepend {
          align-self: flex-end;
          ${logicalCSS('margin-bottom', euiTheme.size.s)}
        }
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
    },
    euiContextMenuItem__arrow: css`
      align-self: flex-end;
    `,
    // Colors - maps button color names to text color overrides
    colors: Object.fromEntries(
      EXTENDED_BUTTON_COLORS.map((color) => [
        color,
        css`
          color: ${euiButtonEmptyColor(euiThemeContext, color).color};
        `,
      ])
    ) as Record<_EuiExtendedButtonColor, ReturnType<typeof css>>,
  };
};
