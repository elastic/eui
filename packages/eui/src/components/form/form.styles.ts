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
  logicalCSS,
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
    textColor: euiTheme.colors.text,
    backgroundColor: backgroundColor,
    backgroundDisabledColor: darken(euiTheme.colors.lightestShade, 0.05),
    backgroundReadOnlyColor: euiTheme.colors.emptyShade,
    borderColor: transparentize(
      colorMode === 'DARK'
        ? euiTheme.colors.ghost
        : darken(euiTheme.border.color, 4),
      0.1
    ),
    controlDisabledColor: euiTheme.colors.mediumShade,
    controlBoxShadow: '0 0 transparent',
    controlPlaceholderText: makeHighContrastColor(euiTheme.colors.subduedText)(
      backgroundColor
    ),
    controlAutoFillColor:
      colorMode === 'LIGHT'
        ? euiTheme.colors.darkestShade
        : euiTheme.colors.lightShade,
    inputGroupLabelBackground: isColorDark
      ? shade(euiTheme.colors.lightShade, 0.15)
      : tint(euiTheme.colors.lightShade, 0.5),
    inputGroupBorder: 'none',
  };

  // Colors - specific to checkboxes, radios, switches, and range thumbs
  const customControlColors = {
    customControlDisabledIconColor: isColorDark
      ? shade(euiTheme.colors.mediumShade, 0.38)
      : tint(euiTheme.colors.mediumShade, 0.485),
    customControlBorderColor: isColorDark
      ? shade(euiTheme.colors.lightestShade, 0.4)
      : tint(euiTheme.colors.lightestShade, 0.31),
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
      padding: ${form.controlPadding};
      border-radius: ${form.controlBorderRadius};
    `,
    compressed: `
      ${logicalCSS('height', form.controlCompressedHeight)}
      padding: ${form.controlCompressedPadding};
      border-radius: ${form.controlCompressedBorderRadius};
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
    autoFill: `
      &:-webkit-autofill {
        -webkit-text-fill-color: ${form.controlAutoFillColor};

        ~ .euiFormControlLayoutIcons {
          color: ${form.controlAutoFillColor};
        }
      }`,
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
      transition: background-color ${form.animationTiming},
        border-color ${form.animationTiming};
    }
  `;
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

export const euiFormControlDefaultShadow = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);

  return `
    /* We use inset box-shadow instead of border to skip extra hight calculations */
    border: none;
    box-shadow: inset 0 0 0 ${euiTheme.border.width.thin} ${form.borderColor};
    background-color: ${form.backgroundColor};

    background-repeat: no-repeat;
    background-size: 0% 100%;
    background-image: linear-gradient(to top,
      var(--euiFormStateColor),
      var(--euiFormStateColor) ${euiTheme.border.width.thick},
      transparent ${euiTheme.border.width.thick},
      transparent 100%
    );

    ${euiCanAnimate} {
      transition:
        box-shadow ${form.animationTiming},
        background-image ${form.animationTiming},
        background-size ${form.animationTiming},
        background-color ${form.animationTiming};
    }
  `;
};

export const euiFormControlFocusStyles = ({
  euiTheme,
  colorMode,
}: UseEuiTheme) => `
  --euiFormStateColor: ${euiTheme.colors.primary};
  background-color: ${
    colorMode === 'DARK'
      ? shade(euiTheme.colors.emptyShade, 0.4)
      : euiTheme.colors.emptyShade
  };
  background-size: 100% 100%;
  outline: none; /* Remove all outlines and rely on our own bottom border gradient */
`;

export const euiFormControlInvalidStyles = ({ euiTheme }: UseEuiTheme) => `
  --euiFormStateColor: ${euiTheme.colors.danger} !important;
  background-size: 100% 100%;
`;

export const euiFormControlDisabledStyles = (euiThemeContext: UseEuiTheme) => {
  const form = euiFormVariables(euiThemeContext);

  return `
    color: ${form.controlDisabledColor};
    /* Required for Safari */
    -webkit-text-fill-color: ${form.controlDisabledColor};
    background-color: ${form.backgroundDisabledColor};
    cursor: not-allowed;

    ${euiPlaceholderPerBrowser(`
      color: ${form.controlDisabledColor};
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
    --euiFormStateColor: transparent;
  `;
};

const euiPlaceholderPerBrowser = (content: string) => `
  &::-webkit-input-placeholder { ${content} }
  &::-moz-placeholder { ${content} }
  &:-ms-input-placeholder { ${content} }
  &:-moz-placeholder { ${content} }
  &::placeholder { ${content} }
`;
