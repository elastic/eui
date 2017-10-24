import React from 'react';
import classNames from 'classnames';

export const EuiHeader = ({ children, className, ...rest }) => {
  const classes = classNames('kuiHeader', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
