import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiPropTypes } from '../../utils';

import { isColorDark, hexToRgb } from '../../services/color';

import { IconPropType, EuiIcon } from '../icon';

const colorToClassNameMap = {
  default: 'euiBadge--default',
  primary: 'euiBadge--primary',
  secondary: 'euiBadge--secondary',
  accent: 'euiBadge--accent',
  warning: 'euiBadge--warning',
  danger: 'euiBadge--danger',
  hollow: 'euiBadge--hollow',
};

export const COLORS = Object.keys(colorToClassNameMap);

const iconSideToClassNameMap = {
  left: 'euiBadge--iconLeft',
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
  onClickAriaLabel,
  iconOnClickAriaLabel,
  closeButtonProps,
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
    {
      'euiBadge-isClickable': onClick && !iconOnClick,
    },
    iconSideToClassNameMap[iconSide],
    optionalColorClass,
    className
  );

  const closeClassNames = classNames(
    'euiBadge__icon',
    closeButtonProps && closeButtonProps.className
  );

  let optionalIcon = null;
  if (iconType) {
    if (iconOnClick) {
      optionalIcon = (
        <button
          className="euiBadge__iconButton"
          aria-label={iconOnClickAriaLabel}
          onClick={iconOnClick}>
          <EuiIcon
            type={iconType}
            size="s"
            {...closeButtonProps}
            className={closeClassNames}
          />
        </button>
      );
    } else {
      optionalIcon = (
        <EuiIcon type={iconType} size="s" className="euiBadge__icon" />
      );
    }
  }

  if (onClick && iconOnClick) {
    return (
      <span className={classes} style={optionalCustomStyles}>
        <span className="euiBadge__content">
          <button
            className="euiBadge__childButton"
            aria-label={onClickAriaLabel}
            onClick={onClick}
            {...rest}>
            {children}
          </button>
          {optionalIcon}
        </span>
      </span>
    );
  } else if (onClick) {
    return (
      <button
        aria-label={onClickAriaLabel}
        className={classes}
        onClick={onClick}
        style={optionalCustomStyles}
        {...rest}>
        <span className="euiBadge__content">
          <span>{children}</span>
          {optionalIcon}
        </span>
      </button>
    );
  } else {
    return (
      <span className={classes} style={optionalCustomStyles} {...rest}>
        <span className="euiBadge__content">
          <span className="euiBadge__text">{children}</span>
          {optionalIcon}
        </span>
      </span>
    );
  }
};

function checkValidColor(props, propName, componentName) {
  const validHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(props.color);
  if (props.color != null && !validHex && !COLORS.includes(props.color)) {
    throw new Error(
      `${componentName} needs to pass a valid color. This can either be a three ` +
        `or six character hex value or one of the following: ${COLORS}`
    );
  }
}

EuiBadge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Accepts any string from our icon library
   */
  iconType: IconPropType,

  /**
   * The side of the badge the icon should sit
   */
  iconSide: PropTypes.string,
  /**
   * Will apply an onclick to icon within the badge
   */
  iconOnClick: EuiPropTypes.withRequiredProp(
    PropTypes.func,
    'iconOnClickAriaLabel',
    'Please provide an aria label to complement your iconOnClick'
  ),

  /**
   * Aria label applied to the iconOnClick button
   */
  iconOnClickAriaLabel: PropTypes.string,

  /**
   * Will apply an onclick to the badge itself
   */
  onClick: EuiPropTypes.withRequiredProp(
    PropTypes.func,
    'onClickAriaLabel',
    'Please provide an aria label to complement your onClick'
  ),

  /**
   * Aria label applied to the onClick button
   */
  onClickAriaLabel: PropTypes.string,

  /**
   * Accepts either our palette colors (primary, secondary ..etc) or a hex value `#FFFFFF`, `#000`.
   */
  color: checkValidColor,

  /**
   * Props passed to the close button.
   */
  closeButtonProps: PropTypes.object,
};

EuiBadge.defaultProps = {
  color: 'default',
  iconSide: 'left',
};
