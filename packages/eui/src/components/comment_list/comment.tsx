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
    EuiCommentTimelineProps,
    Omit<EuiTimelineItemProps, 'children' | 'icon' | 'iconAriaLabel'> {}

export const EuiComment: FunctionComponent<EuiCommentProps> = ({
  children,
  className,
  username,
  event,
  actions,
  timestamp,
  timelineAvatar,
  timelineAvatarAriaLabel,
  eventColor,
  eventIcon,
  eventIconAriaLabel,
  ...rest
}) => {
  const classes = classNames('euiComment', className);

  const isTypeUpdate = !children;
  const verticalAlign = isTypeUpdate ? 'center' : 'top';

  const mainIcon = (
    <EuiCommentTimeline
      timelineAvatar={timelineAvatar}
      timelineAvatarAriaLabel={timelineAvatarAriaLabel}
    />
  );

  return (
    <EuiTimelineItem
      verticalAlign={verticalAlign}
      className={classes}
      icon={mainIcon}
      {...rest}
    >
      <EuiCommentEvent
        username={username}
        actions={actions}
        event={event}
        timestamp={timestamp}
        eventColor={eventColor}
        eventIcon={eventIcon}
        eventIconAriaLabel={eventIconAriaLabel}
      >
        {children}
      </EuiCommentEvent>
    </EuiTimelineItem>
  );
};
