/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { useEuiTheme } from '../../services';
import { euiHorizontalRuleStyles } from './horizontal_rule.styles';

export const SIZES = ['full', 'half', 'quarter'] as const;
export const MARGINS = ['none', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const;

export type EuiHorizontalRuleSize = (typeof SIZES)[number];
export type EuiHorizontalRuleMargin = (typeof MARGINS)[number];

export interface EuiHorizontalRuleProps
  extends CommonProps,
    HTMLAttributes<HTMLHRElement> {
  /**
   * Defines the width of the HR.
   */
  size?: EuiHorizontalRuleSize;
  margin?: EuiHorizontalRuleMargin;
}

const marginToClassNameMap: {
  [value in EuiHorizontalRuleMargin]: string | null;
} = {
  none: null,
  xs: 'marginXSmall',
  s: 'marginSmall',
  m: 'marginMedium',
  l: 'marginLarge',
  xl: 'marginXLarge',
  xxl: 'marginXXLarge',
};

export const EuiHorizontalRule: FunctionComponent<EuiHorizontalRuleProps> = ({
  className,
  size = 'full',
  margin = 'l',
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiHorizontalRuleStyles(euiTheme);

  const classes = classNames(
    'euiHorizontalRule',
    {
      [`euiHorizontalRule--${size}`]: size,
      [`euiHorizontalRule--${marginToClassNameMap[margin]}`]:
        margin && margin !== 'none',
    },
    className
  );

  const cssStyles = [styles.euiHorizontalRule, styles[size], styles[margin]];

  return <hr css={cssStyles} className={classes} {...rest} />;
};
