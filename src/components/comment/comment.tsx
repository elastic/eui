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
  CommonProps & {
    // body?: ReactNode;
    // user?: ReactNode;
    // headerText?: ReactNode;
    // timeStamp?: ReactNode;
    // event?: ReactNode;
    // commentStyle?: 'regular' | 'update';
    // actions?: ReactNode;
  };

export const EuiComment: FunctionComponent<EuiCommentProps> = ({
  children,
  className,
  // body,
  username,
  event,
  actions,
  timelineIcon,
  type = 'regular',
  // headerText,
  timeStamp,
  ...rest
}) => {
  const classes = classNames(
    'euiComment',
    // { 'euiComment--hasBody': body },
    className
  );

  return (
    <div className={classes} {...rest}>
      <EuiCommentTimeline timelineIcon={timelineIcon} />
      <EuiCommentEvent
        username={username}
        actions={actions}
        event={event}
        timeStamp={timeStamp}
        type={type}>
        {children}
      </EuiCommentEvent>
    </div>
  );
};
