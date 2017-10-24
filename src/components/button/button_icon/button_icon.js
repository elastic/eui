import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  ICON_TYPES,
  EuiIcon,
} from '../../icon';

const typeToClassNameMap = {
  primary: 'euiButtonIcon--primary',
  danger: 'euiButtonIcon--danger',
  disabled: 'euiButtonIcon--disabled',
  ghost: 'euiButtonIcon--ghost',
};

export const TYPES = Object.keys(typeToClassNameMap);


export const EuiButtonIcon = ({
  className,
  iconType,
  type,
  isDisabled,
  ...rest,
}) => {

  const classes = classNames(
    'euiButtonIcon',
    typeToClassNameMap[type],
    className,
  );

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="euiButtonIcon__icon"
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
      {buttonIcon}
    </button>
  );
};

EuiButtonIcon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconType: PropTypes.oneOf(ICON_TYPES),
  type: PropTypes.oneOf(TYPES),
  isDisabled: PropTypes.bool,
};

EuiButtonIcon.defaultProps = {
  type: 'primary',
};
