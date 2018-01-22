import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const sizeToClassNameMap = {
  m: 'euiLoadingChart--medium',
  l: 'euiLoadingChart--large',
  xl: 'euiLoadingChart--xLarge',
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
  mono: PropTypes.bool,
  size: PropTypes.oneOf(SIZES)
};

EuiLoadingChart.defaultProps = {
  mono: false
};
