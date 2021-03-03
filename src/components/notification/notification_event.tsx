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

import React, { FunctionComponent, ReactElement, createElement } from 'react';
import classNames from 'classnames';
import {
  EuiNotificationEventMeta,
  EuiNotificationEventMetaProps,
} from './notification_event_meta';
import {
  EuiNotificationEventMessages,
  EuiNotificationEventMessagesProps,
} from './notification_event_messages';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../button';
import { EuiLink } from '../link';
import { EuiContextMenuItem, EuiContextMenuItemProps } from '../context_menu';
import { htmlIdGenerator } from '../../services';

export type EuiNotificationEventPrimaryActionProps = EuiButtonEmptyProps & {
  label: string;
};

export type EuiNotificationHeadingLevel =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

export type EuiNotificationEventProps = Omit<
  EuiNotificationEventMetaProps,
  'onOpenContextMenu' | 'onRead' | 'eventName'
> & {
  id: string;
  /**
   * The title of the event.
   */
  title: string;
  /**
   * The heading level of the title.
   */
  headingLevel?: EuiNotificationHeadingLevel;
  /**
   * Returns the `id` and applies an `onClick` handler to the title.
   */
  onClickTitle?: (id: string) => void;
  /**
   * See #EuiNotificationEventPrimaryAction.
   */
  primaryAction?: EuiNotificationEventPrimaryActionProps;
  /**
   * Returns the `id` and applies an `onClick` handler to the `primaryAction`.
   */
  onClickPrimaryAction?: (id: string) => void;
  /**
   * Notification messages as an array of strings. More than one message wraps in an accordion.
   */
  messages: EuiNotificationEventMessagesProps['messages'];
  /**
   * Returns the `id` and `isRead` state. Applies an `onClick` handler to the `read` indicator.
   */
  onRead?: (id: string, isRead: boolean) => void;
  /**
   * Provided the `id` of the event must return an array of #EuiContextMenuItem elements.
   */
  onOpenContextMenu?: (
    id: string
  ) => Array<ReactElement<EuiContextMenuItemProps, typeof EuiContextMenuItem>>;
};

export const EuiNotificationEvent: FunctionComponent<EuiNotificationEventProps> = ({
  id,
  type,
  severity,
  badgeColor,
  iconType,
  iconAriaLabel,
  time,
  title,
  isRead,
  primaryAction,
  messages,
  onRead,
  onOpenContextMenu,
  onClickTitle,
  onClickPrimaryAction,
  headingLevel = 'h2',
}) => {
  const classes = classNames('euiNotificationEvent', {
    'euiNotificationEvent--withReadState': typeof isRead === 'boolean',
  });

  const classesTitle = classNames('euiNotificationEvent__title', {
    'euiNotificationEvent__title--isRead': isRead,
  });

  const randomHeadingId = htmlIdGenerator()();

  const titleProps = {
    id: randomHeadingId,
    className: classesTitle,
    'data-test-subj': 'notificationEventTitle',
  };

  return (
    <article aria-labelledby={randomHeadingId} className={classes} key={id}>
      <EuiNotificationEventMeta
        type={type}
        severity={severity}
        badgeColor={badgeColor}
        iconType={iconType}
        iconAriaLabel={iconAriaLabel}
        time={time}
        isRead={isRead}
        onOpenContextMenu={
          onOpenContextMenu ? () => onOpenContextMenu(id) : undefined
        }
        eventName={title}
        onRead={() => onRead?.(id, isRead!)}
      />

      <div className="euiNotificationEvent__content">
        {onClickTitle ? (
          <EuiLink onClick={() => onClickTitle(id)} {...titleProps}>
            {createElement(headingLevel, null, title)}
          </EuiLink>
        ) : (
          createElement(headingLevel, titleProps, title)
        )}

        <EuiNotificationEventMessages messages={messages} eventName={title} />

        {onClickPrimaryAction && primaryAction && (
          <div className="euiNotificationEvent__primaryAction">
            <EuiButtonEmpty
              flush="left"
              size="s"
              {...primaryAction}
              onClick={() => onClickPrimaryAction?.(id)}
              data-test-subj="notificationEventPrimaryAction">
              {primaryAction.label}
            </EuiButtonEmpty>
          </div>
        )}
      </div>
    </article>
  );
};
