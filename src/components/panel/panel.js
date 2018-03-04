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
  onClick,
  ...rest
}) => {

  const classes = classNames(
    'euiPanel',
    paddingSizeToClassNameMap[paddingSize],
    {
      'euiPanel--shadow': hasShadow,
      'euiPanel--flexGrowZero': !grow,
      'euiPanel--isClickable': onClick,
    },
    className
  );

  const PanelTag = onClick ? 'button' : 'div';

  const props = {
    ref: panelRef,
    className: classes
  }

  // Avoid passing down this props if is hasn't been supplied, in order to
  // avoid noise in snapshots.
  if (onClick != null) {
    props.onClick = onClick
  }

  return (
    <PanelTag {...props} {...rest}>
      {children}
    </PanelTag>
  );

};

EuiPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hasShadow: PropTypes.bool,
  paddingSize: PropTypes.oneOf(SIZES),
  grow: PropTypes.bool,
  panelRef: PropTypes.func,
  onClick: PropTypes.func,
};

EuiPanel.defaultProps = {
  paddingSize: 'm',
  hasShadow: false,
  grow: true,
};
