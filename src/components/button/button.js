import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import {
  ICON_TYPES,
  EuiIcon,
} from '../icon';

const typeToClassNameMap = {
  primary: 'euiButton--primary',
  secondary: 'euiButton--secondary',
  warning: 'euiButton--warning',
  danger: 'euiButton--danger',
  ghost: 'euiButton--ghost',
};

export const TYPES = Object.keys(typeToClassNameMap);

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
  type,
  size,
  fill,
  isDisabled,
  ...rest,
}) => {

  const classes = classNames(
    'euiButton',
    typeToClassNameMap[type],
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
  type: PropTypes.oneOf(TYPES),
  size: PropTypes.oneOf(SIZES),
  isDisabled: PropTypes.bool,
};

EuiButton.defaultProps = {
  iconSide: 'left',
  type: 'primary',
  fill: false,
};
