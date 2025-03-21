/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme, makeHighContrastColor } from '../../services';
import {
  logicalCSS,
  mathWithUnits,
  euiCanAnimate,
  euiFontSize,
} from '../../global_styling';
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';

// There are multiple components that only need the form max-width size &
// don't need the extra overhead/color computing expense of every form var.
// For microperf, we're making this its own util
export const euiFormMaxWidth = ({ euiTheme }: UseEuiTheme) =>
  euiTheme.components.forms.maxWidth;

export const euiFormVariables = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;
  const backgroundColor = highContrastMode
    ? euiTheme.colors.emptyShade
    : euiTheme.components.forms.background;

  const controlHeight = euiTheme.size.xxl;
  const controlCompressedHeight = euiTheme.size.xl;

  const sizes = {
    maxWidth: euiFormMaxWidth(euiThemeContext),
    controlHeight: controlHeight,
    controlCompressedHeight: controlCompressedHeight,
    controlPadding: euiTheme.size.m,
    controlCompressedPadding: euiTheme.size.s,
    controlBorderRadius: euiTheme.border.radius.medium,
    controlCompressedBorderRadius: euiTheme.border.radius.small,
    iconAffordance: mathWithUnits(euiTheme.size.base, (x) => x * 1.5),
    iconCompressedAffordance: mathWithUnits(euiTheme.size.m, (x) => x * 1.5),
    stateUnderlineHeight: highContrastMode
      ? mathWithUnits(euiTheme.border.width.thick, (x) => x * 2)
      : euiTheme.border.width.thick,
  };

  const colors = {
    textColor: euiTheme.colors.textParagraph,
    textColorDisabled: euiTheme.components.forms.colorDisabled,
    backgroundColor: backgroundColor,
    backgroundDisabledColor: euiTheme.components.forms.backgroundDisabled,
    backgroundReadOnlyColor: euiTheme.components.forms.backgroundReadOnly,
    borderColor: highContrastMode
      ? euiTheme.border.color
      : euiTheme.components.forms.border,
    controlDisabledColor: euiTheme.components.forms.controlBackgroundDisabled,
    controlBoxShadow: '0 0 transparent',
    controlPlaceholderText: makeHighContrastColor(euiTheme.colors.textSubdued)(
      backgroundColor
    ),
    appendPrependBackground: euiTheme.components.forms.prependBackground,
  };

  const controlLayout = {
    controlLayoutGroupInputHeight: mathWithUnits(controlHeight, (x) => x - 2),
    controlLayoutGroupInputCompressedHeight: mathWithUnits(
      controlCompressedHeight,
      (x) => x - 2
    ),
    controlLayoutGroupInputCompressedBorderRadius: euiTheme.border.radius.small,
  };

  const iconSizes = {
    controlIconSize: {
      s: euiTheme.size.m,
      m: euiTheme.size.base,
      l: euiTheme.size.l,
      xl: euiTheme.size.xl,
      xxl: euiTheme.size.xxl,
    },
  };

  return {
    ...sizes,
    ...colors,
    ...iconSizes,
    ...controlLayout,
    animationTiming: `${euiTheme.animation.fast} ease-in`,
  };
};

