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

export const EuiFormControlLayout = ({
  children,
  icon,
  clear,
  fullWidth,
  isLoading,
  compressed,
  className,
  ...rest
}) => {

  const classes = classNames(
    'euiFormControlLayout',
    {
      'euiFormControlLayout--fullWidth': fullWidth,
      'euiFormControlLayout--compressed': compressed,
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
    // Normalize the icon to an object if it's a string.
    const iconProps = typeof icon === 'string' ? {
      type: icon,
    } : icon;

    const {
      className: iconClassName,
      type: iconType,
      side: iconSide = 'left',
      onClick: onIconClick,
      ref: iconRef,
      ...iconRest
    } = iconProps

    const iconClasses = classNames(
      'euiFormControlLayout__icon',
      iconSideToClassNameMap[iconSide],
      iconClassName,
      {
        'euiFormControlLayout__iconButton': onIconClick,
      },
    );

    if (onIconClick) {
      optionalIcon = (
        <button
          className={iconClasses}
          onClick={onIconClick}
          ref={iconRef}
          {...iconRest}
        >
          <EuiIcon
            type={iconType}
          />
        </button>
      )
    } else {
      optionalIcon = (
        <EuiIcon
          aria-hidden="true"
          className={iconClasses}
          type={iconType}
          {...iconRest}
        />
      );
    }
  }

  let optionalClear;
  if (clear) {
    const {
      className: clearClassName,
      onClick: onClearClick,
      ...clearRest
    } = clear;

    const clearClasses = classNames('euiFormControlLayout__clear', clearClassName);

    optionalClear = (
      <button
        className={clearClasses}
        onClick={onClearClick}
        {...clearRest}
      >
        <EuiIcon
          className="euiFormControlLayout__clearIcon"
          type="cross"
        />
      </button>
    );
  }

  return (
    <div className={classes} {...rest}>
      {children}
      {optionalIcon}
      {optionalClear}
      {optionalLoader}
    </div>
  );
};

EuiFormControlLayout.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      type: PropTypes.string,
      side: PropTypes.oneOf(ICON_SIDES),
      onClick: PropTypes.func,
    }),
  ]),
  clear: PropTypes.shape({
    onClick: PropTypes.func,
  }),
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  compressed: PropTypes.bool,
};

EuiFormControlLayout.defaultProps = {
  isLoading: false,
  compressed: false,
};
