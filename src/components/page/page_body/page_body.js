import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiPageBody = ({ children, className, ...rest }) => {
  const classes = classNames('euiPageBody', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiPageBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
