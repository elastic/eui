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
  EuiNotificationEventMeta,
  EuiNotificationEventMetaProps,
} from './notification_event_meta';
import {
  EuiNotificationEventNotifications,
  EuiNotificationEventNotificationsProps,
} from './notification_event_notifications';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../button';
import { EuiContextMenuPanelProps } from '../context_menu';
import { EuiLink, EuiLinkProps } from '../link';

export type EuiNotificationEventTitleProps = EuiLinkProps & {
  label: string;
};

export type EuiNotificationEventProps = {
  id: string;
  meta: EuiNotificationEventMetaProps;
  title: EuiNotificationEventTitleProps;
  isRead?: boolean | undefined;
  primaryAction?: EuiButtonEmptyProps;
  notifications: EuiNotificationEventNotificationsProps['notifications'];
  onRead?: () => void;
  contextMenuItems?: EuiContextMenuPanelProps['items'];
  onOpenContextMenu?: () => void;
};

export const EuiNotificationEvent: FunctionComponent<EuiNotificationEventProps> = ({
  id,
  meta,
  title,
  isRead,
  primaryAction,
  notifications,
  onRead,
  contextMenuItems,
  onOpenContextMenu,
}) => {
  const classes = classNames('euiNotificationEvent', {
    'euiNotificationEvent--withReadState': typeof isRead === 'boolean',
  });

  const classesTitle = classNames('euiNotificationEvent__title', {
    'euiNotificationEvent__title--isRead': isRead,
  });

  return (
    <div className={classes} key={id}>
      <EuiNotificationEventMeta
        type={meta.type}
        severity={meta.severity}
        badgeColor={meta.badgeColor}
        iconType={meta.iconType}
        iconAriaLabel={meta.iconAriaLabel}
        time={meta.time}
        isRead={isRead}
        contextMenuItems={contextMenuItems}
        onOpenContextMenu={() => onOpenContextMenu?.()}
        eventName={meta.eventName}
        onRead={() => onRead?.()}
      />

      <div className="euiNotificationEvent__content">
        <EuiLink {...title} className={classesTitle}>
          {title.label}
        </EuiLink>

        <EuiNotificationEventNotifications notifications={notifications} />

        {primaryAction && (
          <div className="euiNotificationEvent__primaryAction">
            <EuiButtonEmpty flush="left" size="s" {...primaryAction} />
          </div>
        )}
      </div>
    </div>
  );
};
