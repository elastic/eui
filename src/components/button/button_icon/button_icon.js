import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getSecureRelForTarget } from '../../../services';

import {
  ICON_TYPES,
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
  primary: 'euiButtonIcon--primary',
  danger: 'euiButtonIcon--danger',
  disabled: 'euiButtonIcon--disabled',
  ghost: 'euiButtonIcon--ghost',
  text: 'euiButtonIcon--text',
};

export const COLORS = Object.keys(colorToClassNameMap);

export const EuiButtonIcon = ({
  className,
  iconType,
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
  iconType: PropTypes.oneOf(ICON_TYPES),
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
};
