import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiTabs = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiTabs', className);

  return (
    <div
      role="tablist"
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiTabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
