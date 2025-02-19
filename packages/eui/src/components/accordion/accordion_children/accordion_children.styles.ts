/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import {
  logicals,
  logicalCSS,
  euiCanAnimate,
  euiFocusRing,
} from '../../../global_styling';

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

export const euiAccordionChildWrapperStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiAccordion__childWrapper: css`
      overflow: hidden;

      ${euiCanAnimate} {
        transition: ${logicals.height} ${euiTheme.animation.normal}
            ${euiTheme.animation.resistance},
          opacity ${euiTheme.animation.normal} ${euiTheme.animation.resistance};
      }

      /* NOTE: Safari is slightly flaky about showing the focus-visible outline
         on click when it should only show on keyboard enter. However, the minor
         visual impact of this is not worth the accessibility loss to keyboard
         users on Chrome & FF */
      ${euiFocusRing(euiThemeContext)}
    `,
    // choosing to override transition instead of applying it conditionally
    // to keep a more logical style appliance:
    // default case = has transition as part of default styles (all cases expect initial isOpen=true when initialIsOpen=true)
    // special case: no transition for initial isOpen=true when initialIsOpen=true
    noTransition: css`
      ${euiCanAnimate} {
        transition: none;
      }
    `,
    isClosed: css`
      ${logicalCSS('height', 0)}
      opacity: 0;
    `,
    isOpen: css`
      ${logicalCSS('height', 'auto')}
      opacity: 1;
    `,
  };
};
