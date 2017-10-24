import React from 'react';
import classNames from 'classnames';

export const EuiPageHeader = ({ children, className, ...rest }) => {
  const classes = classNames('kuiPageHeader', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
