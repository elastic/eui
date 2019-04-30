import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const LEVEL_COLORS = ['primary', 'success', 'warning', 'danger'];

export const EuiRangeWrapper = ({ children, className, fullWidth }) => {
  const classes = classNames(
    'euiRangeWrapper',
    {
      'euiRangeWrapper--fullWidth': fullWidth,
    },
    className
  );

  return <div className={classes}>{children}</div>;
};

EuiRangeWrapper.propTypes = {
  fullWidth: PropTypes.bool,
};
