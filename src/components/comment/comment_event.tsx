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
    type?: EuiCommentType;
  };

// const commentStyleToClassMap: { [commentStyle: string]: string | null } = {
//   regular: 'euiCommentEvent--regular',
//   update: 'euiCommentEvent--update',
// };
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
    // { 'euiComment--hasBody': body },
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
