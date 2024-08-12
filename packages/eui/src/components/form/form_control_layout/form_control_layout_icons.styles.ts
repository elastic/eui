/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { mathWithUnits } from '../../../global_styling';
import { euiFormVariables } from '../form.styles';

export const euiFormControlLayoutIconsStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { controlPadding, controlCompressedPadding } =
    euiFormVariables(euiThemeContext);

  return {
    euiFormControlLayoutIcons: css`
      pointer-events: none;
      display: flex;
      align-items: center;
    `,
    uncompressed: `
      gap: ${mathWithUnits(controlPadding, (x) => x / 2)};
    `,
    compressed: css`
      gap: ${mathWithUnits(controlCompressedPadding, (x) => x / 2)};
    `,
  };
};
