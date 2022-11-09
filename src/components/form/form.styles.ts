/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  UseEuiTheme,
  shade,
  tint,
  darken,
  transparentize,
  makeHighContrastColor,
} from '../../services';
import {
  mathWithUnits,
  euiCanAnimate,
  euiFontSize,
} from '../../global_styling';

export const euiFormVariables = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;
  const isColorDark = colorMode === 'DARK';
  const backgroundColor = isColorDark
    ? shade(euiTheme.colors.lightestShade, 0.4)
    : tint(euiTheme.colors.lightestShade, 0.6);

  const controlHeight = euiTheme.size.xxl;
  const controlCompressedHeight = euiTheme.size.xl;
  // the border color needs to be transparent to allow for the focus state to show
  const borderColor = transparentize(euiTheme.colors.darkestShade, 0.1);

  const sizes = {
    maxWidth: mathWithUnits(euiTheme.size.base, (x) => x * 25),
    controlHeight: controlHeight,
    controlCompressedHeight: controlCompressedHeight,
    controlPadding: euiTheme.size.m,
    controlCompressedPadding: euiTheme.size.s,
    controlBorderRadius: euiTheme.border.radius.medium,
    controlCompressedBorderRadius: euiTheme.border.radius.small,
  };

  const colors = {
    backgroundColor: backgroundColor,
    backgroundDisabledColor: darken(euiTheme.colors.lightestShade, 0.1),
    backgroundReadOnlyColor: euiTheme.colors.emptyShade,
    borderColor: borderColor,
    borderDisabledColor: borderColor,
    controlDisabledColor: euiTheme.colors.mediumShade,
    controlBoxShadow: '0 0 transparent',
    controlPlaceholderText: makeHighContrastColor(euiTheme.colors.subduedText)(
      backgroundColor
    ),
    inputGroupLabelBackground: isColorDark
      ? shade(euiTheme.colors.lightShade, 0.15)
      : tint(euiTheme.colors.lightShade, 0.5),
    inputGroupBorder: 'none',
  };

  // Colors - specific for checkboxes and radios
  const customControlColors = {
    customControlDisabledIconColor: isColorDark
      ? shade(euiTheme.colors.mediumShade, 0.38)
      : tint(euiTheme.colors.mediumShade, 0.485),
    customControlBorderColor: isColorDark
      ? shade(euiTheme.colors.lightestShade, 0.18)
      : tint(euiTheme.colors.lightestShade, 0.3),
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
    ...customControlColors,
    ...iconSizes,
    ...controlLayout,
  };
};

export const euiFormControlSize = (
  euiThemeContext: UseEuiTheme,
  options: {
    height?: string;
    fullWidth?: boolean;
    compressed?: boolean;
    inGroup?: boolean;
  } = {}
) => {
  const form = euiFormVariables(euiThemeContext);

  const width = '100%';

  let maxWidth = form.maxWidth;
  if (options.fullWidth) maxWidth = '100%';

  let height = options.height || form.controlHeight;
  if (options.compressed) height = form.controlCompressedHeight;
  if (options.inGroup) height = '100%';

  return `
    max-inline-size: ${maxWidth};
    inline-size: ${width};
    block-size: ${height};
  `;
};

export const euiCustomControl = (
  euiThemeContext: UseEuiTheme,
  options: {
    type?: 'round' | 'square';
    size?: string;
  } = {}
) => {
  const euiTheme = euiThemeContext.euiTheme;
  const form = euiFormVariables(euiThemeContext);
  const { type, size = euiTheme.size.base } = options;

  let padddingStyle = '';
  let borderRadiusStyle = '';

  if (size) {
    const borderSize = parseFloat(String(euiTheme.border.width.thin));
    const paddingSize = mathWithUnits(size, (x) => (x - borderSize * 2) / 2);
    padddingStyle = `padding: ${paddingSize};`;
  }

  if (type === 'round') {
    borderRadiusStyle = `border-radius: ${size};`;
  } else if (type === 'square') {
    borderRadiusStyle = `border-radius: ${form.controlCompressedBorderRadius};`;
  }

  return `
    ${padddingStyle}
    ${borderRadiusStyle}
    border: ${euiTheme.border.width.thin} solid ${form.customControlBorderColor};
    background: ${euiTheme.colors.emptyShade} no-repeat center;

    ${euiCanAnimate} {
      transition: background-color ${euiTheme.animation.fast} ease-in,
              border-color ${euiTheme.animation.fast} ease-in;
    }
  `;
};

