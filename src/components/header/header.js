import React from 'react';
import classNames from 'classnames';

export const EuiHeader = ({ children, className, ...rest }) => {
  const classes = classNames('euiHeader', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
