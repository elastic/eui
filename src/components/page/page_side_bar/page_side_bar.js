import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiPageSideBar = ({ children, className, ...rest }) => {
  const classes = classNames('euiPageSideBar', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

EuiPageSideBar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
