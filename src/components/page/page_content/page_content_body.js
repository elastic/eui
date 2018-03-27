import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiPageContentBody = ({ children, className, ...rest }) => {
  const classes = classNames('euiPageContentBody', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

EuiPageContentBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
