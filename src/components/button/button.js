import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiLoadingSpinner
} from '../loading';

import { getSecureRelForTarget } from '../../services';

import {
  IconPropType,
  EuiIcon,
} from '../icon';

const colorToClassNameMap = {
  primary: 'euiButton--primary',
  secondary: 'euiButton--secondary',
  warning: 'euiButton--warning',
  danger: 'euiButton--danger',
  ghost: 'euiButton--ghost',
  text: 'euiButton--text',
};

export const COLORS = Object.keys(colorToClassNameMap);

const sizeToClassNameMap = {
  s: 'euiButton--small',
  m: null,
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
  isLoading,
  href,
  target,
  rel,
  type,
  buttonRef,
  contentProps,
  textProps,
  fullWidth,
  ...rest
}) => {

  // If in the loading state, force disabled to true
  isDisabled = isLoading ? true : isDisabled;

  const classes = classNames(
    'euiButton',
    colorToClassNameMap[color],
    sizeToClassNameMap[size],
    iconSideToClassNameMap[iconSide],
    className,
    {
      'euiButton--fill': fill,
      'euiButton--fullWidth': fullWidth,
    },
  );

  const contentClassNames = classNames(
    'euiButton__content',
    contentProps && contentProps.className,
  );

  const textClassNames = classNames(
    'euiButton__text',
    textProps && textProps.className,
  );

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (isLoading) {
    buttonIcon = (
      <EuiLoadingSpinner
        className="euiButton__spinner"
        size="m"
      />
    );
  } else if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="euiButton__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  const innerNode = (
    <span {...contentProps} className={contentClassNames}>
      {buttonIcon}
      <span {...textProps} className={textClassNames}>{children}</span>
    </span>
  );

  // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  // this is a button and piggyback off its disabled styles.
  if (href && !isDisabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        ref={buttonRef}
        {...rest}
      >
        {innerNode}
      </a>
    );
  } else {
    return (
      <button
        disabled={isDisabled}
        className={classes}
        type={type}
        ref={buttonRef}
        {...rest}
      >
        {innerNode}
      </button>
    );
  }
};

EuiButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * See EuiIcon
   */
  iconType: IconPropType,
  iconSide: PropTypes.oneOf(ICON_SIDES),

  /**
   * Add more focus to an action
   */
  fill: PropTypes.bool,

  /**
   * Define the color of the button
   */
  color: PropTypes.oneOf(COLORS),
  size: PropTypes.oneOf(SIZES),

  /**
   * Expands button to fill the width of the parent
   */
  fullWidth: PropTypes.bool,
  isDisabled: PropTypes.bool,
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  onClick: PropTypes.func,

  /**
   * Adds/swaps for loading spinner & disables
   */
  isLoading: PropTypes.bool,

  /**
   * Standard HTML attribute
   */
  type: PropTypes.string,
  buttonRef: PropTypes.func,

  /**
   * Passes props to `euiButton__content` span
   */
  contentProps: PropTypes.object,

  /**
   * Passes props to `euiButton__text` span
   */
  textProps: PropTypes.object,
};

EuiButton.defaultProps = {
  size: 'm',
  type: 'button',
  iconSide: 'left',
  color: 'primary',
  fill: false,
};
