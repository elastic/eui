import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../..';

const iconSideToClassNameMap = {
  left: '',
  right: 'euiFormControlLayout__icon--right',
};

export const ICON_SIDES = Object.keys(iconSideToClassNameMap);

export const EuiFormControlLayout = ({ children, icon, fullWidth, iconSide, className }) => {

  const classes = classNames(
    'euiFormControlLayout',
    {
      'euiFormControlLayout--fullWidth': fullWidth,
    },
    className
  );

  if (icon) {
    const iconClasses = classNames('euiFormControlLayout__icon', iconSideToClassNameMap[iconSide]);

    const optionalIcon = (
      <EuiIcon
        className={iconClasses}
        type={icon}
        size="medium"
      />
    );

    return (
      <div className={classes}>
        {children}
        {optionalIcon}
      </div>
    );
  }

  return children;
};

EuiFormControlLayout.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  iconSide: PropTypes.oneOf(ICON_SIDES),
};

EuiFormControlLayout.defaultProps = {
  iconSide: 'left',
};
