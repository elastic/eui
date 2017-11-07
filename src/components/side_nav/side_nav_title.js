import React from 'react';
import classNames from 'classnames';

import {
  EuiTitle,
} from '..';

export const EuiSideNavTitle = ({ children, className, ...rest }) => {
  const classes = classNames('euiSideNavTitle', className);

  return (
    <EuiTitle
      size="s"
      className={classes}
      {...rest}
    >
      <div>{children}</div>
    </EuiTitle>
  );
};

EuiSideNavTitle.propTypes = {
};
