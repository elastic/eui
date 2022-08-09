/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme, shade, tint } from '../../services';

export const euiFormVariables = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    maxWidth: `${euiTheme.base * 25}px`,
    controlHeight: euiTheme.size.xxl,
    controlCompressedHeight: euiTheme.size.xl,
    controlPadding: euiTheme.size.m,
    controlCompressedPadding: euiTheme.size.s,
    controlBorderRadius: euiTheme.border.radius.medium,
    controlCompressedBorderRadius: euiTheme.border.radius.small,
    checkboxBorderRadius: euiTheme.border.radius.small,
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
        max-width: 100%;
      `;
      break;
    case 'compressed':
      alternateStyles = `
        height: ${form.controlCompressedHeight};
      `;
      break;
    case 'inGroup':
      alternateStyles = `
        height: 100%;
      `;
      break;
  }

  return `
    max-width: ${form.maxWidth};
    width: 100%;
    height: ${form.controlHeight || height};

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
    padddingStyle = `padding: calc((${size} - 2px)) / 2);`; // subtract 2px from size to account for border size
  }

  if (type === 'round') {
    borderRadiusStyle = `border-radius: ${size || euiTheme.size.base};`;
  } else if (type === 'square') {
    borderRadiusStyle = `border-radius: ${form.checkboxBorderRadius};`;
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
