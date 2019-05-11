import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getSecureRelForTarget } from '../../../services';

import {
  ICON_SIZES,
  IconPropType,
  EuiIcon,
} from '../../icon';

const accessibleButtonIcon = (props, propName, componentName) => {
  if (props['aria-label']) {
    return;
  }

  if (props['aria-labelledby']) {
    return;
  }

  throw new Error(
    `${componentName} requires aria-label or aria-labelledby to be specified because icon-only
    buttons are screen-reader-inaccessible without them.`
  );
};

const colorToClassNameMap = {
  danger: 'euiButtonIcon--danger',
  disabled: 'euiButtonIcon--disabled',
  ghost: 'euiButtonIcon--ghost',
  primary: 'euiButtonIcon--primary',
  subdued: 'euiButtonIcon--subdued',
  success: 'euiButtonIcon--success',
  text: 'euiButtonIcon--text',
  warning: 'euiButtonIcon--warning',
};

export const COLORS = Object.keys(colorToClassNameMap);

export const EuiButtonIcon = ({
  className,
  iconType,
  iconSize,
  color,
  isDisabled,
  href,
  type,
  target,
  rel,
  buttonRef,
  ...rest
}) => {

  const classes = classNames(
    'euiButtonIcon',
    colorToClassNameMap[color],
    className,
  );

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="euiButtonIcon__icon"
        type={iconType}
        size={iconSize}
        aria-hidden="true"
      />
    );
  }

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
        {buttonIcon}
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
        {buttonIcon}
      </button>
    );
  }
};

EuiButtonIcon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconType: IconPropType,
  iconSize: PropTypes.oneOf(ICON_SIZES),
  color: PropTypes.oneOf(COLORS),
  isDisabled: PropTypes.bool,
  'aria-label': accessibleButtonIcon,
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  buttonRef: PropTypes.func,
};

EuiButtonIcon.defaultProps = {
  type: 'button',
  color: 'primary',
  iconSize: 'm',
};
