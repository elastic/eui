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

import React, { FunctionComponent } from 'react';

import { PropsOf } from '../common';
import { EuiIcon, IconSize, IconType } from '../icon';
import { EuiToolTip, EuiToolTipProps } from './tool_tip';

export interface EuiIconTipProps {
  /**
   * The icon color.
   */
  color?: string;
  /**
   * The icon type.
   */
  type?: IconType;
  /**
   * The icon size.
   */
  size?: IconSize;
  /**
   * Explain what this icon means for screen readers.
   */
  'aria-label'?: string;

  /**
   * Pass certain props down to `EuiIcon`
   */
  // EuiIconTip's `type` is passed to EuiIcon, so we want to exclude `type` from
  // iconProps; however, due to TS's bivariant function arguments `type` could be
  // passed without any error/feedback so we explicitly set it to `never` type
  iconProps?: Omit<PropsOf<EuiIcon>, 'type'> & { type?: never };
}

type Props = Omit<EuiToolTipProps, 'children' | 'delay' | 'position'> &
  EuiIconTipProps & {
    // This are copied from EuiToolTipProps, but made optional. Defaults
    // are applied below.
    delay?: EuiToolTipProps['delay'];
    position?: EuiToolTipProps['position'];
  };

export const EuiIconTip: FunctionComponent<Props> = ({
  type = 'questionInCircle',
  'aria-label': ariaLabel = 'Info',
  color,
  size,
  iconProps,
  position = 'top',
  delay = 'regular',
  ...rest
}) => (
  <EuiToolTip position={position} delay={delay} {...rest}>
    <EuiIcon
      tabIndex={0}
      type={type}
      color={color}
      size={size}
      aria-label={ariaLabel}
      {...iconProps}
    />
  </EuiToolTip>
);
