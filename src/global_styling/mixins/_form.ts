/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import { UseEuiTheme } from '../../services';
import {
  euiFormControlHeight,
  euiFormControlCompressedHeight,
  euiFormMaxWidth,
} from '../../components/form/form.styles';

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
