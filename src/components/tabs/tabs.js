import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const displayToClassNameMap = {
  condensed: 'euiTabs--condensed',
  default: null,
};

export const DISPLAYS = Object.keys(displayToClassNameMap);

const sizeToClassNameMap = {
  s: 'euiTabs--small',
  m: null,
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiTabs = ({
  children,
  className,
  display,
  expand,
  size,
  ...rest
}) => {
  const classes = classNames(
    'euiTabs',
    displayToClassNameMap[display],
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
  /**
   * Choose `default` or alternative `condensed` display styles
   */
  display: PropTypes.oneOf(DISPLAYS),
  /**
   * Evenly stretches each tab to fill the
   * horizontal space
   */
  expand: PropTypes.bool,
  size: PropTypes.oneOf(SIZES),
};

EuiTabs.defaultProps = {
  display: 'default',
  expand: false,
  size: 'm',
};
