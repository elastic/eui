import React from 'react';
import classNames from 'classnames';

export const EuiPageHeaderSection = ({ children, className, ...rest }) => {
  const classes = classNames('euiPageHeaderSection', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
