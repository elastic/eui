import React from 'react';
import classNames from 'classnames';

export const EuiHeaderBreadcrumbs = ({ children, className, ...rest }) => {
  const classes = classNames('euiHeaderBreadcrumbs', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
