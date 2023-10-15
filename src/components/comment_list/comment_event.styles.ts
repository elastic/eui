/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, tintOrShade } from '../../services';
import { logicalCSS } from '../../global_styling';
import { EuiCommentEventProps } from './comment_event';

const _generateEventBorderColor = (
  { euiTheme, colorMode }: UseEuiTheme,
  color: EuiCommentEventProps['eventColor']
) => {
  //const ratio = colorMode === 'LIGHT' ? 0.6 : 0.6;
  const ratio = 0.6;
  switch (color) {
    case 'accent':
      return `1px solid ${tintOrShade(
        euiTheme.colors.accent,
        ratio,
        colorMode
      )}`;
    case 'danger':
      return `1px solid ${tintOrShade(
        euiTheme.colors.danger,
        ratio,
        colorMode
      )}`;
    case 'primary':
      return `1px solid ${tintOrShade(
        euiTheme.colors.primary,
        ratio,
        colorMode
      )}`;
    case 'success':
      return `1px solid ${tintOrShade(
        euiTheme.colors.success,
        ratio,
        colorMode
      )}`;
    case 'warning':
      return `1px solid ${tintOrShade(
        euiTheme.colors.warning,
        0.4,
        colorMode
      )}`;
    case 'subdued':
      return euiTheme.border.thin;
    default:
      return;
  }
};

export const euiCommentEventStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiCommentEvent: css`
      overflow: hidden;
    `,
    // types
    regular: css`
      border: ${euiTheme.border.thin};
      border-radius: ${euiTheme.border.radius.medium};
    `,
    update: css``,
    custom: css``,
    // variants
    border: {
      warning: css`
        border: ${_generateEventBorderColor(euiThemeContext, 'warning')};
      `,
      accent: css`
        border: ${_generateEventBorderColor(euiThemeContext, 'accent')};
      `,
      primary: css`
        border: ${_generateEventBorderColor(euiThemeContext, 'primary')};
      `,
      success: css`
        border: ${_generateEventBorderColor(euiThemeContext, 'success')};
      `,
      danger: css`
        border: ${_generateEventBorderColor(euiThemeContext, 'danger')};
      `,
      subdued: css`
        border: ${_generateEventBorderColor(euiThemeContext, 'subdued')};
      `,
      transparent: css``,
    },
  };
};

export const euiCommentEventHeaderStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiCommentEvent__header: css``,
    // types
    regular: css`
      ${logicalCSS('border-bottom', euiTheme.border.thin)}
      padding: ${euiTheme.size.s};
    `,
    // variants
    hasEventColor: css`
      padding: 0;
    `,
    border: {
      warning: css`
        ${logicalCSS(
          'border-bottom',
          _generateEventBorderColor(euiThemeContext, 'warning')
        )}
      `,
      accent: css`
        ${logicalCSS(
          'border-bottom',
          _generateEventBorderColor(euiThemeContext, 'accent')
        )}
      `,
      primary: css`
        ${logicalCSS(
          'border-bottom',
          _generateEventBorderColor(euiThemeContext, 'primary')
        )}
      `,
      success: css`
        ${logicalCSS(
          'border-bottom',
          _generateEventBorderColor(euiThemeContext, 'success')
        )}
      `,
      danger: css`
        ${logicalCSS(
          'border-bottom',
          _generateEventBorderColor(euiThemeContext, 'danger')
        )}
      `,
      subdued: css`
        ${logicalCSS(
          'border-bottom',
          _generateEventBorderColor(euiThemeContext, 'subdued')
        )}
      `,
      transparent: css``,
    },
    // Children
    euiCommentEvent__headerMain: css`
      display: flex;
      flex: 1;
      gap: ${euiTheme.size.s};
    `,
    euiCommentEvent__headerData: css`
      display: flex;
      flex: 1;
      align-items: center;
      flex-wrap: wrap;
      gap: ${euiTheme.size.xs};
    `,
    euiCommentEvent__headerEventIcon: css`
      ${logicalCSS('margin-right', euiTheme.size.xs)}
    `,
    euiCommentEvent__headerUsername: css`
      font-weight: ${euiTheme.font.weight.semiBold};
    `,
    euiCommentEvent__headerEvent: css`
      align-items: center;
      display: inline-flex;
      /* the header event can have inline badges so we're adding some white-space and flex-wrap properties  */
      white-space: pre-wrap;
      flex-wrap: wrap;
    `,
    euiCommentEvent__headerActions: css`
      display: flex;
      flex-wrap: wrap;
      gap: ${euiTheme.size.xs};
    `,
  };
};

export const euiCommentEventBodyStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiCommentEvent__body: css``,
  // types
  regular: css`
    padding: ${euiTheme.size.s};
  `,
  update: css`
    ${logicalCSS('padding-top', euiTheme.size.xs)}
  `,
  custom: css``,
});