// 1. Must supply both values to background-size or some browsers apply the single value to both directions
export const euiFormControlDefaultShadow = (
  euiThemeContext: UseEuiTheme,
  options: {
    borderOnly?: boolean;
  } = {}
) => {
  const form = euiFormVariables(euiThemeContext);
  const { euiTheme } = euiThemeContext;
  const { borderOnly = false } = options;

  const borderOnlyStyles = borderOnly
    ? `box-shadow: inset 0 0 0 1px ${form.borderColor};`
    : `box-shadow: ${form.controlBoxShadow}, inset 0 0 0 1px ${form.borderColor};`;

  return `
    ${borderOnlyStyles}
    background-color: ${form.backgroundColor};
    background-repeat: no-repeat;
    background-size: 0% 100%; // 1
    transition:
      box-shadow ${euiTheme.animation.fast} ease-in,
      background-image ${euiTheme.animation.fast} ease-in,
      background-size ${euiTheme.animation.fast} ease-in,
      background-color ${euiTheme.animation.fast} ease-in;

    // Fixes bug in Firefox where adding a transition to the background-color
    // caused a flash of differently styled dropdown.
    @supports (-moz-appearance: none) {
      // List *must* be in the same order as the above.
      transition-property: box-shadow, background-image, background-size;
    }
  `;
};

export const euiPlaceholderPerBrowser = (content: string) => {
  return `
    &::-webkit-input-placeholder { ${content}; opacity: 1; }
    &::-moz-placeholder  { ${content}; opacity: 1; }
    &::-ms-input-placeholder {${content}; opacity: 1; }
    &::placeholder {${content}; opacity: 1; }
  `;
};

const euiFormControlDisabledTextStyle = (euiThemeContext: UseEuiTheme) => {
  const form = euiFormVariables(euiThemeContext);

  return `
  color: ${form.controlDisabledColor};
  -webkit-text-fill-color: ${form.controlDisabledColor}; // Required for Safari
  `;
};

const euiFormControlDisabledStyle = (euiThemeContext: UseEuiTheme) => {
  const form = euiFormVariables(euiThemeContext);

  return `
    ${euiFormControlDisabledTextStyle(euiThemeContext)}
    cursor: not-allowed;
    background: ${form.backgroundDisabledColor};
    box-shadow: inset 0 0 0 1px ${form.borderDisabledColor};
    ${euiPlaceholderPerBrowser(`color: ${form.controlDisabledColor};`)}
  `;
};

export const euiFormControlText = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);

  return `
    font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
    line-height: ${euiFontSize(euiThemeContext, 's').lineHeight};
    color: ${euiTheme.colors.text};

    ${euiPlaceholderPerBrowser(`
      cursor: not-allowed;
      color: ${form.controlPlaceholderText};
    `)}
  `;
};

export const euiFormControlGradientStyle = (
  euiThemeContext: UseEuiTheme,
  options: {
    color?: string;
  } = {}
) => {
  const { euiTheme } = euiThemeContext;
  const { color = euiTheme.colors.primary } = options;
  return `
    background-image: linear-gradient(to top,
      ${color},
      ${color} 2px,
      transparent 2px,
      transparent 100%
    );
  `;
};

export const euiFormControlInvalidStyle = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return `
     ${euiFormControlGradientStyle(euiThemeContext, {
       color: euiTheme.colors.danger,
     })}
    background-size: 100%;
  `;
};

export const euiFormControlFocusStyle = (
  euiThemeContext: UseEuiTheme,
  options: {
    borderOnly?: boolean;
  } = {}
) => {
  const { euiTheme, colorMode } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);
  const isColorDark = colorMode === 'DARK';
  const { borderOnly = false } = options;

  const borderOnlyStyles = borderOnly
    ? `box-shadow: inset 0 0 0 1px ${form.borderColor};`
    : `box-shadow:
    inset 0 0 0 1px ${form.borderColor};`;

  const backgroundColor = isColorDark
    ? shade(euiTheme.colors.emptyShade, 0.4)
    : tint(euiTheme.colors.emptyShade, 0);

  return `
    ${borderOnlyStyles}
    background-color: ${backgroundColor};
    ${euiFormControlGradientStyle(euiThemeContext)}
    background-size: 100% 100%; // 1
    outline: none; // Blanket remove all outlines relying on our own bottom border
  `;
};

