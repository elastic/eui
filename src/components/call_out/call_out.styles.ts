/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiCallOutStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiCallOut: css`
      position: relative;
    `,
    euiCallOut__closeIcon: css`
      position: absolute;
      ${logicalCSS('top', euiTheme.size.s)}
      ${logicalCSS('right', euiTheme.size.s)}
      cursor: pointer;
    `,
    euiCallOut__icon: css`
      position: relative;
      ${logicalCSS('top', '-1px')}
      ${logicalCSS('margin-right', euiTheme.size.s)}
    `,
    euiCallOut__description: css`
      :not(:only-child) {
        ${logicalCSS('margin-top', euiTheme.size.s)}
      }

      .euiButtonEmpty:last-child {
        ${logicalCSS('margin-left', euiTheme.size.s)}
      }
    `,
    euiCallOut__dismissButton_isLast: css`
      ${logicalCSS('margin-left', euiTheme.size.s)}
    `,
    euiCallOut__title_endSpace: css`
      padding-inline-end: ${euiTheme.size.l};
    `,
  };
};

export const euiCallOutHeadingStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiCallOutHeader: css`
      font-weight: ${euiTheme.font.weight.medium};
    `,

    primary: css`
      color: ${euiTheme.colors.primaryText};
    `,
    success: css`
      color: ${euiTheme.colors.successText};
    `,
    warning: css`
      color: ${euiTheme.colors.warningText};
    `,
    danger: css`
      color: ${euiTheme.colors.dangerText};
    `,
  };
};

type EuiCalloutOutTitleStylesProps = {
  isDismissible: boolean;
  hasChildren: boolean;
  isTitleReactNode?: boolean;
  theme: any;
};

export const euiCalloutOutTitleStyles = ({
  isDismissible,
  hasChildren,
  theme,
}: EuiCalloutOutTitleStylesProps) => {
  const { euiTheme } = theme;
  if (isDismissible && !hasChildren) {
    return css`
      margin-block-end: ${parseInt(euiTheme.size.xxl) / 2}px !important;
    `;
  } else {
    return css`
      margin-block-end: 0 !important;
    `;
  }
};
