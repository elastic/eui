import React from 'react';
import classNames from 'classnames';

export const EuiPageHeader = ({ children, className, ...rest }) => {
  const classes = classNames('euiPageHeader', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
