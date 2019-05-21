import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiKeyPadMenu = ({ children, className, ...rest }) => {
  const classes = classNames('euiKeyPadMenu', className);

  return (
    <div className={classes} role="menu" {...rest}>
      {children}
    </div>
  );
};

EuiKeyPadMenu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
