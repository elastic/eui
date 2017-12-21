import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export function EuiOverlayMask({ className,  ...rest }) {
  const classes = classnames('euiOverlayMask', className);
  return (
    <div
      className={classes}
      {...rest}
    />
  );
}

EuiOverlayMask.propTypes = {
  className: PropTypes.string,
};
