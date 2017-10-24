import React from 'react';
import classNames from 'classnames';

export const EuiPage = ({ children, className, ...rest }) => {
  const classes = classNames('euiPage', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
