/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
