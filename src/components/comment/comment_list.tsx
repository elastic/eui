import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

export type EuiCommentListProps = HTMLAttributes<HTMLDivElement> & CommonProps & {

};

export const EuiCommentList: FunctionComponent<EuiCommentListProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiCommentList', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
