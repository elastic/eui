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

export const euiKeyPadMenuStyles = ({ euiTheme }: UseEuiTheme) => {
  const euiKeyPadMenuSize = mathWithUnits(euiTheme.size.base, (x) => x * 6);

  return {
    euiKeyPadMenu: css`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      ${logicalCSS(
        'width',
        mathWithUnits(
          [euiKeyPadMenuSize, euiTheme.size.xs],
          (x, y) => x * 3 + y * 3
        )
      )}
      ${logicalCSS('max-width', '100%')}

      // Using negative margins on the whole menu negates the ones on the (last) items no matter how many exist per row
      ${logicalCSS(
        'margin-bottom',
        mathWithUnits(euiTheme.size.xs, (x) => x * -1)
      )}
      ${logicalCSS(
        'margin-right',
        mathWithUnits(euiTheme.size.xs, (x) => x * -1)
      )}
    `,

    // Checkable = Fieldset and Legend
    'euiKeyPadMenu--checkable': css`
      ${logicalCSS('margin-bottom', euiTheme.size.s)}
    `,

    // Not Checkable = List
    'euiKeyPadMenu--list': css`
      ${logicalCSS('margin-bottom', euiTheme.size.xs)}
      ${logicalCSS('margin-right', euiTheme.size.xs)}
    `,
  };
};
