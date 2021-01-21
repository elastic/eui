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
import { EuiButtonIcon } from '../button';
import { EuiI18n } from '../i18n';
import classNames from 'classnames';

export type EuiNotificationEventReadButtonProps = {
  onMarkAsRead: () => void;
  isRead: boolean;
};

export const EuiNotificationEventReadButton: FunctionComponent<EuiNotificationEventReadButtonProps> = ({
  isRead,
  onMarkAsRead,
}) => {
  const classesReadState = classNames('euiNotificationEventReadButton', {
    'euiNotificationEventReadButton--isRead': isRead,
    'euiNotificationEventReadButton--isUnread': !isRead,
  });

  return (
    <EuiI18n
      token="euiNotificationEventReadButton.markAsRead"
      default="Mark as read">
      {(markAsRead: string) => (
        <EuiButtonIcon
          aria-label={markAsRead}
          iconType="dot"
          className={classesReadState}
          disabled={isRead}
          onClick={onMarkAsRead}
        />
      )}
    </EuiI18n>
  );
};
