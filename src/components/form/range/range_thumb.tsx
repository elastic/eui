import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

export type EuiRangeThumbProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    min: number;
    max: number;
    value?: number | string;
    disabled?: boolean;
    showInput?: boolean;
    showTicks?: boolean;
  };

export const EuiRangeThumb: FunctionComponent<EuiRangeThumbProps> = ({
  min,
  max,
  value,
  disabled,
  showInput,
  showTicks,
  ...rest
}) => {
  const classes = classNames('euiRangeThumb', {
    'euiRangeThumb--hasTicks': showTicks,
  });
  return (
    <div
      className={classes}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={Number(value)}
      aria-disabled={!!disabled}
      tabIndex={showInput || !!disabled ? -1 : 0}
      {...rest}
    />
  );
};
