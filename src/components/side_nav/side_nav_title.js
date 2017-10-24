import React from 'react';
import classNames from 'classnames';

import {
  EuiTitle,
} from '..';

export const EuiSideNavTitle = ({ children, className, ...rest }) => {
  const classes = classNames('kuiSideNavTitle', className);

  return (
    <EuiTitle
      size="small"
      className={classes}
      {...rest}
    >
      <p>{children}</p>
    </EuiTitle>
  );
};

EuiSideNavTitle.propTypes = {
};
