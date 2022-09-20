/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  logicalCSS,
  logicalTextAlignCSS,
  mathWithUnits,
  euiFontSize,
} from '../../global_styling';
import { euiButtonEmptyColor } from '../../themes/amsterdam/global_styling/mixins';
import { UseEuiTheme } from '../../services';

export const euiPaginationButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const fontSizeS = euiFontSize(euiThemeContext, 's');
  const halfSizeM = mathWithUnits(euiTheme.size.m, (x) => x / 2);
  const disabled = euiButtonEmptyColor(euiThemeContext, 'disabled');

  // && to increase specificity. Can likely be removed once EuiButtonEmpty has been converted.

  return {
    // Base
    euiPaginationButton: css`
      && {
        ${fontSizeS};
        padding: 0;
        ${logicalTextAlignCSS('center')}
        border-radius: ${euiTheme.border.radius.medium};
        outline-offset: -${euiTheme.focus.width};
      }
    `,
    // States
    isActive: css`
      && {
        font-weight: ${euiTheme.font.weight.bold};
        color: ${euiTheme.colors.primary};

        .euiButtonEmpty__content {
          cursor: default;
        }

        &&,
        &&:hover {
          text-decoration: underline;
        }
      }
    `,
    isPlaceholder: css`
      && {
        align-items: baseline;
        color: ${disabled.color};
        ${fontSizeS};
        ${logicalCSS('padding-top', halfSizeM)};
        ${logicalCSS('padding-bottom', 0)};
        ${logicalCSS('padding-horizontal', euiTheme.size.s)};
        ${logicalCSS('height', euiTheme.size.l)};
      }
    `,
  };
};

export const euiPaginationButtonArrowStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiPaginationArrowButton: css`
    outline-offset: -${euiTheme.focus.width};
  `,
});
