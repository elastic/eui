import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

const sizeToClassNameMap = {
  m: 'euiLoadingChart--medium',
  l: 'euiLoadingChart--large',
  xl: 'euiLoadingChart--xLarge',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiLoadingChartSize = keyof typeof sizeToClassNameMap;

export const EuiLoadingChart: FunctionComponent<
  CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      /**
       * Makes the loader animation black and white
       */
      mono?: boolean;
      size?: EuiLoadingChartSize;
    }
> = ({ size = 'm', mono = false, className, ...rest }) => {
  const classes = classNames(
    'euiLoadingChart',
    { 'euiLoadingChart--mono': mono },
    className,
    sizeToClassNameMap[size]
  );

  return (
    <span className={classes} {...rest}>
      <span className="euiLoadingChart__bar" />
      <span className="euiLoadingChart__bar" />
      <span className="euiLoadingChart__bar" />
      <span className="euiLoadingChart__bar" />
    </span>
  );
};