export const euiFormControlStyles = (euiThemeContext: UseEuiTheme) => {
  const form = euiFormVariables(euiThemeContext);

  return {
    shared: `
      ${euiFormControlText(euiThemeContext)}
      ${euiFormControlDefaultShadow(euiThemeContext)}
    `,

    // Sizes
    uncompressed: `
      ${logicalCSS('height', form.controlHeight)}
      ${logicalCSS('padding-vertical', form.controlPadding)}
      ${logicalCSS(
        'padding-left',
        `calc(${form.controlPadding} + (${form.iconAffordance} * var(--euiFormControlLeftIconsCount, 0)))`
      )}
      ${logicalCSS(
        'padding-right',
        `calc(${form.controlPadding} + (${form.iconAffordance} * var(--euiFormControlRightIconsCount, 0)))`
      )}
      border-radius: ${form.controlBorderRadius};
    `,
    compressed: `
      ${logicalCSS('height', form.controlCompressedHeight)}
      ${logicalCSS('padding-vertical', form.controlCompressedPadding)}
      ${logicalCSS(
        'padding-left',
        `calc(${form.controlCompressedPadding} + (${form.iconCompressedAffordance} * var(--euiFormControlLeftIconsCount, 0)))`
      )}
      ${logicalCSS(
        'padding-right',
        `calc(${form.controlCompressedPadding} + (${form.iconCompressedAffordance} * var(--euiFormControlRightIconsCount, 0)))`
      )}
      border-radius: ${form.controlCompressedBorderRadius};
    `,

    // In group
    inGroup: `
      ${logicalCSS('height', '100%')}
      ${highContrastModeStyles(euiThemeContext, {
        none: 'box-shadow: none;',
        preferred: 'border: none;',
      })}
      border-radius: 0;
    `,

    // Widths
    formWidth: `
      ${logicalCSS('max-width', form.maxWidth)}
      ${logicalCSS('width', '100%')}
    `,
    fullWidth: `
      ${logicalCSS('max-width', '100%')}
      ${logicalCSS('width', '100%')}
    `,

    // States
    invalid: euiFormControlInvalidStyles(euiThemeContext),
    focus: euiFormControlFocusStyles(euiThemeContext),
    disabled: euiFormControlDisabledStyles(euiThemeContext),
    readOnly: euiFormControlReadOnlyStyles(euiThemeContext),
    autoFill: euiFormControlAutoFillStyles(euiThemeContext),
  };
};

export const euiFormControlText = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { fontSize } = euiFontSize(euiThemeContext, 's');
  const form = euiFormVariables(euiThemeContext);

  return `
    font-family: ${euiTheme.font.family};
    font-size: ${fontSize};
    color: ${form.textColor};

    ${euiPlaceholderPerBrowser(`
      color: ${form.controlPlaceholderText};
      opacity: 1;
    `)}
  `;
};

export const euiFormControlDefaultShadow = (
  euiThemeContext: UseEuiTheme,
  {
    withBorder = true,
    withBackground = true,
    withBackgroundColor = withBackground,
    withBackgroundAnimation = withBackground,
  }: {
    withBorder?: boolean;
    withBackground?: boolean;
    withBackgroundColor?: boolean;
    withBackgroundAnimation?: boolean;
  } = {}
) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);

  const border = highContrastModeStyles(euiThemeContext, {
    // We use inset box-shadow instead of border to skip extra height calculations
    none: `
      border: none;
      box-shadow: inset 0 0 0 ${euiTheme.border.width.thin} ${form.borderColor};
    `,
    // In high contrast mode, this doesn't matter - we need to prioritize visibility
    preferred: `
      border: ${euiTheme.border.width.thin} solid ${euiTheme.border.color};
    `,
  });

  const backgroundColor = `
    background-color: ${form.backgroundColor};
  `.trim();

  const backgroundGradient = highContrastModeStyles(euiThemeContext, {
    none: `
      background-repeat: no-repeat;
      background-size: 0% 100%;
      background-image: linear-gradient(to top,
        var(--euiFormControlStateColor),
        var(--euiFormControlStateColor) ${form.stateUnderlineHeight},
        transparent ${form.stateUnderlineHeight},
        transparent 100%
      );
    `,
    // Windows high contrast mode overrides/hides background gradients - we'll need another approach
    forced: `
      background-repeat: no-repeat;
      background-size: 0% ${form.stateUnderlineHeight};
      background-position: bottom left;
      background-origin: border-box;
    `,
  });

  const backgroundAnimation = `
    ${euiCanAnimate} {
      transition:
        background-image ${form.animationTiming},
        background-size ${form.animationTiming},
        background-color ${form.animationTiming};
    }
  `.trim();

  return `
    ${withBorder ? border : ''}
    ${withBackgroundColor ? backgroundColor : ''}
    ${withBackground ? backgroundGradient : ''}
    ${withBackgroundAnimation ? backgroundAnimation : ''}
  `;
};

