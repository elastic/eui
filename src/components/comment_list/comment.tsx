/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { EuiTimelineItem, EuiTimelineItemProps } from '../timeline';
import { EuiCommentEvent, EuiCommentEventProps } from './comment_event';
import {
  EuiCommentTimeline,
  EuiCommentTimelineProps,
} from './comment_timeline';

export interface EuiCommentProps
  extends EuiCommentEventProps,
    EuiCommentTimelineProps {
  /**
   * Sets the HTML element for `EuiComment`.
   * By default, the element renders as a `<li/>`.
   * Only change the HTML element when it is not wrapped in a `EuiCommentList` that renders as a `<ol/>`.
   */
  component?: EuiTimelineItemProps['component'];
}

export const EuiComment: FunctionComponent<EuiCommentProps> = ({
  children,
  className,
  username,
  event,
  actions,
  type = 'regular',
  timestamp,
  component = 'li',
  timelineAvatarName,
  timelineAvatarIconType,
  timelineAvatarProps,
  updateIcon,
  updateIconAriaLabel,
  updateMessage,
  ...rest
}) => {
  const classes = classNames('euiComment', className);

  const hasEventElements = username || updateIcon || username || actions;
  const isTypeUpdate = !children && hasEventElements;
  const verticalAlign = isTypeUpdate ? 'center' : 'top';

  return (
    <EuiTimelineItem
      verticalAlign={verticalAlign}
      className={classes}
      component={component}
      icon={
        <EuiCommentTimeline
          timelineAvatarName={timelineAvatarName}
          timelineAvatarIconType={timelineAvatarIconType}
          timelineAvatarProps={timelineAvatarProps}
        />
      }
      {...rest}
    >
      <EuiCommentEvent
        username={username}
        actions={actions}
        event={event}
        timestamp={timestamp}
        type={type}
        updateIcon={updateIcon}
        updateIconAriaLabel={updateIconAriaLabel}
        updateMessage={updateMessage}
      >
        {children}
      </EuiCommentEvent>
    </EuiTimelineItem>
  );
};
