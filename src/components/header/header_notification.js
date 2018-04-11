import React from 'react';
import classNames from 'classnames';

export const EuiHeaderNotification = ({ children, className, ...rest }) => {
  const classes = classNames('euiHeaderNotification', className);

  return (
    <span
      className={classes}
      {...rest}
    >
      {children}
    </span>
  );
};
