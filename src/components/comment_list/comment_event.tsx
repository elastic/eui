/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import { CommonProps, keysOf } from '../common';
import classNames from 'classnames';
import { EuiIcon, IconType } from '../icon';
import { EuiPanel, EuiPanelProps } from '../panel';

export interface EuiCommentEventProps extends CommonProps {
  /**
   * Author of the comment. When no `timelineIcon` is passed the username initial letter is used to generate an avatar.
   */
  username: string;
  /**
   * Time of occurrence of the event. Its format is set on the consumer's side
   */
  timestamp?: ReactNode;
  /**
   * Describes the event that took place
   */
  event?: ReactNode;
  /**
   * Custom actions that the user can perform from the comment's header
   */
  actions?: ReactNode;
  /**
   * Use `update` when the comment is primarily showing info about actions that the user or the system has performed (e.g. "user1 edited a case").
   * Use `custom` when passing a children that doesn't require the event header. Elements like `username`, `timestamp`, `event` and `actions` won't show.
   */
  type?: EuiCommentType;
  /**
   * Custom icon that shows before the username only when the `type` is `"update"`.
   */
  updateIcon?: IconType;
  /**
   * Background color for the event header only when the `type` is `"update"`.
   * When a color is used it adds a padding.
   */
  updateColor?: EuiPanelProps['color'];
}

const typeToClassNameMap = {
  regular: 'euiCommentEvent--regular',
  update: 'euiCommentEvent--update',
  custom: 'euiCommentEvent--custom',
};

export const TYPES = keysOf(typeToClassNameMap);
export type EuiCommentType = keyof typeof typeToClassNameMap;

export const EuiCommentEvent: FunctionComponent<EuiCommentEventProps> = ({
  children,
  className,
  username,
  timestamp,
  type = 'regular',
  event,
  actions,
  updateIcon,
  updateColor,
}) => {
  const classes = classNames(
    'euiCommentEvent',
    typeToClassNameMap[type],
    className
  );

  const isFigure =
    type === 'regular' ||
    (type === 'update' && typeof children !== 'undefined');

  const Element = isFigure ? 'figure' : 'div';
  const HeaderElement = isFigure ? 'figcaption' : 'div';
  const isTypeUpdate = type === 'update';
  const isTypeCustom = type === 'custom';

  const headerElements = (
    <>
      <div className="euiCommentEvent__headerData">
        <div className="euiCommentEvent__headerUsername">{username}</div>
        <div className="euiCommentEvent__headerEvent">{event}</div>
        {timestamp ? (
          <div className="euiCommentEvent__headerTimestamp">
            <time>{timestamp}</time>
          </div>
        ) : undefined}
      </div>
      {actions ? (
        <div className="euiCommentEvent__headerActions">{actions}</div>
      ) : undefined}
    </>
  );

  const panelProps = updateColor
    ? { color: updateColor, paddingSize: 's' }
    : { color: 'transparent', paddingSize: 'none' };

  const updateEventHeader = !isTypeCustom && (
    <EuiPanel {...(panelProps as EuiPanelProps)}>
      <HeaderElement className="euiCommentEvent__header">
        {updateIcon && (
          <span className="euiCommentEvent__headerIconUpdate">
            <EuiIcon size="s" type={updateIcon} />
          </span>
        )}
        {headerElements}
      </HeaderElement>
    </EuiPanel>
  );

  // when the type of event is `custom` we don't want to show the header
  // or any elements like `username`, `event`, `timestamp` or `actions`
  const commentEventHeader = !isTypeCustom && (
    <HeaderElement className="euiCommentEvent__header">
      {headerElements}
    </HeaderElement>
  );

  return (
    <Element className={classes}>
      {isTypeUpdate ? updateEventHeader : commentEventHeader}
      {children ? (
        <div className="euiCommentEvent__body">{children}</div>
      ) : undefined}
    </Element>
  );
};
