import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFormLabel = ({ children, isFocused, isInvalid, className, ...rest }) => {
  const classes = classNames('euiFormLabel', className, {
    'euiFormLabel-isFocused': isFocused,
    'euiFormLabel-isInvalid': isInvalid,
  });

  return (
    <label
      className={classes}
      {...rest}
    >
      {children}
    </label>
  );
};

EuiFormLabel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isFocused: PropTypes.bool,
  isInvalid: PropTypes.bool,
};
