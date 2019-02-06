import React, { SFC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

export type EuiHorizontalRuleSize = keyof typeof sizeToClassNameMap;
export type EuiHorizontalRuleMargin = keyof typeof marginToClassNameMap;

export interface EuiHorizontalRuleProps {
  /**
   * Defines the width of the HR.
   */
  size?: EuiHorizontalRuleSize;
  margin?: EuiHorizontalRuleMargin;
}

const sizeToClassNameMap = {
  full: 'euiHorizontalRule--full',
  half: 'euiHorizontalRule--half',
  quarter: 'euiHorizontalRule--quarter',
};

export const SIZES = Object.keys(sizeToClassNameMap);

const marginToClassNameMap = {
  none: null,
  xs: 'euiHorizontalRule--marginXSmall',
  s: 'euiHorizontalRule--marginSmall',
  m: 'euiHorizontalRule--marginMedium',
  l: 'euiHorizontalRule--marginLarge',
  xl: 'euiHorizontalRule--marginXLarge',
  xxl: 'euiHorizontalRule--marginXXLarge',
};

export const MARGINS = Object.keys(marginToClassNameMap);

export const EuiHorizontalRule: SFC<
  CommonProps & HTMLAttributes<HTMLHRElement> & EuiHorizontalRuleProps
> = ({ className, size, margin, ...rest }) => {
  const classes = classNames(
    'euiHorizontalRule',
    size ? sizeToClassNameMap[size] : undefined,
    margin ? marginToClassNameMap[margin] : undefined,
    className
  );

  return <hr className={classes} {...rest} />;
};

EuiHorizontalRule.defaultProps = {
  size: 'full',
  margin: 'l',
};
