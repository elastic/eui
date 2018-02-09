import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiPanel--paddingSmall',
  m: 'euiPanel--paddingMedium',
  l: 'euiPanel--paddingLarge',
};

export const SIZES = Object.keys(paddingSizeToClassNameMap);

export const EuiPanel = ({
  children,
  className,
  paddingSize,
  hasShadow,
  grow,
  panelRef,
  isHoverable,
  ...rest
}) => {

  const classes = classNames(
    'euiPanel',
    paddingSizeToClassNameMap[paddingSize],
    {
      'euiPanel--shadow': hasShadow,
      'euiPanel--flexGrowZero': !grow,
      'euiPanel--isHoverable': isHoverable,
    },
    className
  );

  return (
    <div
      ref={panelRef}
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );

};

EuiPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hasShadow: PropTypes.bool,
  paddingSize: PropTypes.oneOf(SIZES),
  grow: PropTypes.bool,
  panelRef: PropTypes.func,
  isHoverable: PropTypes.bool,
};

EuiPanel.defaultProps = {
  paddingSize: 'm',
  hasShadow: false,
  grow: true,
  isHoverable: false,
};
