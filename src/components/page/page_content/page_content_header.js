import React from 'react';
import classNames from 'classnames';

export const EuiPageContentHeader = ({ children, className, ...rest }) => {
  const classes = classNames('euiPageContentHeader', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
