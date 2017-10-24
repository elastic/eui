import React from 'react';
import classNames from 'classnames';

export const EuiPageContentHeaderSection = ({ children, className, ...rest }) => {
  const classes = classNames('kuiPageContentHeaderSection', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
