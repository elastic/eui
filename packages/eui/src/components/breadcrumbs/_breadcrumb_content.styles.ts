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
  euiFontSize,
  euiTextTruncate,
  euiFocusRing,
  logicalCSS,
  logicalBorderRadiusCSS,
  mathWithUnits,
  euiButtonColor,
} from '../../global_styling';
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';

/**
 * Styles cast to inner <a>, <button>, <span> elements
 */
export const euiBreadcrumbContentStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  // Reuse button colors for `type="application`" clickable breadcrumbs
  const buttonColors = euiButtonColor(euiThemeContext, 'primary');
  const applicationButtonColors = {
    backgroundColor: euiTheme.colors.backgroundLightPrimary,
    color: buttonColors.color,
  };

  // Create custom darker gray colors for non-clickable application breadcrumbs
  // The numbers/ratios are fairly specific here to pass WCAG AA contrast minimums
  const applicationTextColors = {
    backgroundColor: euiTheme.components.breadcrumbsApplicationBackground,
    color: euiTheme.components.breadcrumbsApplicationColor,
  };

  // Create an arrow "border" in high contrast modes. We have to use a
  // filter/drop-shadow workaround to get a border working with clip-path.
  // Note: the filter must be on the parent wrapper, not on the clipped element
  const dropShadow = (borderColor: string) =>
    `filter: drop-shadow(${euiTheme.border.width.thin} 0 0 ${
      highContrastMode === 'forced' ? euiTheme.border.color : borderColor
    });`;
  const applicationHighContrastArrow = highContrastModeStyles(euiThemeContext, {
    preferred: `
      &:is(a, button) {
        .euiBreadcrumb:has(&) {
          ${dropShadow(applicationButtonColors.color)}
        }
      }
      &:not(a, button) {
        .euiBreadcrumb:has(&) {
          ${dropShadow(applicationTextColors.color)}
        }
      }
    `,
  });

  return {
    euiBreadcrumb__content: css`
      /* Unset EuiLink's bolder font weight */
      font-weight: ${euiTheme.font.weight.regular};
      text-align: center;
      vertical-align: baseline;

      /* TODO: Remove this ':not()' selector and simply have this be
      baseline CSS once the 'color' prop is removed */
      &:not(.euiLink) {
        color: ${euiTheme.colors.textSubdued};
      }
    `,

    // Truncation styles
    isTruncated: css`
      ${euiTextTruncate(mathWithUnits(euiTheme.size.base, (x) => x * 10))}
    `,
    isTruncatedLast: css`
      /* This removes the default breadcrumb max-width while ensuring that the last breadcrumb
         still cuts off with a '...' if it's overflowing outside the parent breadcrumbs container */
      ${euiTextTruncate('none')}
    `,
    isInteractive: css`
      &:not(:disabled) {
        text-decoration: underline;

        /* TODO: Remove this 'class*=' selector once the 'color' prop is removed */
        &[class*='euiLink-subdued'] {
          &:hover,
          &:focus {
            color: ${euiTheme.colors.textParagraph};
          }
        }
      }
    `,

    // Types
    page: css`
      &:is(a):focus {
        ${euiFocusRing(euiThemeContext, 'inset')}
      }

      &:is(button):focus {
        ${euiFocusRing(euiThemeContext, 'center')}
      }
    `,
    application: css`
      ${euiFontSize(euiThemeContext, 'xs')}
      font-weight: ${euiTheme.font.weight.medium};
      background-color: ${applicationTextColors.backgroundColor};
      ${highContrastModeStyles(euiThemeContext, {
        preferred: `border: ${euiTheme.border.width.thin} solid currentColor;`,
      })}
      color: ${applicationTextColors.color};
      line-height: ${euiTheme.size.base};
      ${logicalCSS('padding-vertical', euiTheme.size.xs)}
      ${logicalCSS('padding-horizontal', euiTheme.size.base)}

      &:is(a, button) {
        background-color: ${applicationButtonColors.backgroundColor};
        color: ${applicationButtonColors.color};
      }

      &:focus {
        ${euiFocusRing(euiThemeContext, 'inset')}
      }

      &:focus-visible {
        border-radius: ${euiTheme.border.radius.medium};
        clip-path: none;

        .euiBreadcrumb:has(&) {
          z-index: 2;
          ${highContrastModeStyles(euiThemeContext, {
            preferred: 'filter: none;',
          })}
        }
      }
    `,
    applicationStyles: {
      onlyChild: css`
        border-radius: ${euiTheme.border.radius.medium};
        ${logicalCSS('padding-horizontal', euiTheme.size.m)}
      `,
      firstChild: css`
        ${logicalBorderRadiusCSS(
          `${euiTheme.border.radius.medium} 0 0 ${euiTheme.border.radius.medium}`,
          true
        )}
        clip-path: polygon(
          0 0,
          calc(100% - ${euiTheme.size.s}) 0,
          100% 50%,
          calc(100% - ${euiTheme.size.s}) 100%,
          0 100%
        );
        ${logicalCSS('padding-left', euiTheme.size.m)}
        ${applicationHighContrastArrow}
      `,
      intermediateChild: `
        clip-path: polygon(
          0 0,
          calc(100% - ${euiTheme.size.s}) 0,
          100% 50%,
          calc(100% - ${euiTheme.size.s}) 100%,
          0 100%,
          ${euiTheme.size.s} 50%
        );
        ${applicationHighContrastArrow}
      `,
      lastChild: css`
        ${logicalBorderRadiusCSS(
          `0 ${euiTheme.border.radius.medium} ${euiTheme.border.radius.medium} 0`,
          true
        )}
        clip-path: polygon(
          0 0,
          100% 0,
          100% 100%,
          0 100%,
          ${euiTheme.size.s} 50%
        );
        ${logicalCSS('padding-right', euiTheme.size.m)}
      `,
    },
  };
};

export const euiBreadcrumbPopoverStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiBreadcrumb__popoverButton: css`
      max-inline-size: 100%;
      display: inline-flex;
      align-items: center;
      gap: ${euiTheme.size.xs};
    `,
    euiBreadcrumb__popoverTruncation: css``,
    popoverWrapper: {
      euiBreadcrumb__popoverWrapper: css``,
      page: css`
        /* At small container widths, the popover anchor needs to leave room for the breadcrumb separator,
         which is weird to get an exact width for because it's transformed at an angle */
        max-inline-size: calc(
          100% - ${mathWithUnits(euiTheme.size.base, (x) => x + 1)}
        );
      `,
      application: null,
    },
  };
};
