/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../../services';
import { CommonProps, ExclusiveUnion } from '../../common';

import type { EuiRangeProps } from './types';
import { euiRangeThumbStyles } from './range_thumb.styles';

interface BaseProps
  extends CommonProps,
    Pick<
      EuiRangeProps,
      'min' | 'max' | 'value' | 'disabled' | 'showInput' | 'showTicks'
    > {}

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
  const classes = classNames('euiRangeThumb', className);

  const euiTheme = useEuiTheme();
  const styles = euiRangeThumbStyles(euiTheme);
  const cssStyles = [styles.euiRangeThumb, showTicks && styles.hasTicks];

  const commonAttrs = {
    className: classes,
    css: cssStyles,
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
