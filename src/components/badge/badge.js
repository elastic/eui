import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { isColorDark, hexToRgb } from '../../services/color';
import { EuiKeyboardAccessible } from '../accessibility';

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

export const EuiBadge = ({
  children,
  color,
  iconType,
  iconSide,
  className,
  onClick,
  iconOnClick,
  ...rest
}) => {

  let optionalColorClass = null;
  let optionalCustomStyles = null;
  let textColor = null;

  if (COLORS.indexOf(color) > -1) {
    optionalColorClass = colorToClassNameMap[color];
  } else {

    if (isColorDark(...hexToRgb(color))) {
      textColor = '#FFFFFF';
    } else {
      textColor = '#000000';
    }

    optionalCustomStyles = { backgroundColor: color, color: textColor };
  }


  const classes = classNames(
    'euiBadge',
    iconSideToClassNameMap[iconSide],
    optionalColorClass,
    className
  );

  let optionalIcon = null;
  if (iconType) {
    if (iconOnClick) {
      optionalIcon = (
        <EuiKeyboardAccessible>
          <EuiIcon onClick={iconOnClick} type={iconType} size="s" className="euiBadge__icon" />
        </EuiKeyboardAccessible>
      );

    } else {
      optionalIcon = (
        <EuiIcon type={iconType} size="s" className="euiBadge__icon" />
      );
    }
  }

  if (onClick) {
    return (
      <button
        className={classes}
        style={optionalCustomStyles}
        onClick={onClick}
        {...rest}
      >
        <span className="euiBadge__content">
          {optionalIcon}
          <span>
            {children}
          </span>
        </span>
      </button>
    );
  } else {
    return (
      <span
        className={classes}
        style={optionalCustomStyles}
        {...rest}
      >
        <span className="euiBadge__content">
          {optionalIcon}
          <span>
            {children}
          </span>
        </span>
      </span>
    );
  }
};

EuiBadge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Accepts any string from our icon library
   */
  iconType: PropTypes.oneOf(ICON_TYPES),

  /**
   * The side of the badge the icon should sit
   */
  iconSide: PropTypes.string,
  /**
   * Will apply an onclick to icon within the badge
   */
  iconOnClick: PropTypes.func,

  /**
   * Will apply an onclick to the badge itself
   */
  onClick: PropTypes.func,

  /**
   * Accepts either our palette colors (primary, secondary ..etc) or a hex value `#FFFFFF`, `#000`.
   */
  color: PropTypes.string,
};

EuiBadge.defaultProps = {
  color: 'default',
  iconSide: 'left',
};
