/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiFocusRing, logicalTextAlignCSS } from '../../global_styling';

/**
 * Shared link chrome used by EuiLink and bare anchors in EuiText.
 * Default interaction: paragraph color + dotted underline at rest;
 * primary color on hover/focus.
 */
export const euiLinkCSS = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return `
    font-weight: ${euiTheme.font.weight.medium};
    ${logicalTextAlignCSS('left')}
    color: ${euiTheme.colors.textParagraph};
    text-decoration: underline;
    text-decoration-style: dotted;

    &:hover,
    &:focus {
      color: ${euiTheme.colors.textPrimary};
    }

    &:hover {
      text-decoration-style: solid;
    }

    &:focus {
      ${euiFocusRing(euiThemeContext, 'outset')}
      text-decoration-style: solid;
      text-decoration-thickness: ${euiTheme.border.width.thick};
    }
  `;
};

export const euiLinkStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiLink: css`
      ${euiLinkCSS(euiThemeContext)}
      user-select: text;

      &[target='_blank'] {
        position: relative;
      }
    `,
    disabled: css`
      font-weight: inherit;
      color: inherit;
      text-decoration: none;

      &:hover {
        cursor: auto;
      }

      &:hover,
      &:focus,
      &:target {
        color: inherit;
        text-decoration: none;
      }
    `,
    // Color styles — `primary`/`text` use the interactive default from euiLinkCSS
    subdued: css(_staticColorCSS(euiTheme.colors.textSubdued)),
    success: css(_staticColorCSS(euiTheme.colors.textSuccess)),
    accent: css(_staticColorCSS(euiTheme.colors.textAccent)),
    danger: css(_staticColorCSS(euiTheme.colors.textDanger)),
    warning: css(_staticColorCSS(euiTheme.colors.textWarning)),
    ghost: css(_staticColorCSS(euiTheme.colors.textGhost)),
  };
};

const _staticColorCSS = (color: string) => {
  return `
    color: ${color};

    &:hover,
    &:focus {
      color: ${color};
    }

    &:target {
      color: darken(${color}, 10%);
    }
  `;
};
