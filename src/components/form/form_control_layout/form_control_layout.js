import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../../icon';
import { EuiLoadingSpinner } from '../../loading';

const iconSideToClassNameMap = {
  left: '',
  right: 'euiFormControlLayout__icon--right',
};

export const ICON_SIDES = Object.keys(iconSideToClassNameMap);

export const EuiFormControlLayout = ({ children, icon, fullWidth, iconSide, isLoading, className, isIconClickable }) => {

  const classes = classNames(
    'euiFormControlLayout',
    {
      'euiFormControlLayout--fullWidth': fullWidth,
    },
    className
  );

  let optionalLoader;
  if (isLoading) {
    optionalLoader = (
      <EuiLoadingSpinner size="m" className="euiFormControlLayout__loading" />
    );
  }

  let optionalIcon;
  if (icon) {
    if (typeof icon === 'string' || icon instanceof String) {
      icon = (
        <EuiIcon
          type={icon}
          size="m"
        />
      );
    }

    const iconClasses = classNames('euiFormControlLayout__icon', iconSideToClassNameMap[iconSide], {
      'euiFormControlLayout__icon--notClickable': !isIconClickable,
      'euiFormControlLayout__icon--clickable': isIconClickable
    });

    optionalIcon = (
      <div className={iconClasses}>
        { icon }
      </div>
    );
  }

  return (
    <div className={classes}>
      {children}
      {optionalIcon}
      {optionalLoader}
    </div>
  );
};

EuiFormControlLayout.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  fullWidth: PropTypes.bool,
  iconSide: PropTypes.oneOf(ICON_SIDES),
  isIconClickable: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

EuiFormControlLayout.defaultProps = {
  iconSide: 'left',
  isIconClickable: false,
  isLoading: false,
};
