import React from 'react';
import classNames from 'classnames';

export const EuiPageBody = ({ children, className, ...rest }) => {
  const classes = classNames('kuiPageBody', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
