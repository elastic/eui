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

import {
  EuiNotificationEventProps,
  EuiNotificationEvent,
} from './notification_event';

import { EuiContextMenuPanelProps } from '../context_menu';

export type EuiNotificationEventsProps = {
  /**
   * An array of notification events. See #EuiNotificationEvent
   */
  events: EuiNotificationEventProps[];

  /**
   * Returns the `id` and `isRead` of the clicked event read button
   */
  onRead?: (id: string, isRead: boolean) => void;
  /**
   * An array of context menu items. See #EuiContextMenuItem
   */
  contextMenuItems?: EuiContextMenuPanelProps['items'];
  /**
   * Returns the `id`, `isRead` ad `type` of the open context menu
   */
  onOpenContextMenu?: (id: string, isRead: boolean, type: string) => void;
};

export const EuiNotificationEvents: FunctionComponent<EuiNotificationEventsProps> = ({
  events = [],
  onRead,
  contextMenuItems = [],
  onOpenContextMenu,
}) => {
  console.log('onOpenContextMenu', onOpenContextMenu);
  const notificationEvents = events.map((event) => {
    return (
      <EuiNotificationEvent
        key={event.id}
        id={event.id}
        meta={event.meta}
        title={event.title}
        isRead={event.isRead}
        primaryAction={event.primaryAction}
        notifications={event.notifications}
        onRead={() => onRead!(event.id, !event.isRead!)}
        contextMenuItems={contextMenuItems}
        onOpenContextMenu={() =>
          onOpenContextMenu!(event.id, !event.isRead!, event.meta.type)
        }
      />
    );
  });

  return <div className="euiNotificationEvents">{notificationEvents}</div>;
};
