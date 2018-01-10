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

export const EuiFormControlLayout = ({ children, icon, fullWidth, iconSide, isLoading, className }) => {

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
    const iconClasses = classNames('euiFormControlLayout__icon', iconSideToClassNameMap[iconSide]);

    optionalIcon = (
      <EuiIcon
        className={iconClasses}
        type={icon}
        size="m"
      />
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
  icon: PropTypes.string,
  fullWidth: PropTypes.bool,
  iconSide: PropTypes.oneOf(ICON_SIDES),
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

EuiFormControlLayout.defaultProps = {
  iconSide: 'left',
  isLoading: false,
};