export const euiFormControlFocusStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const focusColor = euiTheme.colors.primary;

  return `
    --euiFormControlStateColor: ${focusColor};
    background-color: ${euiTheme.components.forms.backgroundFocused};
    ${euiFormControlShowBackgroundUnderline(euiThemeContext, focusColor)}
    outline: none; /* Remove all outlines and rely on our own bottom border gradient */
  `;
};

export const euiFormControlInvalidStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const invalidColor = euiTheme.colors.danger;
  return `
    --euiFormControlStateColor: ${invalidColor};
    ${euiFormControlShowBackgroundUnderline(euiThemeContext, invalidColor)}
  `;
};

export const euiFormControlDisabledStyles = (euiThemeContext: UseEuiTheme) => {
  const form = euiFormVariables(euiThemeContext);

  return `
    color: ${form.textColorDisabled};
    /* Required for Safari */
    -webkit-text-fill-color: ${form.textColorDisabled};
    background-color: ${form.backgroundDisabledColor};
    cursor: not-allowed;
    --euiFormControlStateColor: transparent;

    ${euiPlaceholderPerBrowser(`
      color: ${form.textColorDisabled};
      opacity: 1;
    `)}
  `;
};

export const euiFormControlReadOnlyStyles = (euiThemeContext: UseEuiTheme) => {
  const form = euiFormVariables(euiThemeContext);

  return `
    cursor: default;
    color: ${form.textColor};
    -webkit-text-fill-color: ${form.textColor}; /* Required for Safari */

    background-color: ${form.backgroundReadOnlyColor};
    --euiFormControlStateColor: transparent;
    ${highContrastModeStyles(euiThemeContext, {
      forced: 'background-image: none;',
    })}
  `;
};

export const euiFormControlAutoFillStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  // Make the text color slightly less prominent than the default colors.text
  const textColor = euiTheme.colors.darkestShade;

  const tintedBackgroundColor = euiTheme.components.forms.backgroundAutofilled;
  // Hacky workaround to background-color, since Chrome doesn't normally allow overriding its styles
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/:autofill#sect1
  const backgroundShadow = `inset 0 0 0 100vw ${tintedBackgroundColor}`;

  // Re-create the border, since the above webkit box shadow overrides the default border box-shadow
  // + change the border color to match states, since the underline background gradient no longer works
  const borderColor = euiTheme.components.forms.borderAutofilled;
  const invalidBorder = euiTheme.colors.danger;
  const borderShadow = (color: string) =>
    `inset 0 0 0 ${euiTheme.border.width.thin} ${color}`;

  // These styles only apply/override Chrome/webkit browsers - Firefox does not set autofill styles
  return `
    &:-webkit-autofill {
      -webkit-text-fill-color: ${textColor};
      -webkit-box-shadow: ${borderShadow(borderColor)}, ${backgroundShadow};

      &:invalid {
        -webkit-box-shadow: ${borderShadow(invalidBorder)}, ${backgroundShadow};
      }
    }
  `;
};

