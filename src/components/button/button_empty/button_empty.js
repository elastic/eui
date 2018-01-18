import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import checkHrefAndOnClick from '../../../services/prop_types/check_href_and_onclick';

import {
  ICON_TYPES,
  EuiIcon,
} from '../../icon';

const colorToClassNameMap = {
  primary: 'euiButtonEmpty--primary',
  danger: 'euiButtonEmpty--danger',
  disabled: 'euiButtonEmpty--disabled',
  text: 'euiButtonEmpty--text',
  ghost: 'euiButtonEmpty--ghost',
};

export const COLORS = Object.keys(colorToClassNameMap);

const sizeToClassNameMap = {
  xs: 'euiButtonEmpty--xSmall',
  s: 'euiButtonEmpty--small',
  l: 'euiButtonEmpty--large',
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
  color,
  size,
  flush,
  isDisabled,
  href,
  onClick,
  ...rest
}) => {

  const classes = classNames(
    'euiButtonEmpty',
    colorToClassNameMap[color],
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
        <span className="euiButtonEmpty__content">
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
        <span className="euiButtonEmpty__content">
          {buttonIcon}
          <span>{children}</span>
        </span>
      </button>
    );
  }
};

EuiButtonEmpty.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconType: PropTypes.oneOf(ICON_TYPES),
  iconSide: PropTypes.oneOf(ICON_SIDES),
  color: PropTypes.oneOf(COLORS),
  size: PropTypes.oneOf(SIZES),
  flush: PropTypes.oneOf(FLUSH_TYPES),
  isDisabled: PropTypes.bool,
  href: checkHrefAndOnClick,
  onClick: PropTypes.func,
};

EuiButtonEmpty.defaultProps = {
  type: 'button',
  iconSide: 'left',
  color: 'primary',
};
