import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { EuiComment, EuiCommentProps } from './comment';

export type EuiCommentListProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * List of comments to render.
     */
    comments?: EuiCommentProps[];
  };

export const EuiCommentList: FunctionComponent<EuiCommentListProps> = ({
  children,
  className,
  comments,
  ...rest
}) => {
  const classes = classNames('euiCommentList', className);

  let childrenOrComments = null;

  if (comments) {
    childrenOrComments = comments.map((item: EuiCommentProps, index) => (
      <EuiComment
        event={item.event}
        timestamp={item.timestamp}
        timelineIcon={item.timelineIcon}
        key={index}
        children={item.children}
        username={item.username}
        type={item.type}
        actions={item.actions}
      />
    ));
  } else {
    childrenOrComments = children;
  }

  return (
    <div className={classes} {...rest}>
      {childrenOrComments}
    </div>
  );
};
