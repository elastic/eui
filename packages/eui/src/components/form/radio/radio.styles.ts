/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { euiFormCustomControlStyles } from '../form.styles';

export const euiRadioStyles = (euiThemeContext: UseEuiTheme) => {
  const controlStyles = euiFormCustomControlStyles(euiThemeContext);

  return {
    euiRadio: css(controlStyles.wrapper),

    input: {
      euiRadio__circle: css`
        ${controlStyles.input.fauxInput}
        border-radius: 50%;
      `,
      hasLabel: controlStyles.input.hasLabel, // Skip css`` className generation
      enabled: {
        selected: css(controlStyles.input.enabled.selected),
        unselected: css(controlStyles.input.enabled.unselected),
      },
      disabled: {
        selected: css(controlStyles.input.disabled.selected),
        unselected: css(controlStyles.input.disabled.unselected),
      },
      euiRadio__icon: css(controlStyles.input.icon),
      euiRadio__input: css(controlStyles.input.hiddenInput),
    },

    label: {
      euiRadio__label: css(controlStyles.label.label),
      enabled: controlStyles.label.enabled,
      disabled: css(controlStyles.label.disabled),
    },
  };
};
