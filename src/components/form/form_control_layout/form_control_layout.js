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

export const EuiFormControlLayout = ({ children, icon, fullWidth, onClear, iconSide, isLoading, onIconClick, className }) => {

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
    const iconClasses = classNames(
      'euiFormControlLayout__icon',
      iconSideToClassNameMap[iconSide],
      {
        'euiFormControlLayout__iconButton': onIconClick
      },
    );

    if (onIconClick) {
      optionalIcon = (
        <button
          className={iconClasses}
          onClick={onIconClick}
        >
          <EuiIcon
            type={icon}
          />
        </button>
      )
    } else {
      optionalIcon = (
        <EuiIcon
          aria-hidden="true"
          className={iconClasses}
          type={icon}
        />
      );
    }
  }

  let optionalClear;
  if (onClear) {
    optionalClear = (
      <button
        className="euiFormControlLayout__clear"
        onClick={onClear}
      >
        <EuiIcon
          className="euiFormControlLayout__clearIcon"
          type="cross"
        />
      </button>
    );
  }

  return (
    <div className={classes}>
      {children}
      {optionalIcon}
      {optionalClear}
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
  onClear: PropTypes.func,
  onIconClick: PropTypes.func,
  className: PropTypes.string,
};

EuiFormControlLayout.defaultProps = {
  iconSide: 'left',
  isLoading: false,
};
