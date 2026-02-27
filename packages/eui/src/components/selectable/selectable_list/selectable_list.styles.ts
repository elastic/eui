/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
// .euiSelectableList__list requires a static vanilla className
// as it's passed down to react-window's virtualization library
import { css as classNameCss } from '@emotion/css';
import { mathWithUnits } from '@elastic/eui-theme-common';

import { UseEuiTheme } from '../../../services';
import { euiFocusRing, euiYScroll, logicalCSS } from '../../../global_styling';
import { euiTitle } from '../../title/title.styles';
import { euiSelectableListItemVariables } from './selectable_list_item.styles';

export const euiSelectableListStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const itemVars = euiSelectableListItemVariables(euiThemeContext);

  const spacingVertical = euiTheme.size.s;
  const borderColor = euiTheme.components.selectableListItemBorderColor;

  return {
    euiSelectableList: css`
      &:has(:focus-visible) {
        ${euiFocusRing(euiThemeContext, 'outset')}
      }
    `,
    fullHeight: css`
      flex-grow: 1; /* Expand height of list via flex box */
    `,
    bordered: css`
      overflow: hidden;
      border: ${euiTheme.border.thin};
      border-radius: ${euiTheme.border.radius.medium};
    `,

    euiSelectableList__list: classNameCss`
      ${euiYScroll(euiThemeContext)}

      &:focus,
      & > ul:focus {
        outline: none; /* Focus outline handled by parent .euiSelectableList */
      }
    `,

    euiSelectableList__groupLabel: css`
      ${euiTitle(euiThemeContext, 'xxxs')}
      position: relative;
      display: flex;
      align-items: center;
      ${logicalCSS('padding-vertical', spacingVertical)}
      ${logicalCSS('padding-horizontal', itemVars.spacingHorizontal)}

      &:not(:first-child) {
        ${logicalCSS(
          'margin-top',
          mathWithUnits(spacingVertical, (x) => x * 2)
        )}

        &::before {
          content: '';
          position: absolute;
          inset: 0;
          inset-block-start: -${spacingVertical};
          ${logicalCSS(
            'border-top',
            `${euiTheme.border.width.thin} solid ${borderColor}`
          )}
        }
      }
    `,
  };
};
