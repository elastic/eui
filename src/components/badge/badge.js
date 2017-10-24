import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  ICON_TYPES,
  EuiIcon,
} from '../icon';

const typesToClassNameMap = {
  default: 'kuiBadge--default',
  primary: 'kuiBadge--primary',
  secondary: 'kuiBadge--secondary',
  accent: 'kuiBadge--accent',
  warning: 'kuiBadge--warning',
  danger: 'kuiBadge--danger',
};

export const TYPES = Object.keys(typesToClassNameMap);

const iconSideToClassNameMap = {
  left: '',
  right: 'kuiBadge--iconRight',
};

export const ICON_SIDES = Object.keys(iconSideToClassNameMap);

export const EuiBadge = ({ children, type, iconType, iconSide, className, ...rest }) => {
  const classes = classNames('kuiBadge', typesToClassNameMap[type], iconSideToClassNameMap[iconSide], className);

  let optionalIcon = null;
  if (iconType) {
    optionalIcon = (
      <EuiIcon type={iconType} size="medium" className="kuiBadge__icon" />
    );
  }

  return (
    <div
      className={classes}
      {...rest}
    >
      <span className="kuiBadge__content">
        {optionalIcon}
        <span>
          {children}
        </span>
      </span>
    </div>
  );
};

EuiBadge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconType: PropTypes.oneOf(ICON_TYPES),
  iconSide: PropTypes.string,
  type: PropTypes.string,
};

EuiBadge.defaultProps = {
  type: 'default',
  iconSide: 'left',
};
