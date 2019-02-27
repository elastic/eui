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
  const indeterminate = max === null;
  const classes = classNames(
    'euiProgress',
    {
      'euiProgress--indeterminate': indeterminate,
      'euiProgress--native': !indeterminate
    },
    sizeToClassNameMap[size],
    colorToClassNameMap[color],
    positionsToClassNameMap[position],
    className,
  );

  // Because of a Firefox animation issue, indeterminate progress needs to use a <div>.
  // See https://css-tricks.com/html5-progress-element/
  if (indeterminate) {
    return <div className={classes} {...rest} />;
  }

  return (
    <progress
      className={classes}
      value={value}
      max={max}
      {...rest}
    />
  );
};

EuiProgress.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  color: PropTypes.oneOf(COLORS),
  position: PropTypes.oneOf(POSITIONS),
  max: PropTypes.number,
  value: PropTypes.number,
};

EuiProgress.defaultProps = {
  value: null,
  max: null,
  size: 'm',
  color: 'secondary',
  position: 'static',
};
