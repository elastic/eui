/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { logicalCSS, euiBreakpoint } from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

import { euiTitle } from '../../title/title.styles';
import { euiHeaderVariables } from '../header.styles';

export const euiHeaderLogoStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { childHeight } = euiHeaderVariables(euiThemeContext);

  return {
    euiHeaderLogo: css`
      position: relative;
      ${logicalCSS('height', childHeight)}
      line-height: ${childHeight};
      ${logicalCSS('min-width', childHeight)}
      padding-inline: ${euiTheme.size.s};
      display: inline-flex;
      border-radius: ${euiTheme.border.radius.small};
      align-items: center;
      white-space: nowrap;

      ${euiBreakpoint(euiThemeContext, ['xs'])} {
        ${logicalCSS('padding-left', euiTheme.size.xs)}
      }
    `,
    euiHeaderLogo__text: css`
      ${euiTitle(euiThemeContext, 'xxs')}
      ${logicalCSS('padding-left', euiTheme.size.base)}

      ${euiBreakpoint(euiThemeContext, ['xs'])} {
        ${logicalCSS('padding-left', euiTheme.size.s)}
      }
    `,
  };
};
