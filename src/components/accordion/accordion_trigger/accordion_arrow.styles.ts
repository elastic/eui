/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS } from '../../../global_styling';

export const euiAccordionArrowStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiAccordion__arrow: css`
    flex-shrink: 0;
  `,
  left: css`
    ${logicalCSS('margin-right', euiTheme.size.xs)}
  `,
  right: css`
    ${logicalCSS('margin-left', euiTheme.size.xs)}
  `,
  // !important overrides EuiButtonIcon's default transforms
  isClosed: css`
    /* stylelint-disable-next-line declaration-no-important */
    transform: rotate(0deg) !important;
  `,
  isOpen: css`
    /* stylelint-disable-next-line declaration-no-important */
    transform: rotate(90deg) !important;
  `,
});
