import React, { FunctionComponent, ReactNode } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

export type EuiCommentTimelineProps = CommonProps & {
  timelineIcon?: ReactNode;
};

export const EuiCommentTimeline: FunctionComponent<EuiCommentTimelineProps> = ({
  // children,
  className,
  timelineIcon,
  ...rest
}) => {
  const classes = classNames(
    'euiCommentTimeline',
    // { 'euiComment--hasBody': body },
    className
  );

  return (
    <div className={classes} {...rest}>
      {timelineIcon}
    </div>
  );
};
