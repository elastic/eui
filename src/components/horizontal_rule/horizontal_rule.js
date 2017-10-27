import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const sizeToClassNameMap = {
  full: 'euiHorizontalRule--full',
  half: 'euiHorizontalRule--half',
  quarter: 'euiHorizontalRule--quarter',
};

export const SIZES = Object.keys(sizeToClassNameMap);

const marginToClassNameMap = {
  small: 'euiHorizontalRule--marginSmall',
  medium: 'euiHorizontalRule--marginMedium',
  large: 'euiHorizontalRule--marginLarge',
  XLarge: 'euiHorizontalRule--marginXLarge',
  XXLarge: 'euiHorizontalRule--marginXXLarge',
};

export const MARGINS = Object.keys(marginToClassNameMap);

export const EuiHorizontalRule = ({
  className,
  size,
  margin,
  ...rest
}) => {
  const classes = classNames(
    'euiHorizontalRule',
    sizeToClassNameMap[size],
    marginToClassNameMap[margin],
    className
  );

  return (
    <hr
      className={classes}
      {...rest}
    />
  );
};

EuiHorizontalRule.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  margin: PropTypes.oneOf(MARGINS),
};

EuiHorizontalRule.defaultProps = {
  size: 'full',
  margin: 'large',
};
