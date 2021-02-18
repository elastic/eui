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
import { EuiAccordion } from '../accordion';
import { htmlIdGenerator } from '../../services';
import { useEuiI18n } from '../i18n';
import { EuiText } from '../text';

export type EuiNotificationEventNotificationsProps = {
  /*
  An array of strings
  */
  notifications: string[];
};

export const EuiNotificationEventNotifications: FunctionComponent<EuiNotificationEventNotificationsProps> = ({
  notifications,
}) => {
  const accordionButtonText = useEuiI18n(
    'euiNotificationEventNotifications.notificationsLength',
    '+ {notificationsLength} notifications',
    {
      notificationsLength: notifications.length,
    }
  );

  return (
    <div className="euiNotificationEventNotifications">
      {notifications && notifications.length === 1 ? (
        <EuiText size="s">
          <p>{notifications}</p>
        </EuiText>
      ) : (
        <EuiAccordion
          id={htmlIdGenerator()()}
          className="euiNotificationEventNotifications__accordion"
          buttonContent={accordionButtonText}
          arrowDisplay="none">
          <div className="euiNotificationEventNotifications__accordionContent">
            {notifications.map((notification, index) => (
              <p key={index}>{notification}</p>
            ))}
          </div>
        </EuiAccordion>
      )}
    </div>
  );
};
