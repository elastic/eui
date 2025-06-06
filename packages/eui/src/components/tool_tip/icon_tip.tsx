/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';

import { PropsOf } from '../common';
import { useEuiI18n } from '../i18n';
import { EuiIcon, IconSize, IconType } from '../icon';
import { EuiToolTip, EuiToolTipProps } from './tool_tip';

export type EuiIconTipProps = Omit<
  EuiToolTipProps,
  'children' | 'delay' | 'position'
> & {
  /**
   * Children are not allowed as they are built using the icon props
   */
  children?: never;
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
  iconProps?: Omit<PropsOf<typeof EuiIcon>, 'type'> & { type?: never };
  // This are copied from EuiToolTipProps, but made optional. Defaults
  // are applied below.
  delay?: EuiToolTipProps['delay'];
  position?: EuiToolTipProps['position'];
};

export const EuiIconTip: FunctionComponent<EuiIconTipProps> = ({
  type = 'question',
  'aria-label': ariaLabel,
  color,
  size,
  iconProps,
  position = 'top',
  delay = 'regular',
  ...rest
}) => {
  const defaultAriaLabel = useEuiI18n('euiIconTip.defaultAriaLabel', 'Info');

  return (
    <EuiToolTip position={position} delay={delay} {...rest}>
      <EuiIcon
        tabIndex={0}
        type={type}
        color={color}
        size={size}
        aria-label={ariaLabel || defaultAriaLabel}
        {...iconProps}
      />
    </EuiToolTip>
  );
};
