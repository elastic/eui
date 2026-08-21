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
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';
import {
  highContrastModeStyles,
  preventForcedColors,
} from '../../../global_styling/functions/high_contrast';
import { euiFormVariables } from '../../form/form.styles';

const hasButtonOnlySelector = ':not(:has(.euiButtonIcon))';
const hasButtonIconOnlySelector = ':not(:has(.euiButton, .euiButtonEmpty))';
const buttonItemSelector =
  '.euiButtonGroup__item, .euiToolTipAnchor, .euiPopover, .euiButton';
const buttonOnlyItemSelector = `*:is(${buttonItemSelector}):not(:has(.euiButtonIcon))`;

export const euiButtonGroupStyles = {
  euiButtonGroup: css`
    display: inline-block;
    ${logicalCSS('max-width', '100%')}
    position: relative; /* Ensures the EuiScreenReaderOnly component is positioned relative to this component */

    &:where([data-variant='segmented']) {
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
  const splitPadding = mathWithUnits(containerPadding, (x) => x / 2);
  const insetSize = (height: string) =>
    mathWithUnits([height, containerPadding], (x, y) => x - y * 2);
  const buttonGroupVariables = {
    gap: {
      regular: euiTheme.size.xs,
      dividers: mathWithUnits(
        [euiTheme.size.xs, euiTheme.border.width.thin],
        (x, y) => x + y
      ),
    },
    // TODO: use from buttonSizeMap once added via EuiSplitButton:
    // https://github.com/elastic/eui/pull/9865
    radius: {
      outer: euiTheme.border.radius.medium,
      inner: '2px', // should eventually be a token, but currently small and medium have the same value
    },
    size: {
      s: insetSize(buttonSizeMap.s.height),
      m: insetSize(buttonSizeMap.m.height),
    },
  };

  const dividerOffset = mathWithUnits(
    [buttonGroupVariables.gap.dividers, euiTheme.border.width.thin],
    (x, y) => (x + y) / 2
  );

  const {
    controlCompressedHeight,
    controlCompressedBorderRadius,
    backgroundColor,
    borderColor,
  } = euiFormVariables(euiThemeContext);

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

  const segmentedChildrenStyles = `
    /* Buttons are used inset and shouldn't have their own borders */
    .euiButton,
    .euiButtonIcon {
      border: none;
      pointer-events: auto; /* Ensure buttons are still clickable in jsdom */

      &::before {
        border-radius: inherit;
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
      &:where([data-variant='segmented'] &) {
        position: relative;
        display: inline-flex;
        align-items: center;
        max-inline-size: 100%;
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
        &::after {
          content: '';
          position: absolute;
          inset: 0;
          border: ${euiTheme.border.width.thin} solid
            ${euiTheme.colors.borderBasePlain};
          border-radius: inherit;
          pointer-events: none;
        }
      }
    `,
    euiButtonGroup__buttons: css`
      ${logicalCSS('max-width', '100%')}
      display: flex;
      align-items: center;

      &:where([data-variant='default'] &) {
        flex-wrap: wrap;
      }

      &:where([data-variant='segmented'] &) {
        position: relative;
        display: inline-flex;
        align-items: center;
        flex-wrap: wrap;
        gap: ${buttonGroupVariables.gap.regular};
        max-inline-size: 100%;
        padding: ${splitPadding};
        overflow: hidden;

        *:where(.euiButton, .euiButtonIcon):is(${euiDisabledSelector}) {
          background-color: transparent;
        }

        &:where([data-dividers='true'] &) {
          ${dividerStyles}
        }

        ${segmentedChildrenStyles}

        &:where([data-layout='vertical'] &) {
          flex-direction: column;

          .euiButtonGroup__item {
            justify-content: center;
          }
        }
      }
    `,
    noWrap: css`
      &:where([data-variant='segmented'] &) {
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

      &:where([data-variant='segmented'] &) {
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
    // Sizes
    size: {
      m: css`
        border-radius: ${euiTheme.border.radius.medium};
        ${_highContrastStyles(euiThemeContext)}
      `,
      s: css`
        border-radius: ${euiTheme.border.radius.small};
        ${_highContrastStyles(euiThemeContext)}
      `,
      compressed: css`
        ${logicalCSS('height', controlCompressedHeight)}
        background-color: ${backgroundColor};
        border: ${euiTheme.border.width.thin} solid ${borderColor};
        border-radius: ${controlCompressedBorderRadius};
        ${_highContrastStyles(euiThemeContext, true)}
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

const _highContrastStyles = (
  euiThemeContext: UseEuiTheme,
  compressed?: boolean
) => {
  const { euiTheme } = euiThemeContext;

  return highContrastModeStyles(euiThemeContext, {
    preferred: compressed
      ? `
        .euiButtonGroupButton {
          border: none;
        }
      `
      : '',
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
