/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
import {
  EuiNotificationEventReadButton,
  EuiNotificationEventReadButtonProps,
} from './notification_event_read_button';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../button';
import { EuiLink } from '../link';
import { EuiContextMenuItem, EuiContextMenuItemProps } from '../context_menu';
import { htmlIdGenerator } from '../../services';
import { EuiNotificationEventReadIcon } from './notification_event_read_icon';

export type EuiNotificationHeadingLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type EuiNotificationEventProps = Omit<
  EuiNotificationEventMetaProps,
  'onOpenContextMenu' | 'onRead' | 'eventName' | 'id'
> &
  Omit<
    EuiNotificationEventReadButtonProps,
    'onClick' | 'color' | 'eventName' | 'isRead' | 'id'
  > & {
    /**
     * A unique identifier
     */
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
     * The label of the primary action
     */
    primaryAction?: string;
    /**
     * Apply more props to the `primaryAction` button. See #EuiPrimaryActionProps.
     */
    primaryActionProps?: EuiButtonEmptyProps;
    /**
     * Returns the `id` and applies an `onClick` handler to the `primaryAction`.
     */
    onClickPrimaryAction?: (id: string) => void;
    /**
     * Notification messages as an array of strings. More than one message wraps in an accordion.
     */
    messages: EuiNotificationEventMessagesProps['messages'];
    /**
     * Shows an indicator of the read state of the event. Leave as `undefined` to hide the indicator.
     */
    isRead?: boolean | undefined;
    /**
     * Returns the `id` and `isRead` state. Applies an `onClick` handler to the `read` indicator.
     */
    onRead?: (id: string, isRead: boolean) => void;
    /**
     * Provided the `id` of the event must return an array of #EuiContextMenuItem elements.
     */
    onOpenContextMenu?: (
      id: string
    ) => Array<
      ReactElement<EuiContextMenuItemProps, typeof EuiContextMenuItem>
    >;
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
  primaryActionProps,
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
    'data-test-subj': `${id}-notificationEventTitle`,
  };

  return (
    <article aria-labelledby={randomHeadingId} className={classes} key={id}>
      {typeof isRead === 'boolean' && (
        <div className="euiNotificationEvent__readButton">
          {!!onRead ? (
            <EuiNotificationEventReadButton
              isRead={isRead}
              onClick={() => onRead(id, isRead)}
              eventName={title}
              id={id}
            />
          ) : (
            <EuiNotificationEventReadIcon
              id={id}
              isRead={isRead}
              eventName={title}
            />
          )}
        </div>
      )}

      <div className="euiNotificationEvent__content">
        <EuiNotificationEventMeta
          id={id}
          type={type}
          severity={severity}
          badgeColor={badgeColor}
          iconType={iconType}
          iconAriaLabel={iconAriaLabel}
          time={time}
          onOpenContextMenu={
            onOpenContextMenu ? () => onOpenContextMenu(id) : undefined
          }
          eventName={title}
        />

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
              {...primaryActionProps}
              onClick={() => onClickPrimaryAction?.(id)}
              data-test-subj={`${id}-notificationEventPrimaryAction`}>
              {primaryAction}
            </EuiButtonEmpty>
          </div>
        )}
      </div>
    </article>
  );
};
