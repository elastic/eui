import React, { SFC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiLoadingChartSize = 'm' | 'l' | 'xl';

const sizeToClassNameMap = {
  m: 'euiLoadingChart--medium',
  l: 'euiLoadingChart--large',
  xl: 'euiLoadingChart--xLarge',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiLoadingChart: SFC<
  CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      /**
       * Makes the loader animation black and white
       */
      mono?: boolean;
      size?: EuiLoadingChartSize;
    }
> = ({ size, mono, className, ...rest }) => {
  const classes = classNames(
    'euiLoadingChart',
    { 'euiLoadingChart--mono' : mono },
    className,
    size ? sizeToClassNameMap[size] : ''
  );

  return (
    <div className={classes} {...rest}>
      <div className="euiLoadingChart__bar" />
      <div className="euiLoadingChart__bar" />
      <div className="euiLoadingChart__bar" />
      <div className="euiLoadingChart__bar" />
    </div>
  );
};

EuiLoadingChart.defaultProps = {
  mono: false,
  size: 'm',
};
