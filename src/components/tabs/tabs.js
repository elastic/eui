import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const sizeToClassNameMap = {
  s: 'euiTabs--small',
  m: null,
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiTabs = ({ size, expand, children, className, ...rest }) => {
  const classes = classNames(
    'euiTabs',
    sizeToClassNameMap[size],
    {
      'euiTabs--expand': expand,
    },
    className
  );

  return (
    <div role="tablist" className={classes} {...rest}>
      {children}
    </div>
  );
};

EuiTabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  /**
   * Evenly stretches each tab to fill the
   * horizontal space
   */
  expand: PropTypes.bool,
};

EuiTabs.defaultProps = {
  size: 'm',
  expand: false,
};
