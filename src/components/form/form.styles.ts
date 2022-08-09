/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme, shade, tint } from '../../services';

export const euiFormMaxWidth = ({ euiTheme }: UseEuiTheme) =>
  `${euiTheme.base * 25}px`;

export const euiFormControlHeight = ({ euiTheme }: UseEuiTheme) =>
  euiTheme.size.xxl;

export const euiFormControlCompressedHeight = ({ euiTheme }: UseEuiTheme) =>
  `${euiTheme.size.xl}`;

export const euiFormControlPadding = ({ euiTheme }: UseEuiTheme) =>
  `${euiTheme.size.m}`;

export const euiFormControlCompressedPadding = ({ euiTheme }: UseEuiTheme) =>
  `${euiTheme.size.s}`;

export const euiFormControlBorderRadius = ({ euiTheme }: UseEuiTheme) =>
  `${euiTheme.border.radius.medium}`;

export const euiFormControlCompressedBorderRadius = ({
  euiTheme,
}: UseEuiTheme) => `${euiTheme.border.radius.small}`;

export const euiCheckboxBorderRadius = ({ euiTheme }: UseEuiTheme) =>
  `${euiTheme.border.radius.small}`;

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
  euiTheme,
  height,
  includeAlternates,
}: {
  euiTheme: UseEuiTheme;
  height?: string;
  includeAlternates?: 'fullWidth' | 'compressed' | 'inGroup';
}) => {
  let alternateStyles = '';

  switch (includeAlternates) {
    case 'fullWidth':
      alternateStyles = `
        max-width: 100%;
      `;
      break;
    case 'compressed':
      alternateStyles = `
        height: ${euiFormControlCompressedHeight(euiTheme)};
      `;
      break;
    case 'inGroup':
      alternateStyles = `
        height: 100%;
      `;
      break;
  }

  return `
    max-width: ${euiFormMaxWidth(euiTheme)};
    width: 100%;
    height: ${euiFormControlHeight(euiTheme) || height};

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

  let padddingStyle;
  let borderRadiusStyle;

  if (size) {
    padddingStyle = `padding: calc((${size} - 2px)) / 2);`; // subtract 2px from size to account for border size
  }

  if (type === 'round') {
    borderRadiusStyle = `border-radius: ${size || euiTheme.size.base};`;
  } else if (type === 'square') {
    borderRadiusStyle = `border-radius: ${euiCheckboxBorderRadius(
      euiThemeContext
    )};`;
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
