import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import checkHrefAndOnClick from '../../../services/prop_types/check_href_and_onclick';

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
  onClick,
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
    return (
      <a
        className={classes}
        href={href}
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
        onClick={onClick}
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
  href: checkHrefAndOnClick,
  onClick: PropTypes.func,
};

EuiButtonIcon.defaultProps = {
  type: 'button',
  color: 'primary',
};
