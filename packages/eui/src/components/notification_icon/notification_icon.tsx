/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { _EuiThemeBackgroundColors } from '@elastic/eui-theme-common';

import { useEuiMemoizedStyles, useEuiTheme } from '../../services';
import { CommonProps } from '../common';
import { EuiIcon, IconType } from '../icon/icon';
import { icon as EuiIconErrorFill } from '../icon/assets/error_fill';
import { icon as EuiIconCheckCircleFill } from '../icon/assets/check_circle_fill';
import { icon as EuiIconInfoFill } from './assets/info_fill';
import { icon as EuiIconWarningStatic } from './assets/warning_static';
import { euiNotificationIconStyles } from './notification_icon.styles';

const TYPES = ['info', 'success', 'warning', 'error'] as const;
export type EuiNotificationIconType = (typeof TYPES)[number];

export const NOTIFICATION_ICONS_MAP: Record<
  EuiNotificationIconType,
  { name: string; icon: IconType; color?: string }
> = {
  info: {
    name: 'infoFill',
    icon: EuiIconInfoFill,
    color: 'backgroundFilledPrimary',
  },
  success: {
    name: 'checkCircleFill',
    icon: EuiIconCheckCircleFill,
    color: 'backgroundFilledSuccess',
  },
  warning: {
    name: 'warningStatic',
    icon: EuiIconWarningStatic,
    color: 'backgroundFilledWarning',
  },
  error: {
    name: 'errorFill',
    icon: EuiIconErrorFill,
    color: 'backgroundFilledDanger',
  },
};

export type EuiNotificationIconProps = CommonProps & {
  type: EuiNotificationIconType;
  size?: 'm' | 'l';
};

export const EuiNotificationIcon: FunctionComponent<
  EuiNotificationIconProps
> = ({ className, type, size = 'm' }) => {
  const { euiTheme } = useEuiTheme();

  const Icon = NOTIFICATION_ICONS_MAP[type];

  const classes = classNames('euiNotificationIcon', className);
  const styles = useEuiMemoizedStyles(euiNotificationIconStyles);
  const cssStyles = [
    styles.euiNotificationIcon,
    size === 'l' && styles.size[size],
  ];

  return (
    <EuiIcon
      className={classes}
      css={cssStyles}
      type={Icon.icon}
      color={euiTheme.colors[Icon.color as keyof _EuiThemeBackgroundColors]}
      aria-hidden="true"
      size={size}
    />
  );
};