const euiFormControlReadOnlyStyle = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);

  return `
    cursor: default;
    color: ${euiTheme.colors.text};
    -webkit-text-fill-color: ${euiTheme.colors.text}; // Required for Safari
    // Use transparency since there is no border and in case form is on a non-white background
    background: ${form.backgroundReadOnlyColor};
    border-color: transparent;
    box-shadow: inset 0 0 0 1px ${form.borderDisabledColor};
  `;
};

export const euiFormControlStyleCompressed = (
  euiThemeContext: UseEuiTheme,
  options: {
    borderOnly?: boolean;
    includeStates?: boolean;
  } = {}
) => {
  const form = euiFormVariables(euiThemeContext);
  const { borderOnly = false, includeStates = true } = options;

  const includeStatesStyles =
    includeStates &&
    `
      &:invalid { // 2
        ${euiFormControlInvalidStyle(euiThemeContext)};
      }

      &:focus { // 2
        ${euiFormControlFocusStyle(euiThemeContext)};
      }

      &:disabled {
        ${euiFormControlDisabledStyle(euiThemeContext)};
      }

      &[readOnly] {
        ${euiFormControlReadOnlyStyle(euiThemeContext)};
      }
    `;

  return `
    ${euiFormControlDefaultShadow(euiThemeContext, {
      borderOnly,
    })},
    ${includeStatesStyles}
    padding: ${form.controlCompressedPadding};
    border-radius: ${form.controlCompressedBorderRadius};
  `;
};

export const euiFormControlStyle = (
  euiThemeContext: UseEuiTheme,
  options: {
    borderOnly?: boolean;
    includeStates?: boolean;
    includeSizes?: boolean;
    fullWidth?: boolean;
    compressed?: boolean;
    inGroup?: boolean;
  } = {}
) => {
  const form = euiFormVariables(euiThemeContext);
  const { euiTheme, colorMode } = euiThemeContext;
  const isColorDark = colorMode === 'DARK';
  const {
    borderOnly = false,
    includeStates = true,
    includeSizes = true,
    fullWidth = false,
    compressed,
    inGroup,
  } = options;

  const includeStatesStyles =
    includeStates &&
    `
      &:invalid { // 2
        ${euiFormControlInvalidStyle(euiThemeContext)};
      }

      &:focus { // 2
        ${euiFormControlFocusStyle(euiThemeContext)};
      }

      &:disabled {
        ${euiFormControlDisabledStyle(euiThemeContext)};
      }

      &[readOnly] {
        ${euiFormControlReadOnlyStyle(euiThemeContext)};
      }

      // Needs to be set for autofill
      &:-webkit-autofill {
        -webkit-text-fill-color:
        ${isColorDark ? euiTheme.colors.darkShade : euiTheme.colors.lightShade};
      
        ~ .euiFormControlLayoutIcons {
          color:  ${
            isColorDark ? euiTheme.colors.darkShade : euiTheme.colors.lightShade
          };
        }
      }
    `;

  const includeSizesStyles =
    includeSizes &&
    `
    ${
      compressed
        ? euiFormControlStyleCompressed(euiThemeContext, {
            borderOnly,
            includeStates,
          })
        : ''
    }

    ${
      inGroup
        ? `
        box-shadow: none !important;
        border-radius: 0;
      `
        : ''
    }
    `;

  return `
    ${includeStatesStyles}
    ${includeSizesStyles}
    ${euiFormControlSize(euiThemeContext, { fullWidth, compressed, inGroup })}
    ${euiFormControlDefaultShadow(euiThemeContext)}
    ${euiFormControlText(euiThemeContext)}
    border: none;
    border-radius: ${form.controlBorderRadius};
    padding: ${form.controlPadding};
  `;
};
