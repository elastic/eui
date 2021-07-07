/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { EuiButtonIcon, EuiButtonIconProps } from '../button';
import { useEuiI18n } from '../i18n';
import classNames from 'classnames';

export type EuiNotificationEventReadButtonProps = Omit<
  EuiButtonIconProps,
  'iconType' | 'isDisabled' | 'isSelected' | 'size'
> & {
  id: string;
  /**
   * Shows an indicator of the read state of the event
   */
  isRead: boolean;
  /**
   * Applies an `onClick` handler to the `read` indicator.
   */
  onClick: () => void;
  /**
   * A unique, human-friendly name for the event to be used in aria attributes (e.g. "alert-critical-01", "cloud-no-severity-12", etc..).
   */
  eventName: string;
};

export const EuiNotificationEventReadButton: FunctionComponent<EuiNotificationEventReadButtonProps> = ({
  id,
  isRead,
  onClick,
  eventName,
  ...rest
}) => {
  const classesReadState = classNames('euiNotificationEventReadButton', {
    'euiNotificationEventReadButton--isRead': isRead,
  });

  const markAsReadAria = useEuiI18n(
    'euiNotificationEventReadButton.markAsReadAria',
    'Mark {eventName} as read',
    {
      eventName,
    }
  );

  const markAsUnreadAria = useEuiI18n(
    'euiNotificationEventReadButton.markAsUnreadAria',
    'Mark {eventName} as unread',
    {
      eventName,
    }
  );

  const markAsRead = useEuiI18n(
    'euiNotificationEventReadButton.markAsRead',
    'Mark as read'
  );

  const markAsUnread = useEuiI18n(
    'euiNotificationEventReadButton.markAsUnread',
    'Mark as unread'
  );

  const buttonAriaLabel = isRead ? markAsUnreadAria : markAsReadAria;
  const buttonTitle = isRead ? markAsUnread : markAsRead;

  return (
    <EuiButtonIcon
      iconType="dot"
      aria-label={buttonAriaLabel}
      title={buttonTitle}
      className={classesReadState}
      onClick={onClick}
      data-test-subj={`${id}-notificationEventReadButton`}
      {...rest}
    />
  );
};
