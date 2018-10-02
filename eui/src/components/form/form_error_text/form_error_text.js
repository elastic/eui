import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFormErrorText = ({ children, className, ...rest }) => {
  const classes = classNames('euiFormErrorText', className);

  return (
    <div
      className={classes}
      aria-live="polite"
      {...rest}
    >
      {children}
    </div>
  );
};

EuiFormErrorText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
