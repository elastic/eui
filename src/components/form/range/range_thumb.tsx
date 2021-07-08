/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion } from '../../common';

interface BaseProps extends CommonProps {
  min: number;
  max: number;
  value?: number | string;
  disabled?: boolean;
  showInput?: boolean;
  showTicks?: boolean;
}

interface ButtonLike extends BaseProps, HTMLAttributes<HTMLButtonElement> {}
interface DivLike
  extends BaseProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onClick' | 'onMouseDown'> {}

export type EuiRangeThumbProps = ExclusiveUnion<ButtonLike, DivLike>;

export const EuiRangeThumb: FunctionComponent<EuiRangeThumbProps> = ({
  className,
  min,
  max,
  value,
  disabled,
  showInput,
  showTicks,
  onClick,
  onMouseDown,
  tabIndex,
  ...rest
}) => {
  const classes = classNames(
    'euiRangeThumb',
    {
      'euiRangeThumb--hasTicks': showTicks,
    },
    className
  );
  const commonAttrs = {
    className: classes,
    role: 'slider',
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': Number(value),
    'aria-disabled': !!disabled,
    tabIndex: showInput || !!disabled ? -1 : tabIndex || 0,
  };
  return onClick || onMouseDown ? (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
      {...commonAttrs}
      {...(rest as HTMLAttributes<HTMLButtonElement>)}
    />
  ) : (
    <div {...commonAttrs} {...(rest as HTMLAttributes<HTMLDivElement>)} />
  );
};
