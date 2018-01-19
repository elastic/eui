import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiPage = ({ children, className, ...rest }) => {
  const classes = classNames('euiPage', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiPage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
