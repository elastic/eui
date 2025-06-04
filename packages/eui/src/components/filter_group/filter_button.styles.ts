/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { isEuiThemeRefreshVariant, UseEuiTheme } from '../../services';
import {
  logicalCSS,
  mathWithUnits,
  euiTextShift,
  euiTextTruncate,
  highContrastModeStyles,
  preventForcedColors,
  euiButtonEmptyColor,
} from '../../global_styling';
import { cssSupportsHasWithNextSibling } from '../../global_styling/functions/supports';
import { euiFormVariables } from '../form/form.styles';

export const euiFilterButtonDisplay = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'buttonVariant'
  );

  return {
    flex: '1 1 auto',
    minInlineSize: mathWithUnits(
      euiTheme.size.base,
      (x) => x * (isRefreshVariant ? 2.75 : 3)
    ),
  };
};

export const euiFilterButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'buttonVariant'
  );
  const { controlHeight, borderColor } = euiFormVariables(euiThemeContext);

  const selectedSelector = '.euiFilterButton-isSelected';
  const border = `${euiTheme.border.width.thin} solid ${borderColor}`;

  // Pseudo elements create borders without affecting width. We also prefer them
  // over box-shadow for Windows high contrast theme compatibility
  const leftBorder = `
    &::before {
      content: '';
      position: absolute;
      ${logicalCSS('right', '100%')}
      ${logicalCSS('vertical', 0)}
      ${logicalCSS('border-left', border)}
    }
  `;
  // Bottom borders are needed for responsive flex-wrap behavior
  const bottomBorder = `
    &::after {
      content: '';
      position: absolute;
      ${logicalCSS('top', '100%')}
      ${logicalCSS('horizontal', 0)}
      ${logicalCSS('border-bottom', border)}
    }
  `;

  const buttonStyles = isRefreshVariant
    ? `
      ${logicalCSS('width', '100%')}

      &:not(${selectedSelector}) {
        &:hover,
        &:active {
          .euiFilterButton__notification[class*="subdued"] {
            background-color: ${
              euiTheme.components.filterButtonBadgeBackgroundHover
            }
          }
        }
      }
    `
    : `
      ${logicalCSS('height', controlHeight)}
      border-radius: 0;
      ${leftBorder}
      ${bottomBorder}

      /* :not(:disabled) specificity needed to override EuiButtonEmpty styles */
      &:hover:not(:disabled),
      &:focus:not(:disabled) {
        /* Remove underline from whole button so notifications don't get the underline */
        text-decoration: none;

        .euiFilterButton__text {
          /* And put it only on the actual text part */
          text-decoration: underline;
        }
      }
    `;

  const toggleTypeStyles = isRefreshVariant
    ? `
      ${euiFilterButtonDisplay(euiThemeContext)};

      ${highContrastModeStyles(euiThemeContext, {
        forced: `
          &:is(${selectedSelector}) {
            ${preventForcedColors(euiThemeContext)}
              color: ${euiTheme.colors.emptyShade};
              background-color: ${euiTheme.colors.fullShade};
          }
        `,
      })}
    `
    : `
      font-weight: ${euiTheme.font.weight.medium};
      padding: 0;

      &:is(${selectedSelector}) {
        color: ${euiButtonEmptyColor(euiThemeContext, 'text').color};
        background-color: transparent;
        font-weight: ${euiTheme.font.weight.bold};
      }
    `;

  const withNextSelector = isRefreshVariant
    ? '& + .euiFilterButton__wrapper'
    : '.euiFilterButton__wrapper:has(&) + .euiFilterButton__wrapper';
  // handles display of borders between buttons
  const withNextStyles = isRefreshVariant
    ? `
      &::before {
        border: none;
      }

      ${cssSupportsHasWithNextSibling(
        `
          &:has(+ :not(&)) {
            ${logicalCSS('padding-right', '0')}
          }
        `
      )}
    `
    : `
      .euiFilterButton {
        &::before {
          border: none;
        }
      }
    `;

  return {
    euiFilterButton: css`
      ${!isRefreshVariant && euiFilterButtonDisplay(euiThemeContext)};
      position: relative;

      ${buttonStyles}
    `,
    buttonType: {
      default: css`
        ${isRefreshVariant &&
        `
          border-radius: 0;

          &:focus-visible {
            z-index: 1;
            outline-offset: -${euiTheme.border.width.thick};
            border-radius: ${euiTheme.border.radius.small};
            transition: none;
          }
        `}
      `,
      toggle: css`
        &:focus-visible {
          outline-offset: ${mathWithUnits(euiTheme.focus.width, (x) =>
            isRefreshVariant ? x / 2 : x * -1
          )};
        }

        ${toggleTypeStyles}
      `,
    },
    withNext: css`
      ${withNextSelector} {
        ${logicalCSS('margin-left', `-${euiTheme.size.xs}`)}

        /* Remove just the left faux border */
        ${withNextStyles}
      }
    `,
    noGrow: css`
      flex-grow: 0;
    `,
    hasNotification: css`
      ${logicalCSS(
        'min-width',
        mathWithUnits(euiTheme.size.base, (x) => x * 6)
      )}
    `,
    hasActiveFilters: css`
      font-weight: ${isRefreshVariant
        ? euiTheme.font.weight.medium
        : euiTheme.font.weight.bold};
    `,
  };
};

export const euiFilterButtonWrapperStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'buttonVariant'
  );

  const { borderColor } = euiFormVariables(euiThemeContext);
  const border = `${euiTheme.border.width.thin} solid ${borderColor}`;

  // Pseudo elements create borders without affecting width. We also prefer them
  // over box-shadow for Windows high contrast theme compatibility
  const leftBorder = `
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      ${logicalCSS('border-left', border)}

      pointer-events: none;
    }
  `;
  // Bottom borders are needed for responsive flex-wrap behavior
  const bottomBorder = `
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      ${logicalCSS('border-bottom', border)}
      pointer-events: none;
    }
  `;

  return {
    wrapper: css`
      ${euiFilterButtonDisplay(euiThemeContext)}
      position: relative;
      display: flex;
      align-items: center;

      ${isRefreshVariant &&
      `
        ${leftBorder}
        ${bottomBorder}
      `}

      ${logicalCSS('padding-vertical', euiTheme.border.width.thin)}
    `,
    hasToggle: css`
      ${logicalCSS(
        'padding-horizontal',
        isRefreshVariant ? euiTheme.border.width.thin : '0'
      )}

      /* removes right padding for toggle buttons that have a right divider border */
      ${cssSupportsHasWithNextSibling(
        `
          &:not([class*="withNext"]):has(+ :not(&)) {
            ${logicalCSS('padding-right', '0')}
          }
        `
      )}
    `,
  };
};

export const euiFilterButtonChildStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'buttonVariant'
  );

  return {
    content: {
      euiFilterButton__content: css`
        ${isRefreshVariant &&
        `
          .euiThemeProvider {
            display: inline-flex;
          }
        `}
      `,
      hasIcon: css`
        /* Align the dropdown arrow/caret to the right */
        & > .euiIcon:last-child {
          ${logicalCSS('margin-left', 'auto')}
        }
      `,
    },
    text: {
      euiFilterButton__text: css`
        ${euiTextShift('bold', 'data-text', euiTheme)}
        ${euiTextTruncate()}
      `,
      hasNotification: css`
        ${logicalCSS(
          'min-width',
          mathWithUnits(
            euiTheme.size.base,
            (x) => x * (isRefreshVariant ? 2 : 3)
          )
        )}
      `,
    },
    notification: {
      euiFilterButton__notification: css`
        cursor: inherit;
        /* ensures correct styles in forced high contrast mode as its wrapper uses forced-color-adjust: none  */
        forced-color-adjust: auto;

        /* uses & to ensure override by same selector specificity instead of using !important */
        & {
          transition: none;
        }
      `,
      disabled: css`
        opacity: 0.5;
      `,
    },
  };
};
