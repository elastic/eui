/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
      {...rest as HTMLAttributes<HTMLButtonElement>}
    />
  ) : (
    <div {...commonAttrs} {...rest as HTMLAttributes<HTMLDivElement>} />
  );
};
