import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getSecureRelForTarget } from '../../services';

import {
  ICON_TYPES,
  EuiIcon,
} from '../icon';

const colorToClassNameMap = {
  primary: 'euiFilterButton--primary',
  danger: 'euiFilterButton--danger',
  disabled: 'euiFilterButton--disabled',
  text: 'euiFilterButton--text',
  ghost: 'euiFilterButton--ghost',
};

export const COLORS = Object.keys(colorToClassNameMap);

const iconSideToClassNameMap = {
  left: '',
  right: 'euiFilterButton--iconRight',
};

export const ICON_SIDES = Object.keys(iconSideToClassNameMap);

export const EuiFilterButton = ({
  children,
  className,
  iconType,
  iconSide,
  color,
  hasActiveFilters,
  isDisabled,
  isSelected,
  href,
  target,
  rel,
  type,
  ...rest
}) => {

  const classes = classNames(
    'euiFilterButton',
    colorToClassNameMap[color],
    iconSideToClassNameMap[iconSide],
    {
      'euiFilterButton-isSelected': isSelected,
      'euiFilterButton-hasActiveFilters': hasActiveFilters,
    },
    className,
  );

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="euiFilterButton__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  if (href) {
    const secureRel = getSecureRelForTarget(target, rel);

    return (
      <a
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        {...rest}
      >
        <span className="euiFilterButton__content">
          {buttonIcon}
          <span className="euiFilterButton__textShift" data-text={children}>{children}</span>
        </span>
      </a>
    );
  } else {
    return (
      <button
        disabled={isDisabled}
        className={classes}
        type={type}
        {...rest}
      >
        <span className="euiFilterButton__content">
          {buttonIcon}
          <span className="euiFilterButton__textShift" data-text={children}>{children}</span>
        </span>
      </button>
    );
  }
};

EuiFilterButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  /**
   * Use any one of our icons
   */
  iconType: PropTypes.oneOf(ICON_TYPES),
  iconSide: PropTypes.oneOf(ICON_SIDES),
  color: PropTypes.oneOf(COLORS),
  /**
   * Bolds the button if true
   */
  hasActiveFilters: PropTypes.bool,
  /**
   * Applies a visual state to the button useful when using with a popover.
   */
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  /**
   * If passed, changes the button to an anchor tag
   */
  href: PropTypes.string,
  /**
   * Used along with href
   */
  target: PropTypes.string,
  /**
   * Used along with href
   */
  rel: PropTypes.string,
  /**
   * Defines html button input type
   */
  type: PropTypes.string,
};

EuiFilterButton.defaultProps = {
  type: 'button',
  iconSide: 'right',
  color: 'text',
};
