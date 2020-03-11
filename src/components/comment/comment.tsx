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
  user,
  event,
  actions,
  timelineIcon,
  commentStyle = 'regular',
  // headerText,
  timeStamp,
  ...rest
}) => {
  const classes = classNames(
    'euiComment',
    // { 'euiComment--hasBody': body },
    className
  );

  const headerClasses = classNames('euiComment__panelHeader', {
    // 'euiComment__panelHeader--hasBody': body,
  });

  return (
    <div className={classes} {...rest}>
      <EuiCommentTimeline timelineIcon={timelineIcon} />
      <EuiCommentEvent
        user={user}
        actions={actions}
        event={event}
        timeStamp={timeStamp}
        commentStyle={commentStyle}>
        {children}
      </EuiCommentEvent>
    </div>
  );
};
