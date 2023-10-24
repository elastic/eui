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
  mathWithUnits,
} from '../../global_styling';

export const euiContextMenuItemStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiContextMenuItem: css`
      display: flex;
      gap: ${euiTheme.size.s};
      ${logicalCSS('width', '100%')}
      ${logicalTextAlignCSS('left')}
      color: ${euiTheme.colors.text};
      outline-offset: -${euiTheme.focus.width};

      &:enabled:hover,
      &:enabled:focus {
        text-decoration: underline;
      }

      &:enabled:focus {
        background-color: ${euiTheme.focus.backgroundColor};
      }
    `,
    disabled: css`
      color: ${euiTheme.colors.disabledText};
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
        padding-inline: ${euiTheme.size.s};
        padding-block: ${mathWithUnits(euiTheme.size.s, (x) => x * 0.75)};
      `,
    },
  };
};
