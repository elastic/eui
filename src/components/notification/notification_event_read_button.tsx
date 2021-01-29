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
import { EuiI18n } from '../i18n';
import classNames from 'classnames';

export type EuiNotificationEventReadButtonProps = Omit<
  EuiButtonIconProps,
  'iconType'
> & {
  isRead: boolean;
  onClick: () => void;
};

export const EuiNotificationEventReadButton: FunctionComponent<EuiNotificationEventReadButtonProps> = ({
  isRead,
  onClick,
  ...rest
}) => {
  const classesReadState = classNames('euiNotificationEventReadButton', {
    'euiNotificationEventReadButton--isRead': isRead,
  });

  return (
    <EuiI18n
      tokens={[
        'euiNotificationEventReadButton.markAsRead',
        'euiNotificationEventReadButton.markAsUnread',
      ]}
      defaults={['Mark as read', 'Mark as unread']}>
      {([markAsRead, markAsUnread]: string[]) => (
        <EuiButtonIcon
          iconType="dot"
          aria-label={!isRead ? markAsRead : markAsUnread}
          title={!isRead ? markAsRead : markAsUnread}
          className={classesReadState}
          onClick={onClick}
          data-test-subj="notificationEventReadButton"
          {...rest}
        />
      )}
    </EuiI18n>
  );
};
