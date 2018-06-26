import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getSecureRelForTarget } from '../../services';
import { EuiFormControlLayout } from '../form/form_control_layout';
import { EuiHeaderNotification } from '../header/header_notification';

import {
  ICON_TYPES,
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
  numFilters,
  isDisabled,
  isSelected,
  href,
  target,
  rel,
  type,
  grow,
  ...rest
}) => {

  const classes = classNames(
    'euiFilterButton',
    colorToClassNameMap[color],
    iconSideToClassNameMap[iconSide],
    {
      'euiFilterButton-isSelected': isSelected,
      'euiFilterButton-hasActiveFilters': hasActiveFilters,
      'euiFilterButton-grow': grow,
    },
    className,
  );

  const icon = iconType ? {
    type: iconType,
    side: iconSide,
  } : undefined;

  const buttonContents = (
    <EuiFormControlLayout
      className="euiFilterButton__content"
      icon={icon}
    >
      <span className="euiFilterButton__textShift" data-text={children}>
        {children}
        {numFilters &&
          <EuiHeaderNotification className="euiFilterButton__notification">{numFilters}</EuiHeaderNotification>
        }
      </span>
    </EuiFormControlLayout>
  );

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
        {buttonContents}
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
        {buttonContents}
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
   * Adds a notification with number
   */
  numFilters: PropTypes.number,
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
  /**
   * Should the button grow to fill it's container, best used for dropdown buttons
   */
  grow: PropTypes.bool,
};

EuiFilterButton.defaultProps = {
  type: 'button',
  iconSide: 'right',
  color: 'text',
  grow: false,
};
