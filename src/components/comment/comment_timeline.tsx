import React, { FunctionComponent, ReactNode } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { EuiIcon } from '../icon';

export type EuiCommentTimelineProps = CommonProps & {
  timelineIcon?: ReactNode;
};

export const EuiCommentTimeline: FunctionComponent<EuiCommentTimelineProps> = ({
  className,
  timelineIcon,
  ...rest
}) => {
  const classes = classNames('euiCommentTimeline', className);

  return (
    <div className={classes} {...rest}>
      <div className="euiCommentTimeline__content">
        {timelineIcon ? (
          timelineIcon
        ) : (
          <div className="euiCommentTimeline__contentDefault">
            <EuiIcon size="l" type="user" />
          </div>
        )}
      </div>
    </div>
  );
};
