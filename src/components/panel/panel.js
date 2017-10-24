import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const paddingSizeToClassNameMap = {
  'none': null,
  's': 'kuiPanel--paddingSmall',
  'm': 'kuiPanel--paddingMedium',
  'l': 'kuiPanel--paddingLarge',
};

export const SIZES = Object.keys(paddingSizeToClassNameMap);

export const EuiPanel = ({
  children,
  className,
  paddingSize,
  hasShadow,
  grow,
  panelRef,
  ...rest,
}) => {

  const classes = classNames(
    'kuiPanel',
    paddingSizeToClassNameMap[paddingSize],
    {
      'kuiPanel--shadow': hasShadow,
      'kuiPanel--flexGrowZero': !grow,
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
};

EuiPanel.defaultProps = {
  paddingSize: 'm',
  hasShadow: false,
  grow: true,
};
