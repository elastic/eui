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
import classNames from 'classnames';

import {
  EuiNotificationBadgeProps,
  EuiNotificationBadge,
} from '../../badge/notification_badge/badge_notification';
import { EuiIcon } from '../../icon';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../../button';

export type EuiHeaderSectionItemButtonProps = EuiButtonEmptyProps & {
  /**
   * Inserts the node into a EuiBadgeNotification and places it appropriately against the button.
   * Or pass `true` to render a simple dot
   */
  notification?: EuiNotificationBadgeProps['children'] | boolean;
  /**
   * Changes the color of the notification background
   */
  notificationColor?: EuiNotificationBadgeProps['color'];
};

export const EuiHeaderSectionItemButton: FunctionComponent<EuiHeaderSectionItemButtonProps> = ({
  children,
  className,
  notification,
  notificationColor = 'accent',
  ...rest
}) => {
  const classes = classNames('euiHeaderSectionItem__button', className);

  let notificationBadge;
  if (notification) {
    if (notification === true) {
      notificationBadge = (
        <EuiIcon
          className="euiHeaderSectionItemButton__notification euiHeaderSectionItemButton__notification--dot"
          color={notificationColor}
          type="dot"
          size="l"
        />
      );
    } else {
      notificationBadge = (
        <EuiNotificationBadge
          className="euiHeaderSectionItemButton__notification euiHeaderSectionItemButton__notification--badge"
          color={notificationColor}>
          {notification}
        </EuiNotificationBadge>
      );
    }
  }

  return (
    <EuiButtonEmpty className={classes} color="text" {...rest}>
      {children}
      {notificationBadge}
    </EuiButtonEmpty>
  );
};

EuiHeaderSectionItemButton.displayName = 'EuiHeaderSectionItemButton';
