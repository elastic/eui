import React from 'react';
import PropTypes from 'prop-types';

import {
  ICON_TYPES,
  KuiIcon,
} from '../icon';

import {
  buttonClass
} from '../../services'

export const KuiButton = ({
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
  const classes = buttonClass.get({ type, size, iconSide, className, fill });

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <KuiIcon
        className="kuiButton__icon"
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
      <span className="kuiButton__content">
        {buttonIcon}
        <span>{children}</span>
      </span>
    </button>
  );
};

KuiButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconType: PropTypes.oneOf(ICON_TYPES),
  iconSide: PropTypes.oneOf(buttonClass.ICON_SIDES),
  fill: PropTypes.bool,
  type: PropTypes.oneOf(buttonClass.TYPES),
  size: PropTypes.oneOf(buttonClass.SIZES),
  isDisabled: PropTypes.bool,
};

KuiButton.defaultProps = {
  iconSide: 'left',
  type: 'primary',
  fill: false,
};
