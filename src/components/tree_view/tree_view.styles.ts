/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, transparentize } from '../../services';
import {
  euiFontSize,
  euiFocusRing,
  logicalCSS,
  mathWithUnits,
} from '../../global_styling';

export const euiTreeViewStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const defaultSize = euiTheme.size.xl;
  const compressedSize = euiTheme.size.l;

  return {
    euiTreeView: css`
      margin: 0;
      list-style-type: none;

      & & {
        ${logicalCSS('padding-left', euiTheme.size.l)}
      }
    `,
    default: css`
      font-size: ${euiFontSize(euiThemeContext, 'm').fontSize};
    `,
    compressed: css`
      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
    `,

    li: {
      euiTreeView__node: css``,
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
          background-color: ${transparentize(
            euiTheme.colors.text,
            euiTheme.focus.transparency
          )};
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
      // Line height helps vertically center the icons
      euiTreeView__iconWrapper: css`
        line-height: 0;
      `,
      euiTreeView__placeholder: css``,
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
