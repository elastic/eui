import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import checkHrefAndOnClick from '../../services/prop_types/check_href_and_onclick';

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
  s: 'euiButton--small',
  l: 'euiButton--large',
};

export const SIZES = Object.keys(sizeToClassNameMap);

const iconSideToClassNameMap = {
  left: null,
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
  href,
  onClick,
  ...rest
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
        size="m"
        aria-hidden="true"
      />
    );
  }

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        {...rest}
      >
        <span className="euiButton__content">
          {buttonIcon}
          <span>{children}</span>
        </span>
      </a>
    );
  } else {
    return (
      <button
        disabled={isDisabled}
        className={classes}
        onClick={onClick}
        {...rest}
      >
        <span className="euiButton__content">
          {buttonIcon}
          <span>{children}</span>
        </span>
      </button>
    );
  }
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
  href: checkHrefAndOnClick,
  onClick: PropTypes.func,
};

EuiButton.defaultProps = {
  type: 'button',
  iconSide: 'left',
  color: 'primary',
  fill: false,
};
