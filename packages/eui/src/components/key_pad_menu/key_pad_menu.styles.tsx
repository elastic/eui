/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS, mathWithUnits } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiKeyPadMenuVariables = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiKeyPadMenuSize: mathWithUnits(euiTheme.size.base, (x) => x * 6),
    euiKeyPadMenuMarginSize: euiTheme.size.xs,
  };
};

export const euiKeyPadMenuStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { euiKeyPadMenuSize, euiKeyPadMenuMarginSize } =
    euiKeyPadMenuVariables(euiThemeContext);

  return {
    euiKeyPadMenu: css`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      ${logicalCSS(
        'width',
        mathWithUnits(
          [euiKeyPadMenuSize, euiKeyPadMenuMarginSize],
          (x, y) => x * 3 + y * 3
        )
      )}
      ${logicalCSS('max-width', '100%')}
      gap: ${euiKeyPadMenuMarginSize};
    `,

    // Checkable = Fieldset and Legend
    euiKeyPadMenu__legend: css`
      ${logicalCSS('margin-bottom', euiTheme.size.s)}
    `,
  };
};
