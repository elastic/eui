/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import {
  euiButtonSizeMap,
  euiDisabledSelector,
  euiShadowXSmall,
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';
import {
  highContrastModeStyles,
  preventForcedColors,
} from '../../../global_styling/functions/high_contrast';

const hasButtonOnlySelector = ':not(:has(.euiButtonIcon))';
const hasButtonIconOnlySelector = ':not(:has(.euiButton, .euiButtonEmpty))';
const buttonItemSelector =
  '.euiButtonGroup__item, .euiToolTipAnchor, .euiPopover, .euiButton';
const buttonOnlyItemSelector = `*:is(${buttonItemSelector}):not(:has(.euiButtonIcon))`;
const segmentedStyledSelector = `*:is([data-variant='segmented'], [data-variant='selection'])`;

export const euiButtonGroupStyles = {
  euiButtonGroup: css`
    display: inline-block;
    ${logicalCSS('max-width', '100%')}
    position: relative; /* Ensures the EuiScreenReaderOnly component is positioned relative to this component */

    &:where(${segmentedStyledSelector}) {
      &${hasButtonIconOnlySelector} {
        display: flex;
      }
    }
  `,
  fullWidth: css`
    display: block;
  `,
};

export const euiButtonGroupButtonsStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const buttonSizeMap = euiButtonSizeMap(euiThemeContext);
  const containerPadding = euiTheme.size.xs;
  const splitPadding = mathWithUnits([containerPadding], (x) => x / 2);
  const buttonGroupVariables = {
    gap: {
      regular: euiTheme.size.xs,
      dividers: mathWithUnits(
        [euiTheme.size.xs, euiTheme.border.width.thin],
        (x, y) => x + y
      ),
    },
    radius: {
      outer: euiTheme.border.radius.medium,
      inner: buttonSizeMap.s.radiusInset,
    },
    size: {
      s: buttonSizeMap.s.getInsetHeight(
        buttonSizeMap.s.height,
        containerPadding
      ),
      m: buttonSizeMap.m.getInsetHeight(
        buttonSizeMap.m.height,
        containerPadding
      ),
    },
    backgroundColor: euiTheme.colors.backgroundBasePlain,
  };

  const dividerOffset = mathWithUnits(
    [buttonGroupVariables.gap.dividers, euiTheme.border.width.thin],
    (x, y) => (x + y) / 2
  );

  const containerBorderStyles = `
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      /* keep the border under any related content */
      z-index: -1;
      border: ${euiTheme.border.width.thin} solid
        ${euiTheme.colors.borderBasePlain};
      border-radius: inherit;
      pointer-events: none;
    }
  `;

  const containerCommonStyles = `
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: ${buttonGroupVariables.gap.regular};
    max-inline-size: 100%;
    padding: ${splitPadding};
    overflow: hidden;
  `;

  const dividerStyles = `
    gap: ${buttonGroupVariables.gap.dividers};

    .euiButtonGroup__item {
      position: relative;

      /* block border */
      &::before {
        content: '';
        position: absolute;
        inset-block-start: -${dividerOffset};
        inset-inline-start: -${mathWithUnits(containerPadding, (x) => x / 2)};
        inline-size: calc(
          100% + ${mathWithUnits(containerPadding, (x) => x * 2)}
        );
        block-size: ${euiTheme.border.width.thin};
        border-block-start: ${euiTheme.border.width.thin} solid
          ${euiTheme.colors.borderBasePlain};
        pointer-events: none;
      }

      /* inline border */
      &::after {
        content: '';
        position: absolute;
        inset-inline-start: -${dividerOffset};
        block-size: calc(
          var(--euiButtonGroupButtonInsetSize) - ${euiTheme.size.s}
        );
        inline-size: ${euiTheme.border.width.thin};
        border-inline-start: ${euiTheme.border.width.thin} solid
          ${euiTheme.colors.borderBasePlain};
        pointer-events: none;
      }
    }

    &:where([data-layout='horizontal'] &) {
      &:where(:is(${hasButtonIconOnlySelector}) &) {
        .euiButtonGroup__item::before {
          inset-inline-start: 0;
          inline-size: 100%;
        }
      }
    }

    &:where([data-layout='vertical'] &) {
      &:where(:is(${hasButtonIconOnlySelector}) &) {
        .euiButtonGroup__item::before {
          inset-inline-start: auto;
          inline-size: calc(
            var(--euiButtonGroupButtonInsetSize) - ${euiTheme.size.s}
          );
        }
      }
    }
  `;

  // Shared inset styles for both segmented and selection variants.
  const segmentedChildrenStyles = `
    /* Buttons are used inset and shouldn't have their own borders */
    .euiButton,
    .euiButtonIcon {
      border: none;
      pointer-events: auto; /* Ensure buttons are still clickable in jsdom */

      &::before {
        border-radius: inherit;
      }

      &:focus-visible {
        outline-offset: 0;
      }
    }

    /* Adjust children for inset behavior */
    ${buttonItemSelector},
    .euiButtonIcon {
      display: inline-flex;
      align-items: center;
      block-size: var(--euiButtonGroupButtonInsetSize);
      border-radius: ${buttonGroupVariables.radius.inner};
    }

    .euiButtonIcon {
      inline-size: var(--euiButtonGroupButtonInsetSize);
    }

    /* Only non-icon buttons auto-grow/shrink */
    .euiButton,
    ${buttonOnlyItemSelector} {
      flex: 1;
      min-inline-size: auto;
    }
  `;

  return {
    // Base
    euiButtonGroup__container: css`
      /* Shared structural styles for segmented and selection inset containers */
      &:where(${segmentedStyledSelector} &) {
        position: relative;
        display: inline-flex;
        align-items: center;
        max-inline-size: 100%;
        z-index: ${euiTheme.levels.content};
        /* splits padding between outer and inner container to ensure focus outlines are not clipped */
        padding: ${splitPadding};
        border-radius: ${buttonGroupVariables.radius.outer};
        background-color: ${euiTheme.colors.backgroundBasePlain};

        &:where([data-size='s'] &) {
          --euiButtonGroupButtonInsetSize: ${buttonGroupVariables.size.s};
          min-block-size: ${buttonSizeMap.s.height};
        }

        &:where([data-size='m'] &) {
          --euiButtonGroupButtonInsetSize: ${buttonGroupVariables.size.m};
          min-block-size: ${buttonSizeMap.m.height};
        }

        /* Faux container border */
        ${containerBorderStyles}
      }

      &:where([data-variant='selection'][data-display='inverse'] &) {
        background-color: ${euiTheme.colors.backgroundBaseSubdued};
      }
    `,
    euiButtonGroup__buttons: css`
      ${logicalCSS('max-width', '100%')}
      display: flex;
      align-items: center;
      z-index: ${euiTheme.levels.content};

      /* Legacy Options API */

      &:where(.euiButtonGroup:not([data-variant]) &) {
        ${containerCommonStyles}
        padding: ${containerPadding};
        border-radius: ${buttonGroupVariables.radius.outer};
        background-color: ${euiTheme.colors.backgroundBasePlain};

        /* Faux container border */
        ${containerBorderStyles}
      }

      /* Children API */

      &:where([data-variant='default'] &) {
        flex-wrap: wrap;
      }

      /* Shared layout for segmented inset containers */
      &:where(${segmentedStyledSelector} &) {
        flex-wrap: wrap;
        ${containerCommonStyles}

        ${segmentedChildrenStyles}

        *:where(.euiButton, .euiButtonIcon):is(${euiDisabledSelector}) {
          background-color: transparent;
        }

        &:where([data-dividers='true'] &) {
          ${dividerStyles}
        }

        &:where([data-layout='vertical'] &) {
          flex-direction: column;

          .euiButtonGroup__item {
            justify-content: center;
          }
        }
      }

      &:where([data-variant='segmented'] &) {
        *:where(.euiButton, .euiButtonIcon):is(${euiDisabledSelector}) {
          background-color: transparent;
        }
      }

      &:where([data-variant='selection'] &) {
        *:where(.euiButton, .euiButtonIcon) {
          &:is(${euiDisabledSelector}) {
            ${highContrastModeStyles(euiThemeContext, {
              forced: `
              opacity: 0.5;
            `,
            })}
          }

          &:is([aria-pressed='true']) {
            /* Ensure selected buttons are visually distinguishable in forced HCM */
            ${highContrastModeStyles(euiThemeContext, {
              forced: `
              --highContrastHoverIndicatorColor: ${euiTheme.colors.textInverse};
              ${preventForcedColors(euiThemeContext)}
              background-color: ${euiTheme.colors.fullShade};
              color: ${euiTheme.colors.emptyShade};
            `,
            })}
          }

          &:is([aria-pressed='false']) {
            background-color: transparent;
          }
        }
      }

      &:where([data-variant='selection'][data-display='regular'] &) {
        *:where(.euiButton, .euiButtonIcon):is([aria-pressed='true']) {
          background-color: ${euiTheme.colors.backgroundLightText};

          ${highContrastModeStyles(euiThemeContext, {
            none: `
              background-color: ${euiTheme.colors.backgroundLightText};
            `,
            preferred: `
              border: ${euiTheme.border.thin};
            `,
            forced: `
              background-color: ${euiTheme.colors.fullShade};
              border: none;
            `,
          })}
        }
      }

      &:where([data-variant='selection'][data-display='inverse'] &) {
        *:where(.euiButton, .euiButtonIcon):is([aria-pressed='true']) {
          ${euiShadowXSmall(euiThemeContext)}

          ${highContrastModeStyles(euiThemeContext, {
            forced: `
              border: none;
            `,
          })}
        }
      }
    `,
    noWrap: css`
      &:where(${segmentedStyledSelector} &) {
        flex-wrap: nowrap;

        /* Ensure buttons shrink properly (resulting in truncation) */
        ${buttonOnlyItemSelector} {
          flex: 0 1 auto;
          min-inline-size: 0;

          .euiButton .eui-textTruncate {
            min-inline-size: 0;
          }
        }

        &${hasButtonIconOnlySelector} {
          overflow-inline: auto;
        }
      }
    `,
    fullWidth: css`
      ${logicalCSS('width', '100%')}

      .euiButtonGroupButton,
      .euiButtonGroup__tooltipWrapper {
        flex: 1;
        ${logicalCSS('width', '100%')}
      }

      &:where([data-variant='default'] &) {
        .euiButton {
          flex-grow: 1;
          /* ensure buttons grow within the group but not each to full width */
          inline-size: auto;
        }

        .euiButtonEmpty {
          /* prevent EuiButtonEmpty from shrinking when EuiButton siblings grow */
          flex-shrink: 0;
        }
      }

      &:where(${segmentedStyledSelector} &) {
        &${hasButtonIconOnlySelector} {
          inline-size: auto;
        }

        &${hasButtonOnlySelector} {
          .euiButtonGroup__buttons {
            inline-size: 100%;
          }

          ${buttonOnlyItemSelector} {
            flex-grow: 1;
          }
        }
      }
    `,
    // Options API sizes
    size: {
      m: css`
        ${logicalCSS('height', buttonSizeMap.m.height)}
        --euiButtonGroupButtonInsetSize: ${buttonGroupVariables.size.m};
        background-color: ${buttonGroupVariables.backgroundColor};
        border-radius: ${buttonGroupVariables.radius.outer};
        ${_highContrastStyles(euiThemeContext)}
      `,
      s: css`
        ${logicalCSS('height', buttonSizeMap.s.height)}
        --euiButtonGroupButtonInsetSize: ${buttonGroupVariables.size.s};
        background-color: ${buttonGroupVariables.backgroundColor};
        border-radius: ${buttonGroupVariables.radius.outer};
        ${_highContrastStyles(euiThemeContext)}
      `,
    },
    gutterSize: {
      xs: css`
        gap: ${euiTheme.size.xs};
      `,
      s: css`
        gap: ${euiTheme.size.s};
      `,
      m: css`
        gap: ${euiTheme.size.base};
      `,
      l: css`
        gap: ${euiTheme.size.l};
      `,
      xl: css`
        gap: ${euiTheme.size.xl};
      `,
    },
  };
};

const _highContrastStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return highContrastModeStyles(euiThemeContext, {
    preferred: `
      .euiButtonGroupButton {
        border: none;
      }
    `,
    forced: `
      .euiButtonGroupButton-isSelected {
        ${preventForcedColors(euiThemeContext)}
        color: ${euiTheme.colors.emptyShade};
        background-color: ${euiTheme.colors.fullShade};

        &:is(:hover, :focus):not(${euiDisabledSelector}) {
          &::before {
            border-color: ${euiTheme.colors.textInverse};
          }
        }
      }

      .euiButtonGroupButton:is(${euiDisabledSelector}) {
        opacity: 0.5;
      }
    `,
  });
};
