/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { euiFocusRing, logicalCSS, mathWithUnits } from '../../global_styling';

export const euiTreeViewItemStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const defaultSize = euiTheme.size.xl;
  const compressedSize = euiTheme.size.l;

  return {
    li: {
      euiTreeView__node: css`
        list-style: none;
      `,
      default: css`
        ${logicalCSS('max-height', defaultSize)}
        line-height: ${defaultSize};
      `,
      compressed: css`
        ${logicalCSS('max-height', compressedSize)}
        line-height: ${compressedSize};
      `,
      expanded: css`
        ${logicalCSS('max-height', '100vh')}
      `,
    },

    button: {
      euiTreeView__nodeInner: css`
        ${logicalCSS('width', '100%')}
        ${logicalCSS('padding-left', euiTheme.size.s)}
        ${logicalCSS('padding-right', euiTheme.size.xxs)}
        display: flex;
        align-items: center;

        &:focus {
          ${euiFocusRing(euiThemeContext, 'inset')}
        }

        &:hover,
        &:active,
        &:focus {
          background-color: ${euiTheme.components.treeViewItemBackgroundHover};
        }
      `,
      default: css`
        ${logicalCSS('height', defaultSize)}
        gap: ${euiTheme.size.s};
        border-radius: ${euiTheme.border.radius.medium};
      `,
      compressed: css`
        ${logicalCSS('height', compressedSize)}
        gap: ${euiTheme.size.xs};
        border-radius: ${euiTheme.border.radius.small};
      `,
    },

    icon: {
      euiTreeView__iconWrapper: css`
        flex-shrink: 0;
        line-height: 0; /* Vertically centers the icon */

        /* Handle smaller icons in compressed mode */
        & > * {
          ${logicalCSS('max-width', '100%')}
        }

        & > .euiToken {
          ${logicalCSS('max-height', '100%')}
          ${logicalCSS('height', 'auto')}

          svg {
            ${logicalCSS('width', '100%')}
          }
        }
      `,
      default: css`
        ${logicalCSS(
          'width',
          mathWithUnits(defaultSize, (x) => x / 2)
        )}
      `,
      compressed: css`
        ${logicalCSS(
          'width',
          mathWithUnits(compressedSize, (x) => x / 2)
        )}
      `,
    },
  };
};
