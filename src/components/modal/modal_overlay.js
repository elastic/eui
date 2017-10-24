import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export function EuiModalOverlay({ className,  ...rest }) {
  const classes = classnames('euiModalOverlay', className);
  return (
    <div
      className={classes}
      {...rest}
    />
  );
}

EuiModalOverlay.propTypes = {
  className: PropTypes.string,
};
