import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import {
  EuiNotificationBadgeProps,
  EuiNotificationBadge,
} from '../../badge/notification_badge/badge_notification';

type Props = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * Inserts the node into a EuiBadgeNotification and places it appropriately against the button
     */
    notification?: EuiNotificationBadgeProps['children'];
    /**
     * Changes the color of the notification background
     */
    notificationColor?: EuiNotificationBadgeProps['color'];
  };

export const EuiHeaderSectionItemButton: FunctionComponent<Props> = ({
  onClick,
  children,
  className,
  notification,
  notificationColor,
  ...rest
}) => {
  const classes = classNames('euiHeaderSectionItem__button', className);

  let notificationBadge;
  if (notification) {
    notificationBadge = (
      <EuiNotificationBadge
        className="euiHeaderSectionItemButton__notification"
        color={notificationColor}>
        {notification}
      </EuiNotificationBadge>
    );
  }

  return (
    <button className={classes} onClick={onClick} type="button" {...rest}>
      {children}
      {notificationBadge}
    </button>
  );
};
