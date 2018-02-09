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
  vis0: 'euiBadge--vis0',
  vis1: 'euiBadge--vis1',
  vis2: 'euiBadge--vis2',
  vis3: 'euiBadge--vis3',
  vis4: 'euiBadge--vis4',
  vis5: 'euiBadge--vis5',
  vis6: 'euiBadge--vis6',
  vis7: 'euiBadge--vis7',
  vis8: 'euiBadge--vis8',
  vis9: 'euiBadge--vis9',
};

export const COLORS = Object.keys(colorToClassNameMap);

const iconSideToClassNameMap = {
  left: '',
  right: 'euiBadge--iconRight',
};

export const ICON_SIDES = Object.keys(iconSideToClassNameMap);

export const EuiBadge = ({
  children,
  color,
  iconType,
  iconSide,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiBadge',
    colorToClassNameMap[color],
    iconSideToClassNameMap[iconSide],
    className
  );

  let optionalIcon = null;
  if (iconType) {
    optionalIcon = (
      <EuiIcon type={iconType} size="s" className="euiBadge__icon" />
    );
  }

  return (
    <div
      className={classes}
      {...rest}
    >
      <span className="euiBadge__content">
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
  color: PropTypes.string,
};

EuiBadge.defaultProps = {
  color: 'default',
  iconSide: 'left',
};
