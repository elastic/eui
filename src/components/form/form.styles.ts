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
import { mathWithUnits } from '../../global_styling';

export const euiFormVariables = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;
  const isColorDark = colorMode === 'DARK';
  const backgroundColor = isColorDark
    ? shade(euiTheme.colors.lightestShade, 0.4)
    : tint(euiTheme.colors.lightestShade, 0.6);

  const controlHeight = euiTheme.size.xxl;
  const controlCompressedHeight = euiTheme.size.xl;

  return {
    // Sizing
    maxWidth: `${euiTheme.base * 25}px`,
    controlHeight: controlHeight,
    controlCompressedHeight: controlCompressedHeight,
    controlPadding: euiTheme.size.m,
    controlCompressedPadding: euiTheme.size.s,
    controlBorderRadius: euiTheme.border.radius.medium,
    controlCompressedBorderRadius: euiTheme.border.radius.small,

    // Coloring
    backgroundColor: backgroundColor,
    backgroundDisabledColor: darken(euiTheme.colors.lightestShade, 0.1),
    backgroundReadOnlyColor: euiTheme.colors.emptyShade,
    borderColor: transparentize(euiTheme.border.color, 0.9),
    borderDisabledColor: transparentize(euiTheme.border.color, 0.9),
    controlDisabledColor: euiTheme.colors.mediumShade,
    controlBoxShadow: '0 0 transparent',
    controlPlaceholderText: makeHighContrastColor(euiTheme.colors.subduedText)(
      backgroundColor
    ),
    inputGroupLabelBackground: isColorDark
      ? shade(euiTheme.colors.lightShade, 0.15)
      : tint(euiTheme.colors.lightShade, 0.5),
    inputGroupBorder: 'none',

    // Coloring - specific for checkboxes and radios
    customControlDisabledIconColor: isColorDark
      ? shade(euiTheme.colors.mediumShade, 0.38)
      : tint(euiTheme.colors.mediumShade, 0.48),
    customControlBorderColor: isColorDark
      ? shade(euiTheme.colors.lightestShade, 0.18)
      : tint(euiTheme.colors.lightestShade, 0.38),

    // Icon sizes
    controlIconSize: {
      s: euiTheme.size.m,
      m: euiTheme.size.base,
      l: euiTheme.size.l,
      xl: euiTheme.size.xl,
      xxl: euiTheme.size.xxl,
    },

    // Control layout
    controlLayoutGroupInputHeight: mathWithUnits(controlHeight, (x) => x - 2),
    controlLayoutGroupInputCompressedHeight: mathWithUnits(
      controlCompressedHeight,
      (x) => x - 2
    ),
    controlLayoutGroupInputCompressedBorderRadius: euiTheme.border.radius.small,
  };
};

export const euiFormCustomControlBorderColor = ({
  euiTheme,
  colorMode,
}: UseEuiTheme) => `
  ${
    colorMode === 'DARK'
      ? shade(euiTheme.colors.lightestShade, 0.82)
      : tint(euiTheme.colors.lightestShade, 0.7)
  }
`;

export const euiFormControlSize = ({
  euiThemeContext,
  height,
  includeAlternates,
}: {
  euiThemeContext: UseEuiTheme;
  height?: string;
  includeAlternates?: 'fullWidth' | 'compressed' | 'inGroup';
}) => {
  let alternateStyles = '';

  const form = euiFormVariables(euiThemeContext);

  switch (includeAlternates) {
    case 'fullWidth':
      alternateStyles = `
        max-inline-size: 100%;
      `;
      break;
    case 'compressed':
      alternateStyles = `
        block-size: ${form.controlCompressedHeight};
      `;
      break;
    case 'inGroup':
      alternateStyles = `
        block-size: 100%;
      `;
      break;
  }

  return `
    max-inline-size: ${form.maxWidth};
    inline-size: 100%;
    block-size: ${form.controlHeight || height};

    ${alternateStyles}
  `;
};

export const euiCustomControl = ({
  euiThemeContext,
  type,
  size,
}: {
  euiThemeContext: UseEuiTheme;
  type?: 'round' | 'square';
  size?: string;
}) => {
  const euiTheme = euiThemeContext.euiTheme;
  const form = euiFormVariables(euiThemeContext);

  let padddingStyle;
  let borderRadiusStyle;

  if (size) {
    padddingStyle = `padding: ${mathWithUnits(size, (x) => (x - 2) / 2)};`; // subtract 2px from size to account for border size
  }

  if (type === 'round') {
    borderRadiusStyle = `border-radius: ${size || euiTheme.size.base};`;
  } else if (type === 'square') {
    borderRadiusStyle = `border-radius: ${form.controlCompressedBorderRadius};`;
  }

  return `
    ${padddingStyle}; 
    ${borderRadiusStyle};
    border: 1px solid ${euiFormCustomControlBorderColor(euiThemeContext)};
    background: ${euiTheme.colors.emptyShade} no-repeat center;
    transition: background-color ${euiTheme.animation.fast} ease-in,
              border-color ${euiTheme.animation.fast} ease-in;
  `;
};
