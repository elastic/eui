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

import React, { FunctionComponent, useState, ReactElement } from 'react';
import { EuiIcon } from '../icon';
import { EuiBadge } from '../badge';
import { EuiPopover } from '../popover';
import { EuiButtonIcon } from '../button';
import { EuiContextMenuPanel, EuiContextMenuItemProps } from '../context_menu';
import { EuiI18n } from '../i18n';
import { EuiNotificationEventReadButton } from './notification_event_read_button';

export type EuiNotificationEventMetaProps = {
  /**
   * Type of event (e.g. "Alert", "Cloud", etc..)
   */
  type: string;
  /**
   * Type of severity (e.g. "Critical", "Cloud", etc..)
   */
  severity?: string;
  /**
   * The read state of the event
   */
  isRead?: boolean | undefined;

  /**
   * Changes the color of the badge
   */
  healthStatus?: 'secondary' | 'warning' | 'danger';

  /**
   * The icon used to visually represent this data type. Accepts any `EuiIcon IconType`.
   */
  iconType?: string;

  /**
   * Indicates when was the event received
   */
  time: string;

  onRead?: () => void;

  /**
   * An array of context menu items. See #EuiContextMenuItem
   */
  contextMenuItems?: EuiContextMenuItemProps[];
};

export const EuiNotificationEventMeta: FunctionComponent<EuiNotificationEventMetaProps> = ({
  isRead,
  iconType,
  type,
  time,
  healthStatus,
  onRead,
  severity,
  contextMenuItems = [],
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onMarkAsRead = () => {
    onRead && onRead();
  };

  return (
    <div className="euiNotificationEventMeta">
      <div>
        {typeof isRead === 'boolean' && (
          <EuiNotificationEventReadButton
            isRead={isRead}
            onMarkAsRead={onMarkAsRead}
          />
        )}

        {iconType && <EuiIcon type={iconType} />}

        {type && (
          <EuiBadge color={healthStatus ? healthStatus : 'hollow'}>
            {severity ? `${type}: ${severity}` : type}
          </EuiBadge>
        )}
      </div>

      <div>
        <span className="euiNotificationEventMeta__time">{time}</span>

        {contextMenuItems.length > 0 && (
          <EuiPopover
            ownFocus
            repositionOnScroll
            isOpen={isPopoverOpen}
            panelPaddingSize="s"
            anchorPosition="upCenter"
            button={
              <EuiI18n
                token="euiNotificationEventMeta.contextMenuButton"
                default="Open menu">
                {(contextMenuButton: string) => (
                  <EuiButtonIcon
                    aria-label={contextMenuButton}
                    iconType="boxesVertical"
                    color="subdued"
                    className="euiNotificationEventMeta__secondaryAction"
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  />
                )}
              </EuiI18n>
            }
            closePopover={() => setIsPopoverOpen(false)}>
            <EuiContextMenuPanel items={contextMenuItems as ReactElement[]} />
          </EuiPopover>
        )}
      </div>
    </div>
  );
};
