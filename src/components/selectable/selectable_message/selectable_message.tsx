import React, { HTMLAttributes, SFC } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

export type EuiSelectableMessageProps = HTMLAttributes<HTMLDivElement> & CommonProps & {

};

export const EuiSelectableMessage: React.SFC<EuiSelectableMessageProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiSelectableMessage', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
