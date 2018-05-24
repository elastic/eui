import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiToggle, TOGGLE_TYPES } from '../../toggle';
import { EuiButton } from '../button';

export const EuiButtonToggle = ({
  className,
  color,
  isDisabled,
  isSelected,
  onChange,
  label,
  type,
  isIconOnly,
  toggleClassName,
  ...rest,
}) => {
  const classes = classNames(
    'euiButtonToggle',
    {
      'euiButtonToggle--isIconOnly': isIconOnly,
    },
    className,
  );

  const wrapperClasses = classNames(
    'euiButtonToggle__wrapper',
    {
      'euiButtonToggle--isDisabled': isDisabled,
    },
    toggleClassName
  );

  const buttonContent = isIconOnly ? '' : label;

  return (
    <EuiToggle
      className={wrapperClasses}
      inputClassName="euiButtonToggle__input"
      isDisabled={isDisabled}
      label={label}
      checked={isSelected}
      onChange={onChange}
      type={type}
    >
      <EuiButton
        tabIndex="-1" // prevents double focus from input to button
        className={classes}
        size={isIconOnly ? 's' : undefined} // only force small if it's the icon only version
        disabled={isDisabled}
        color={color}
        {...rest}
      >
        {buttonContent}
      </EuiButton>
    </EuiToggle>
  );
};

EuiButtonToggle.propTypes = {
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,

  /**
   * See `EuiButton`
   */
  color: PropTypes.string,

  /**
   * Button label, which is also passed to `EuiToggle` as the input's label
   */
  label: PropTypes.string.isRequired,

  /**
   * Is the button a single action or part of a group (multi)?
   * Used primarily for `EuiButtonGroup`
   */
  type: PropTypes.oneOf(TOGGLE_TYPES),

  /**
   * Hides the label from the button content and only displays the icon
   */
  isIconOnly: PropTypes.bool,

  /**
   * Classnames to add to `EuiToggle` instead of the `EuiButton`
   */
  toggleClassName: PropTypes.string,
};

EuiButtonToggle.defaultProps = {
  color: 'primary',
};
