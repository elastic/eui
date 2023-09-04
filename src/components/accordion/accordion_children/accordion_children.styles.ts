/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicals, logicalCSS } from '../../../global_styling';

export const euiAccordionChildrenStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiAccordion__children: css``,
  isLoading: css`
    align-items: center;
    display: flex;
  `,
  xs: css`
    padding: ${euiTheme.size.xs};
  `,
  s: css`
    padding: ${euiTheme.size.s};
  `,
  m: css`
    padding: ${euiTheme.size.base};
  `,
  l: css`
    padding: ${euiTheme.size.l};
  `,
  xl: css`
    padding: ${euiTheme.size.xl};
  `,
});

export const euiAccordionChildWrapperStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiAccordion__childWrapper: css`
    ${logicalCSS('height', 0)}
    opacity: 0;
    overflow: hidden;
    transition: ${logicals.height} ${euiTheme.animation.normal}
        ${euiTheme.animation.resistance},
      opacity ${euiTheme.animation.normal} ${euiTheme.animation.resistance};

    &:focus {
      outline: none; /* Hide focus ring because of tabindex=-1 on Safari */
    }
  `,
  isOpen: css`
    ${logicalCSS('height', 'auto')}
    opacity: 1;
  `,
});
