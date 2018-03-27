import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const sizeToClassNameMap = {
  xs: 'euiSpacer--xs',
  s: 'euiSpacer--s',
  m: 'euiSpacer--m',
  l: 'euiSpacer--l',
  xl: 'euiSpacer--xl',
  xxl: 'euiSpacer--xxl',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiSpacer = ({
  className,
  size,
  ...rest
}) => {
  const classes = classNames(
    'euiSpacer',
    sizeToClassNameMap[size],
    className
  );

  return (
    <div
      className={classes}
      {...rest}
    />
  );
};

EuiSpacer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
};

EuiSpacer.defaultProps = {
  size: 'l',
};
