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

import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import {
  EuiNotificationBadgeProps,
  EuiNotificationBadge,
} from '../../badge/notification_badge/badge_notification';
import { EuiIcon } from '../../icon';

export type EuiHeaderSectionItemButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * Inserts the node into a EuiBadgeNotification and places it appropriately against the button.
     * Or pass `true` to render a simple dot
     */
    notification?: EuiNotificationBadgeProps['children'] | boolean;
    /**
     * Changes the color of the notification background
     */
    notificationColor?: EuiNotificationBadgeProps['color'];

    /**
     * Adds a circular background to the button to emphasize the content
     */
    hasBackground?: boolean;

    /**
     * Pass `true` to trigger an animation
     */
    animation?: boolean;
  };

export type EuiHeaderSectionItemButtonRef = HTMLButtonElement;

export const EuiHeaderSectionItemButton = React.forwardRef<
  EuiHeaderSectionItemButtonRef,
  PropsWithChildren<EuiHeaderSectionItemButtonProps>
>(
  (
    {
      onClick,
      children,
      className,
      notification,
      notificationColor = 'accent',
      animation = false,
      hasBackground = false,
      ...rest
    },
    ref
  ) => {
    const classes = classNames('euiHeaderSectionItemButton', className);
    const animationClasses = classNames({
      'euiHeaderSectionItemButton--isAnimating': animation,
    });

    let buttonContent;

    if (hasBackground) {
      buttonContent = (
        <span className="euiHeaderSectionItemButton__inner--hasBackground">
          {notification && (
            <EuiIcon
              className="euiHeaderSectionItemButton__notification--dot"
              type="dot"
              color={notificationColor}
            />
          )}
          <span className={animationClasses}>{children}</span>
        </span>
      );
    } else {
      buttonContent = (
        <span className="euiHeaderSectionItemButton__inner">
          <span className={animationClasses}>{children}</span>

          {notification && typeof notification === 'boolean' && (
            <EuiIcon
              className="euiHeaderSectionItemButton__notification euiHeaderSectionItemButton__notification--dot"
              color={notificationColor}
              type="dot"
              size="l"
            />
          )}

          {notification && typeof notification !== 'boolean' && (
            <EuiNotificationBadge
              className="euiHeaderSectionItemButton__notification euiHeaderSectionItemButton__notification--badge"
              color={notificationColor}>
              {notification}
            </EuiNotificationBadge>
          )}
        </span>
      );
    }

    return (
      <button
        className={classes}
        ref={ref}
        onClick={onClick}
        type="button"
        {...rest}>
        {buttonContent}
      </button>
    );
  }
);

EuiHeaderSectionItemButton.displayName = 'EuiHeaderSectionItemButton';
