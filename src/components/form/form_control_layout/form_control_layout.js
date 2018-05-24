import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../../icon';
import { EuiLoadingSpinner } from '../../loading';

export const ICON_SIDES = ['left', 'right'];

export class EuiFormControlLayout extends Component {
  render() {
    const {
      children,
      icon, // eslint-disable-line no-unused-vars
      clear, // eslint-disable-line no-unused-vars
      fullWidth,
      isLoading, // eslint-disable-line no-unused-vars
      compressed,
      className,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiFormControlLayout',
      {
        'euiFormControlLayout--fullWidth': fullWidth,
        'euiFormControlLayout--compressed': compressed,
      },
      className
    );

    return (
      <div className={classes} {...rest}>
        {children}
        {this.renderIcons()}
      </div>
    );
  }

  renderIcons() {
    const {
      isLoading,
      icon,
      clear,
    } = this.props;

    let optionalLoader;
    if (isLoading) {
      optionalLoader = (
        <EuiLoadingSpinner size="m" />
      );
    }

    let optionalIconSide;
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

      optionalIconSide = iconSide

      const iconClasses = classNames(
        'euiFormControlLayout__icon',
        iconClassName,
        {
          'euiFormControlLayout__icon--button': onIconClick,
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

    let leftIcons;

    if ( optionalIconSide === 'left') {
      leftIcons = (
        <div className="euiFormControlLayout__icons">
          {optionalIcon}
        </div>
      );
    }

    let rightIcons;

    // If the icon is on the right, it should be placed after the clear button in the DOM.
    if (optionalClear || optionalLoader || optionalIconSide === 'right') {
      rightIcons = (
        <div className="euiFormControlLayout__icons euiFormControlLayout__icons--right">
          {optionalClear}
          {optionalLoader}
          {optionalIconSide === 'right' ? optionalIcon : undefined}
        </div>
      );
    }


    return (
      <Fragment>
        {leftIcons}
        {rightIcons}
      </Fragment>
    );
  }
}

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
