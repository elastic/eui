import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiSideNavGroup = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiSideNavGroup', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiSideNavGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
