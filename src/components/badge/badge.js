import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  ICON_TYPES,
  EuiIcon,
} from '../icon';

const colorToClassNameMap = {
  default: 'euiBadge--default',
  primary: 'euiBadge--primary',
  secondary: 'euiBadge--secondary',
  accent: 'euiBadge--accent',
  warning: 'euiBadge--warning',
  danger: 'euiBadge--danger',
};

export const COLORS = Object.keys(colorToClassNameMap);

const iconSideToClassNameMap = {
  left: '',
  right: 'euiBadge--iconRight',
};

export const ICON_SIDES = Object.keys(iconSideToClassNameMap);

export const EuiBadge = ({ children, color, iconType, iconSide, className, ...rest }) => {
  const classes = classNames(
    'euiBadge',
    {
      'euiBadge--padded': children,
    },
    colorToClassNameMap[color],
    iconSideToClassNameMap[iconSide],
    className
  );

  let optionalIcon;
  if (iconType) {
    optionalIcon = (
      <EuiIcon type={iconType} size="m" className="euiBadge__icon" />
    );
  }

  {/* The extra span applies margin */}
  let optionalChildren;
  if (children) {
    optionalChildren = (
      <span>
        {children}
      </span>
    );

  }

  return (
    <div
      className={classes}
      {...rest}
    >
      <span className="euiBadge__content">
        {optionalIcon}
        {optionalChildren}
      </span>
    </div>
  );
};

EuiBadge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconType: PropTypes.oneOf(ICON_TYPES),
  iconSide: PropTypes.string,
  color: PropTypes.string,
};

EuiBadge.defaultProps = {
  color: 'default',
  iconSide: 'left',
};
