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
import { EuiButtonIcon, EuiButtonIconProps } from '../button';
import { useEuiI18n } from '../i18n';
import classNames from 'classnames';

export type EuiNotificationEventReadButtonProps = Omit<
  EuiButtonIconProps,
  'iconType' | 'isDisabled' | 'isSelected' | 'size'
> & {
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
  isRead,
  onClick,
  eventName,
  ...rest
}) => {
  const classesReadState = classNames('euiNotificationEventReadButton', {
    'euiNotificationEventReadButton--isRead': isRead,
  });

  const markAsRead = useEuiI18n(
    'euiNotificationEventReadButton.markAsRead',
    'Mark {eventName} as read.',
    {
      eventName,
    }
  );

  const markAsUnread = useEuiI18n(
    'euiNotificationEventReadButton.markAsUnread',
    'Mark {eventName} as unread.',
    {
      eventName,
    }
  );

  const buttonLabel = !isRead ? markAsRead : markAsUnread;

  return (
    <EuiButtonIcon
      iconType="dot"
      aria-label={buttonLabel}
      title={buttonLabel}
      className={classesReadState}
      onClick={onClick}
      data-test-subj="notificationEventReadButton"
      {...rest}
    />
  );
};
