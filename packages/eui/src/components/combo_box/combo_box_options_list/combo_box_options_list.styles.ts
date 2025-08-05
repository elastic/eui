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
  logicalCSS,
  mathWithUnits,
  euiScrollBarStyles,
  euiTextBreakWord,
} from '../../../global_styling';
import { euiTitle } from '../../title/title.styles';

export const LIST_MAX_HEIGHT = 200;

export const euiComboBoxOptionListStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiComboBoxOptionList: css`
      ${logicalCSS('max-height', `${LIST_MAX_HEIGHT}px`)}
      overflow: hidden;

      /* Kibana FTR affordance - without this, Selenium complains about the overlaid
        text intercepting the button click. Since 'title' is always present, and
        users can't highlight or copy combobox options anyway, we might as well
        disable clicks on text */
      .euiTextTruncate {
        pointer-events: none;
      }

      /* We're being lazy here about child selectors/specificity, because EuiComboBox
       * will be rewritten to use EuiSelectable in the future anyway */
      .euiComboBoxOption__contentWrapper {
        display: flex;
        align-items: center;
      }

      .euiComboBoxOption__content {
        flex: 1;
        text-align: start;
      }

      .euiComboBoxOption__emptyStateText {
        flex: 1;
        text-align: start;

        /* Override EuiText's <p> styling */
        ${logicalCSS('margin-bottom', 0)}
      }

      .euiComboBoxOption__enterBadge {
        ${logicalCSS('margin-left', euiTheme.size.xs)}
      }

      .euiComboBoxTitle {
        display: flex;
        ${logicalCSS('padding-horizontal', euiTheme.size.s)}
        /* Force each title to be the same height as an option, so that the virtualized scroll logic works */
        ${logicalCSS(
          'padding-top',
          mathWithUnits(euiTheme.size.s, (x) => x + 1)
        )}
        ${logicalCSS('padding-bottom', euiTheme.size.xs)}
        ${euiTitle(euiThemeContext, 'xxxs')}
      }
    `,
    /* eslint-disable local/css-logical-properties */
    hasRowHeightAuto: css`
      overflow-y: auto;

      .euiComboBoxOption__contentWrapper {
        align-items: flex-start;
      }

      ${euiScrollBarStyles(euiThemeContext)}
    `,
    /* eslint-enable local/css-logical-properties */

    euiComboBoxOptionList__virtualization: css`
      ${euiScrollBarStyles(euiThemeContext)}
    `,

    euiComboBoxOptionsList__empty: css`
      padding: ${euiTheme.size.s};
      text-align: center;
      /* Prevent really long input from overflowing the container */
      ${euiTextBreakWord()}
    `,
  };
};
