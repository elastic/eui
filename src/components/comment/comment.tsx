import React, { FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

import { EuiCommentEvent, EuiCommentEventProps } from './comment_event';
import {
  EuiCommentTimeline,
  EuiCommentTimelineProps,
} from './comment_timeline';

export type EuiCommentProps = EuiCommentEventProps &
  EuiCommentTimelineProps &
  CommonProps & {};

export const EuiComment: FunctionComponent<EuiCommentProps> = ({
  children,
  className,
  username,
  event,
  actions,
  timelineIcon,
  type = 'regular',
  timestamp,
  ...rest
}) => {
  const classes = classNames('euiComment', className);

  return (
    <div className={classes} {...rest}>
      <EuiCommentTimeline timelineIcon={timelineIcon} />
      <EuiCommentEvent
        username={username}
        actions={actions}
        event={event}
        timestamp={timestamp}
        type={type}>
        {children}
      </EuiCommentEvent>
    </div>
  );
};
