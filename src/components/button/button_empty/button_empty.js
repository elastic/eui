import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  ICON_TYPES,
  EuiIcon,
} from '../../icon';

const typeToClassNameMap = {
  primary: 'euiButtonEmpty--primary',
  danger: 'euiButtonEmpty--danger',
  disabled: 'euiButtonEmpty--disabled',
  text: 'euiButtonEmpty--text',
  ghost: 'euiButtonEmpty--ghost',
};

export const TYPES = Object.keys(typeToClassNameMap);

const sizeToClassNameMap = {
  small: 'euiButtonEmpty--small',
  large: 'euiButtonEmpty--large',
};

export const SIZES = Object.keys(sizeToClassNameMap);

const iconSideToClassNameMap = {
  left: '',
  right: 'euiButtonEmpty--iconRight',
};

export const ICON_SIDES = Object.keys(iconSideToClassNameMap);

const flushTypeToClassNameMap = {
  'left': 'euiButtonEmpty--flushLeft',
  'right': 'euiButtonEmpty--flushRight',
};

export const FLUSH_TYPES = Object.keys(flushTypeToClassNameMap);

export const EuiButtonEmpty = ({
  children,
  className,
  iconType,
  iconSide,
  type,
  size,
  flush,
  isDisabled,
  ...rest,
}) => {

  const classes = classNames(
    'euiButtonEmpty',
    typeToClassNameMap[type],
    sizeToClassNameMap[size],
    iconSideToClassNameMap[iconSide],
    flushTypeToClassNameMap[flush],
    className,
  );

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="euiButtonEmpty__icon"
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
      <span className="euiButtonEmpty__content">
        {buttonIcon}
        <span>{children}</span>
      </span>
    </button>
  );
};

EuiButtonEmpty.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconType: PropTypes.oneOf(ICON_TYPES),
  iconSide: PropTypes.oneOf(ICON_SIDES),
  type: PropTypes.oneOf(TYPES),
  size: PropTypes.oneOf(SIZES),
  flush: PropTypes.oneOf(FLUSH_TYPES),
  isDisabled: PropTypes.bool,
};

EuiButtonEmpty.defaultProps = {
  iconSide: 'left',
  type: 'primary',
};
