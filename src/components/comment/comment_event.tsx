import React, { FunctionComponent, ReactNode } from 'react';
import { CommonProps, keysOf } from '../common';
import classNames from 'classnames';

export type EuiCommentEventProps = CommonProps &
  CommonProps & {
    body?: ReactNode;
    username?: ReactNode;
    timeStamp?: ReactNode;
    event?: ReactNode;
    responses?: ReactNode;
    actions?: ReactNode;
    /**
     * Use "update" when the comment is primarily showing info about actions that the user has performed (e.g. "user1 edited a case").
     */
    type?: EuiCommentType;
  };

const typeToClassNameMap = {
  regular: 'euiCommentEvent--regular',
  update: 'euiCommentEvent--update',
};

export const TYPES = keysOf(typeToClassNameMap);
export type EuiCommentType = keyof typeof typeToClassNameMap;

export const EuiCommentEvent: FunctionComponent<EuiCommentEventProps> = ({
  children,
  className,
  body,
  username,
  timeStamp,
  responses,
  type = 'regular',
  event,
  actions,
  ...rest
}) => {
  const classes = classNames(
    'euiCommentEvent',
    typeToClassNameMap[type],
    className
  );

  return (
    <div className={classes} {...rest}>
      <div className="euiCommentEvent__header">
        <div className="euiCommentEvent__headerData">
          {username} {event} {timeStamp}
        </div>
        <div className="euiCommentEvent__headerActions">{actions}</div>
      </div>
      <div className="euiCommentEvent__body">{children}</div>
    </div>
  );
};
