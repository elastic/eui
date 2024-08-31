/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS, mathWithUnits } from '../../../global_styling';

export const euiComboBoxPillStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  // Ensure the input doesn't drop to the next line when the EuiBadge has a very long text
  const pillMaxWidth = `calc(100% - ${euiTheme.size.xxs} - ${euiTheme.size.base})`;
  const pillHeight = mathWithUnits(euiTheme.size.l, (x) => x - 2);
  const pillLineHeight = mathWithUnits(pillHeight, (x) => x - 2);

  return {
    euiComboBoxPill: css`
      ${logicalCSS('max-width', pillMaxWidth)}
      ${logicalCSS('height', pillHeight)}
      line-height: ${pillLineHeight};
      vertical-align: baseline;

      /* Pills are 2px shorter than the input (see pillHeight), so
       * add a vertical margin offset to center them with the input */
      ${logicalCSS('margin-vertical', '1px')}

      /* Pill margins are already handled by flex gap - unset EuiBadge's */
      & + .euiBadge {
        ${logicalCSS('margin-left', 0)}
      }

      /* Fix append/prepend vertical alignment */
      .euiBadge__text {
        display: flex;
        align-items: center;

        .euiIcon {
          display: block;
        }
      }
    `,
  };
};
