/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { isEuiThemeRefreshVariant, UseEuiTheme } from '../../../services';
import {
  logicalCSS,
  logicalShorthandCSS,
  euiCanAnimate,
  highContrastModeStyles,
} from '../../../global_styling';
import { euiButtonDisplayStyles } from '../button_display/_button_display.styles';
import { EuiButtonDisplaySizes } from '../button_display/_button_display';

export const euiButtonEmptyStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'buttonVariant'
  );

  // EuiButtonEmpty uses the same size/font styling as EuiButtonDisplay,
  // but does not share enough of the same colors/props to the point
  // of using the actual component - so we'll reuse its styles instead
  const displayStyles = euiButtonDisplayStyles(euiThemeContext);

  const refreshFlushStyles = `
      /* using duplicate selector to ensure specificity */
      &&:hover,
      &&:active {
        background-color: transparent;

        /* removes hover overlay */
        &::before {
          display: none;
        }
      }

      &:hover:not(:disabled),
      &:focus {
        text-decoration: underline;

        ${highContrastModeStyles(euiThemeContext, {
          forced: `
            /* hides HCM hover border, flush buttons use text-decoration */
            &::after {
              display: none;
            }
          `,
        })}
      }

      .euiButtonEmpty__content {
        gap: ${euiTheme.size.s};
        
      }

      .euiButtonEmpty__text {
        /* unset default EuiButtonDisplayContent text pagging */
        padding: 0;
      }
  `;

  const _buttonSize = (sizeKey: EuiButtonDisplaySizes) => {
    const paddingStyles = !isRefreshVariant
      ? css`
          ${logicalShorthandCSS('padding', `0 ${euiTheme.size.s}`)}
        `
      : undefined;

    return [displayStyles[sizeKey], paddingStyles];
  };

  return {
    euiButtonEmpty: css`
      ${displayStyles.euiButtonDisplay}

      /* Change the easing, quickness to not bounce so lighter backgrounds don't flash */
      ${euiCanAnimate} {
        transition-timing-function: ease-in;
        transition-duration: ${euiTheme.animation.fast};
      }
    `,
    isDisabled: displayStyles.isDisabled,
    // Sizes
    xs: _buttonSize('xs'),
    s: _buttonSize('s'),
    m: _buttonSize('m'),
    // Flush sides
    flush: css`
      padding-inline: 0;
      ${isRefreshVariant && refreshFlushStyles}
    `,
    left: css`
      ${logicalCSS('margin-right', euiTheme.size.s)}
    `,
    right: css`
      ${logicalCSS('margin-left', euiTheme.size.s)}
    `,
    both: css``,
  };
};
