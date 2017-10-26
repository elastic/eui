import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import {
  ICON_TYPES,
  EuiIcon,
} from '../icon';

const colorToClassNameMap = {
  primary: 'euiButton--primary',
  secondary: 'euiButton--secondary',
  warning: 'euiButton--warning',
  danger: 'euiButton--danger',
  ghost: 'euiButton--ghost',
};

export const COLORS = Object.keys(colorToClassNameMap);

const sizeToClassNameMap = {
  small: 'euiButton--small',
  large: 'euiButton--large',
};

export const SIZES = Object.keys(sizeToClassNameMap);

const iconSideToClassNameMap = {
  left: '',
  right: 'euiButton--iconRight',
};

export const ICON_SIDES = Object.keys(iconSideToClassNameMap);

export const EuiButton = ({
  children,
  className,
  iconType,
  iconSide,
  color,
  size,
  fill,
  isDisabled,
  ...rest,
}) => {

  const classes = classNames(
    'euiButton',
    colorToClassNameMap[color],
    sizeToClassNameMap[size],
    iconSideToClassNameMap[iconSide],
    className,
    {
      'euiButton--fill': fill,
    },
  );

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="euiButton__icon"
        type={iconType}
        size="medium"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      disabled={isDisabled}
      className={classes}
      {...rest}
    >
      <span className="euiButton__content">
        {buttonIcon}
        <span>{children}</span>
      </span>
    </button>
  );
};

EuiButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconType: PropTypes.oneOf(ICON_TYPES),
  iconSide: PropTypes.oneOf(ICON_SIDES),
  fill: PropTypes.bool,
  color: PropTypes.oneOf(COLORS),
  size: PropTypes.oneOf(SIZES),
  isDisabled: PropTypes.bool,
};

EuiButton.defaultProps = {
  type: 'button',
  iconSide: 'left',
  color: 'primary',
  fill: false,
};
