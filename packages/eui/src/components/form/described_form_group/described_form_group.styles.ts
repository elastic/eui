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

import { euiFormMaxWidth } from '../form.styles';

export const euiDescribedFormGroupStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const formMaxWidth = euiFormMaxWidth(euiThemeContext);

  return {
    euiDescribedFormGroup: css`
      & + * {
        ${logicalCSS('margin-top', euiTheme.size.l)}
      }
    `,
    // Skip css`` to avoid generating an Emotion className
    formWidth: `
      ${logicalCSS(
        'max-width',
        mathWithUnits(formMaxWidth, (x) => x * 2)
      )}
    `,
    fullWidth: css`
      ${logicalCSS('max-width', '100%')}
    `,

    euiDescribedFormGroup__descriptionColumn: css`
      ${logicalCSS('min-width', 'min(20rem, 50%)')}
    `,
    euiDescribedFormGroup__description: css`
      ${logicalCSS('padding-top', euiTheme.size.s)}
    `,

    euiDescribedFormGroup__fields: css`
      /* Needed to support flex shrinking appropriately with viewport (prevents x-axis content overflow) */
      ${logicalCSS('min-width', 0)}

      /* Implicit titles */
      & > .euiFormRow:first-child:not(.euiFormRow--hasLabel) {
        /* This fakes out flex into thinking there's text before the input and therefor aligns properly to the baseline */
        &::before {
          content: '';
        }
      }

      /* Remove the forced margin */
      & > .euiFormRow--hasEmptyLabelSpace:first-child {
        ${logicalCSS('margin-top', 0)}
      }
    `,
  };
};
