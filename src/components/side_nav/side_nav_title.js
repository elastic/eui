import React from 'react';
import classNames from 'classnames';

export const EuiSideNavTitle = ({ children, className, ...rest }) => {
  const classes = classNames('euiSideNavTitle', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiSideNavTitle.propTypes = {
};