export const euiFormControlShowBackgroundUnderline = (
  euiThemeContext: UseEuiTheme,
  color: string
) => {
  if (euiThemeContext.highContrastMode !== 'forced') {
    return 'background-size: 100% 100%;';
  }

  // Windows high contrast themes ignore all background-images that aren't url-based,
  // so to restore the linear-gradient that provides important visual information, we're
  // using a static inline SVG workaround
  const fill = encodeURIComponent(color);
  const inlineSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='${fill}' /%3E%3C/svg%3E`;

  const { stateUnderlineHeight } = euiFormVariables(euiThemeContext);
  return `
    background-size: 100% ${stateUnderlineHeight};
    background-image: url("${inlineSVG}");
  `;
};

const euiPlaceholderPerBrowser = (content: string) => `
  &::-webkit-input-placeholder { ${content} }
  &::-moz-placeholder { ${content} }
  &:-ms-input-placeholder { ${content} }
  &:-moz-placeholder { ${content} }
  &::placeholder { ${content} }
`;

/**
 * Selection custom controls - checkboxes, radios, and switches
 */

export const euiFormCustomControlVariables = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const sizes = {
    control: euiTheme.size.base,
    lineHeight: euiTheme.size.l,
    labelGap: euiTheme.size.s,
  };

  const colors = {
    unselected: euiTheme.components.forms.controlBackgroundUnselected,
    unselectedBorder: highContrastMode
      ? euiTheme.border.color
      : euiTheme.components.forms.controlBorder,
    selected: euiTheme.colors.primary,
    selectedBorder: euiTheme.components.forms.controlBorderSelected,
    selectedIcon: euiTheme.colors.emptyShade,
    disabled: euiTheme.components.forms.controlBackgroundDisabled,
    disabledBorder: euiTheme.components.forms.controlBorderDisabled,
    disabledIcon: euiTheme.components.forms.iconDisabled,
    disabledLabel: euiTheme.colors.textDisabled, // Lighter than formVars.disabledColor because it typically doesn't have as dark a background
  };

  const animation = {
    speed: euiTheme.animation.fast,
    easing: 'ease-in',
  };

  return {
    sizes,
    colors,
    animation,
  };
};

export const euiFormCustomControlStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;
  const controlVars = euiFormCustomControlVariables(euiThemeContext);

  const centerWithLabel = mathWithUnits(
    [controlVars.sizes.lineHeight, controlVars.sizes.control],
    (x, y) => (x - y) / 2
  );

  return {
    wrapper: `
      display: flex;
      align-items: flex-start;
    `,
    input: {
      fauxInput: `
        position: relative;
        ${logicalCSS('height', controlVars.sizes.control)}
        ${logicalCSS('width', controlVars.sizes.control)}
        display: flex;
        justify-content: center;
        align-items: center;
        /* For Windows high contrast themes, a border must always be rendered, not just a background */
        border: ${euiTheme.border.width.thin} solid transparent;

        &:has(input:focus-visible) {
          outline: ${euiTheme.focus.width} solid ${controlVars.colors.selected};
          outline-offset: ${euiTheme.focus.width};
        }

        ${euiCanAnimate} {
          transition-property: background-color, color;
          transition-duration: ${controlVars.animation.speed};
          transition-timing-function: ${controlVars.animation.easing};
        }
      `,
      // TODO: Revert https://github.com/elastic/eui/pull/7981
      // once https://github.com/dperini/nwsapi/issues/123
      // has been fixed, and restore `&:has(+ label)` selector
      hasLabel: `
        ${logicalCSS('margin-top', centerWithLabel)}
      `,
      enabled: {
        selected: `
          color: ${controlVars.colors.selectedIcon};
          background-color: ${controlVars.colors.selected};
          border-color: ${controlVars.colors.selected};
        `,
        unselected: `
          color: transparent;
          background-color: ${controlVars.colors.unselected};
          border-color: ${controlVars.colors.unselectedBorder};

          &:has(input:focus) {
            border-color: ${controlVars.colors.selected};
          }
        `,
      },
      disabled: {
        get shared() {
          const borderColor = highContrastMode
            ? controlVars.colors.disabledIcon
            : controlVars.colors.disabled;
          return `
            label: disabled;
            cursor: not-allowed;
            background-color: ${controlVars.colors.disabled};
            border-color: ${borderColor};
          `;
        },
        get selected() {
          return `
            ${this.shared}
            color: ${controlVars.colors.disabledIcon};
          `;
        },
        get unselected() {
          return `
            ${this.shared}
            color: ${controlVars.colors.disabled};
          `;
        },
      },

      // Looks better centered at different zoom levels than just <EuiIcon size="s" />
      icon: `
        transform: scale(0.75);
      `,

      // Hidden input sits on top of the visible element
      hiddenInput: `
        position: absolute;
        inset: 0;
        opacity: 0 !important;
        cursor: pointer;

        &:disabled {
          cursor: not-allowed;
        }
      `,
    },
    label: {
      label: `
        /* Needs to use padding and not flex gap for extra mouse click area */
        ${logicalCSS('padding-left', controlVars.sizes.labelGap)}
        line-height: ${controlVars.sizes.lineHeight};
        font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
      `,
      enabled: `
        cursor: pointer;
      `,
      disabled: `
        cursor: not-allowed;
        color: ${controlVars.colors.disabledLabel};
      `,
    },
  };
};
