/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiCanAnimate, logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiListGroupItemExtraActionStyles = ({
  euiTheme,
}: UseEuiTheme) => {
  return {
    euiListGroupItemExtraAction: css`
      flex-shrink: 0;
      opacity: 0;
      ${logicalCSS('margin-right', euiTheme.size.s)};

      ${euiCanAnimate} {
        transition: opacity ${euiTheme.animation.fast};
      }
    `,
    hoverStyles: css`
      .euiListGroupItem:hover &,
      .euiListGroupItem__button:focus + &,
      &:focus {
        opacity: 1;
      }
    `,
    alwaysShow: css`
      opacity: 1;
    `,
  };
};
