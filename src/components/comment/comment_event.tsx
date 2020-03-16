import React, { FunctionComponent, ReactNode } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

export type EuiCommentEventProps = CommonProps &
  CommonProps & {
    body?: ReactNode;
    user?: ReactNode;
    timeStamp?: ReactNode;
    event?: ReactNode;
    actions?: ReactNode;
    commentStyle?: 'regular' | 'update';
  };

const commentStyleToClassMap: { [commentStyle: string]: string | null } = {
  regular: 'euiCommentEvent--regular',
  update: 'euiCommentEvent--update',
};

export const EuiCommentEvent: FunctionComponent<EuiCommentEventProps> = ({
  children,
  className,
  body,
  user,
  timeStamp,
  commentStyle = 'regular',
  event,
  actions,
  ...rest
}) => {
  const classes = classNames(
    'euiCommentEvent',
    // { 'euiComment--hasBody': body },
    commentStyleToClassMap[commentStyle],
    className
  );

  return (
    <div className={classes} {...rest}>
      <div className="euiCommentEvent__header">
        <div className="euiCommentEvent__headerUser">{user}</div>
        {event}
        <div className="euiCommentEvent__headerTimeStamp">{timeStamp}</div>
        {actions}
      </div>
      <div className="euiCommentEvent__body">{children}</div>
    </div>
  );
};
