import React from 'react';
import classNames from 'classnames';

export const EuiKeyPadMenu = ({ children, className, ...rest }) => {
  const classes = classNames('euiKeyPadMenu', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
