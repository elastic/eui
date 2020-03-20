import React, { FunctionComponent, ReactNode } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { EuiIcon } from '../icon';

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
      <div className="euiCommentTimeline__content">
        {timelineIcon ? (
          timelineIcon
        ) : (
          <EuiIcon color="subdued" size="xl" type="tag" />
        )}
      </div>
    </div>
  );
};
