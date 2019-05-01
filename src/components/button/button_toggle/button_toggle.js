import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiToggle, TOGGLE_TYPES } from '../../toggle';
import { EuiButton } from '../button';

export const EuiButtonToggle = ({
  className,
  color,
  isDisabled,
  isEmpty,
  isIconOnly,
  isSelected,
  label,
  name,
  onChange,
  toggleClassName,
  type,
  value,
  ...rest
}) => {
  const classes = classNames(
    'euiButtonToggle',
    {
      'euiButtonToggle--isIconOnly': isIconOnly,
      'euiButtonToggle--isEmpty': isEmpty,
    },
    className
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
      checked={isSelected}
      isDisabled={isDisabled}
      label={label}
      name={name}
      onChange={onChange}
      type={type}
      title={label}
      value={value}>
      <EuiButton
        tabIndex="-1" // prevents double focus from input to button
        className={classes}
        color={color}
        disabled={isDisabled}
        size={isIconOnly ? 's' : undefined} // only force small if it's the icon only version
        {...rest}>
        {buttonContent}
      </EuiButton>
    </EuiToggle>
  );
};

EuiButtonToggle.propTypes = {
  className: PropTypes.string,

  /**
   * Button label, which is also passed to `EuiToggle` as the input's label
   */
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,

  /**
   * See `EuiButton`
   */
  color: PropTypes.string,
  isDisabled: PropTypes.bool,

  /**
   * Hides the label from the button content and only displays the icon
   */
  isIconOnly: PropTypes.bool,

  /**
   * Simulates a `EuiButtonEmpty`
   */
  isEmpty: PropTypes.bool,

  /**
   * Initial state of the toggle
   */
  isSelected: PropTypes.bool,

  /**
   * Classnames to add to `EuiToggle` instead of the `EuiButton`
   */
  toggleClassName: PropTypes.string,

  /**
   * Is the button a single action or part of a group (multi)?
   * Used primarily for `EuiButtonGroup`
   */
  type: PropTypes.oneOf(TOGGLE_TYPES),
};

EuiButtonToggle.defaultProps = {
  color: 'primary',
};
