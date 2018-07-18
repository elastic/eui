import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const sizeToClassNameMap = {
  s: 'euiTabs--small',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiTabs = ({
  size,
  expand,
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiTabs',
    sizeToClassNameMap[size],
    {
      'euiTabs--expand': expand,
    },
    className
  );

  return (
    <div
      role="tablist"
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiTabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  expand: PropTypes.bool,
};
