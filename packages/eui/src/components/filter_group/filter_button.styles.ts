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
  highContrastModeStyles,
  preventForcedColors,
  euiButtonSizeMap,
} from '../../global_styling';
import { euiFormVariables } from '../form/form.styles';

export const euiFilterButtonDisplay = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    flex: '1 1 auto',
    minInlineSize: mathWithUnits(euiTheme.size.base, (x) => x * 2.75),
  };
};

export const euiFilterButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const buttonSizeMap = euiButtonSizeMap(euiThemeContext);
  const selectedSelector = '.euiFilterButton-isSelected';
  const withNextSelector = '& + .euiFilterButton__wrapper';

  const containerPadding = euiTheme.size.xs;

  return {
    euiFilterButton: css`
      --euiFilterButtonInsetSize: ${buttonSizeMap.m.getInsetHeight(
        buttonSizeMap.m.height,
        containerPadding
      )};
      --euiFilterButtonRadius: ${buttonSizeMap.m.radiusInset};

      position: relative;
      block-size: var(--euiFilterButtonInsetSize);
      ${logicalCSS('width', '100%')}
      border: none;
      border-radius: var(
        --euiFilterButtonRadius,
        ${euiTheme.border.radius.small}
      );

      &:not(${selectedSelector}) {
        &:hover,
        &:active {
          .euiFilterButton__notification[class*='subdued'] {
            background-color: ${euiTheme.components
              .filterButtonBadgeBackgroundHover};
          }
        }
      }

      /* use increased specificity over base button */
      &&:focus-visible {
        outline-style: auto;
        outline-offset: 0;
      }
    `,
    buttonType: {
      toggle: css`
        ${euiFilterButtonDisplay(euiThemeContext)}

        ${highContrastModeStyles(euiThemeContext, {
          forced: `
            &:is(${selectedSelector}) {
              ${preventForcedColors(euiThemeContext)}
                color: ${euiTheme.colors.emptyShade};
                background-color: ${euiTheme.colors.fullShade};
            }
          `,
        })}
      `,
    },
    compressed: css`
      --euiFilterButtonInsetSize: ${buttonSizeMap.s.getInsetHeight(
        buttonSizeMap.s.height,
        containerPadding
      )};
      --euiFilterButtonRadius: ${buttonSizeMap.s.radiusInset};
    `,
    withNext: css`
      ${withNextSelector} {
        margin-inline-start: -${containerPadding};

        /* account for group faux border spacing */
        &:where(.euiFilterGroup[data-dividers='true'] &) {
          margin-inline-start: -${mathWithUnits([containerPadding, euiTheme.border.width.thin], (x, y) => x + y)};
        }

        /* Remove just the left faux border */
        &::before {
          border: none;
        }
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
      font-weight: ${euiTheme.font.weight.medium};
    `,
    isSelected: css`
      &${selectedSelector} {
        background-color: ${euiTheme.colors.backgroundLightText};

        ${highContrastModeStyles(euiThemeContext, {
          preferred: `
            border: ${euiTheme.border.thin};
          `,
        })}
      }
    `,
  };
};

export const euiFilterButtonWrapperStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const buttonSizeMap = euiButtonSizeMap(euiThemeContext);
  const { borderColor } = euiFormVariables(euiThemeContext);
  const border = `${euiTheme.border.width.thin} solid ${borderColor}`;
  const containerPadding = euiTheme.size.xs;

  // Pseudo elements create borders without affecting width. We also prefer them
  // over box-shadow for Windows high contrast theme compatibility
  const leftBorder = `
    &::before {
      content: '';
      position: absolute;
      inset-inline-start: -${euiTheme.border.width.thin};
      block-size: calc(
        var(--euiFilterButtonSize, ${euiTheme.size.xl}) - ${euiTheme.size.base}
      );
      inline-size: ${euiTheme.border.width.thin};
      border-inline-start: ${euiTheme.border.width.thin} solid
        ${euiTheme.colors.borderBasePlain};
      pointer-events: none;
    }
  `;
  // Bottom borders are needed for responsive flex-wrap behavior
  const bottomBorder = `
    &::after {
      content: '';
      position: absolute;
      inset-block-start: -${euiTheme.border.width.thin};
      inset-inline-start: 0;
      inline-size: calc(100% + ${euiTheme.border.width.thin});
      ${logicalCSS('border-bottom', border)}
      pointer-events: none;
    }
  `;

  return {
    wrapper: css`
      --euiFilterButtonSize: ${buttonSizeMap.m.height};

      ${euiFilterButtonDisplay(euiThemeContext)}
      position: relative;
      display: flex;
      align-items: center;
      block-size: var(--euiFilterButtonSize, ${euiTheme.size.xl});

      padding: ${containerPadding};

      & + :where(:has(.euiFilterButton)) {
        margin-inline-start: -${containerPadding};
      }
    `,
    compressed: css`
      --euiFilterButtonSize: ${buttonSizeMap.s.height};
    `,
    hasDividers: css`
      ${leftBorder}
      ${bottomBorder}

      & + :where(:has(.euiFilterButton)) {
        margin-inline-start: 0;
      }
    `,
  };
};

export const euiFilterButtonChildStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    content: {
      euiFilterButton__content: css`
        .euiThemeProvider {
          display: inline-flex;
        }
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
        ${logicalCSS('padding-horizontal', euiTheme.size.xs)}
      `,
      hasNotification: css`
        ${logicalCSS(
          'min-width',
          mathWithUnits(euiTheme.size.base, (x) => x * 2)
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
