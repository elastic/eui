import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const sizeToClassNameMap = {
  medium: 'euiLoadingChart--medium',
  large: 'euiLoadingChart--large',
  xLarge: 'euiLoadingChart--xLarge',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiLoadingChart = ({ size, mono, className, ...rest }) => {
  const classes = classNames(
    'euiLoadingChart',
    mono === true ? 'euiLoadingChart--mono' : '',
    className,
    sizeToClassNameMap[size],
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      <div className="euiLoadingChart__bar" />
      <div className="euiLoadingChart__bar" />
      <div className="euiLoadingChart__bar" />
      <div className="euiLoadingChart__bar" />
    </div>
  );
};

EuiLoadingChart.propTypes = {
  size: PropTypes.oneOf(SIZES),
};

