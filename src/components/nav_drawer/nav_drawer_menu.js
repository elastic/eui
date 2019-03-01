import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiNavDrawerMenu = ({ children, className, ...rest }) => {
  const classes = classNames(
    'euiNavDrawerMenu',
    className
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiNavDrawerMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};