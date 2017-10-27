import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const sizeToClassNameMap = {
  xs: 'euiProgress--xs',
  s: 'euiProgress--s',
  m: 'euiProgress--m',
  l: 'euiProgress--l',
};

export const SIZES = Object.keys(sizeToClassNameMap);

const colorToClassNameMap = {
  primary: 'euiProgress--primary',
  secondary: 'euiProgress--secondary',
  danger: 'euiProgress--danger',
  subdued: 'euiProgress--subdued',
  accent: 'euiProgress--accent',
};

export const COLORS = Object.keys(colorToClassNameMap);

const positionsToClassNameMap = {
  fixed: 'euiProgress--fixed',
  absolute: 'euiProgress--absolute',
  static: '',
};

export const POSITIONS = Object.keys(positionsToClassNameMap);

export const EuiProgress = ({
  className,
  color,
  value,
  max,
  size,
  position,
  ...rest
}) => {
  const classes = classNames(
    'euiProgress',
    {
      'euiProgress--indeterminate': max === null,
    },
    sizeToClassNameMap[size],
    colorToClassNameMap[color],
    positionsToClassNameMap[position],
    className
  );

  // Because of a FireFox issue with animation, indeterminate progress needs to use a div.
  // See https://css-tricks.com/html5-progress-element/.
  let progressType = null;
  if (max) {
    progressType = (
      <progress
        value={value}
        max={max}
        className={classes}
        {...rest}
      />
    );
  } else {
    progressType = (
      <div
        className={classes}
        {...rest}
      />
    );
  }

  return (
    <div>{progressType}</div>
  );
};

EuiProgress.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  color: PropTypes.oneOf(COLORS),
  position: PropTypes.oneOf(POSITIONS),
  max: PropTypes.number,
  indeterminate: PropTypes.bool,
};

EuiProgress.defaultProps = {
  max: null,
  size: 'm',
  color: 'secondary',
  position: 'static',
};
