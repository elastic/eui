import React from 'react';
import classNames from 'classnames';

export const EuiPageSideBar = ({ children, className, ...rest }) => {
  const classes = classNames('euiPageSideBar', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
