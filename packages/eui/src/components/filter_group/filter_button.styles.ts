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
  mathWithUnits,
  euiTextShift,
  euiTextTruncate,
} from '../../global_styling';
import { euiFormVariables } from '../form/form.styles';

export const euiFilterButtonDisplay = ({ euiTheme }: UseEuiTheme) => {
  const isExperimental = euiTheme.flags?.buttonVariant === 'experimental';

  return {
    flex: '1 1 auto',
    minInlineSize: mathWithUnits(
      euiTheme.size.base,
      (x) => x * (isExperimental ? 2.75 : 3)
    ),
  };
};

export const euiFilterButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isExperimental = euiTheme.flags?.buttonVariant === 'experimental';
  const { controlHeight, borderColor } = euiFormVariables(euiThemeContext);

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

  const buttonStyles = !isExperimental
    ? `
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
    `
    : `
      &:hover,
      &:active {
        .euiFilterButton__notification[class*="subdued"] {
          background-color: ${euiTheme.components.filterButtonBadgeBackgroundHover}
        }
      }
    `;

  const defaultButtonStyles =
    isExperimental &&
    `
      border-radius: 0;

      &:focus-visible {
        z-index: 1;
        outline-offset: -${euiTheme.focus.width};
        border-radius: ${euiTheme.border.radius.small};
        transition: none;
      }
    `;

  const withNextSelector = isExperimental
    ? '& + .euiFilterButton__wrapper'
    : '& + .euiFilterButton';
  const withNextStyles = isExperimental
    ? `
      &::before {
        border: none;
      }
    `
    : `
      &::before {
        display: none;
      }
    `;

  return {
    euiFilterButton: css`
      ${!isExperimental && euiFilterButtonDisplay(euiThemeContext)}
      position: relative;

      ${!isExperimental && logicalCSS('height', controlHeight)}
      ${isExperimental && logicalCSS('width', '100%')}

      ${buttonStyles}
    `,
    buttonType: {
      default: css`
        ${defaultButtonStyles}
      `,
      toggle: css`
        ${isExperimental && euiFilterButtonDisplay(euiThemeContext)}

        &:focus-visible {
          outline-offset: ${mathWithUnits(euiTheme.focus.width, (x) =>
            isExperimental ? x / 2 : x * -1
          )};
        }
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
      font-weight: ${isExperimental
        ? euiTheme.font.weight.regular
        : euiTheme.font.weight.bold};
    `,
  };
};

export const euiFilterButtonWrapperStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

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

      ${logicalCSS('padding-vertical', euiTheme.border.width.thin)}

      ${leftBorder}
      ${bottomBorder}
    `,
    hasToggle: css`
      padding: ${euiTheme.border.width.thin};
    `,
  };
};

export const euiFilterButtonChildStyles = ({ euiTheme }: UseEuiTheme) => {
  const isExperimental = euiTheme.flags?.buttonVariant === 'experimental';

  const experimentalContentStyles =
    isExperimental &&
    `
      .euiThemeProvider {
        display: inline-flex;
      }
    `;

  return {
    content: {
      euiFilterButton__content: css`
        ${experimentalContentStyles}
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
          mathWithUnits(euiTheme.size.base, (x) => x * (isExperimental ? 2 : 3))
        )}
      `,
    },
    notification: {
      euiFilterButton__notification: css`
        cursor: inherit;
      `,
      disabled: css`
        opacity: 0.5;
      `,
    },
  };
};
