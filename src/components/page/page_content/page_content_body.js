import React from 'react';
import classNames from 'classnames';

export const EuiPageContentBody = ({ children, className, ...rest }) => {
  const classes = classNames('kuiPageContentBody', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
