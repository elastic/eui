import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const sizeToClassNameMap = {
  medium: 'kuiLoadingChart--medium',
  large: 'kuiLoadingChart--large',
  xLarge: 'kuiLoadingChart--xLarge',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiLoadingChart = ({ size, mono, className, ...rest }) => {
  const classes = classNames(
    'kuiLoadingChart',
    mono === true ? 'kuiLoadingChart--mono' : '',
    className,
    sizeToClassNameMap[size],
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      <div className="kuiLoadingChart__bar" />
      <div className="kuiLoadingChart__bar" />
      <div className="kuiLoadingChart__bar" />
      <div className="kuiLoadingChart__bar" />
    </div>
  );
};

EuiLoadingChart.propTypes = {
  size: PropTypes.oneOf(SIZES),
};

