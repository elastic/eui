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
  ...rest,
}) => {
  const classes = classNames(
    'euiButtonToggle',
  );

  const wrapperClasses = classNames(
    'euiButtonToggle__wrapper',
    {
      'euiButtonToggle--isDisabled': isDisabled,
    },
    className
  );

  return (
    <EuiToggle
      className={wrapperClasses}
      isDisabled={isDisabled}
      label={label}
      checked={isSelected}
      onChange={onChange}
      inputClassName="euiButtonToggle__input"
      type={type}
    >
      <EuiButton
        tabIndex="-1" // prevents double focus from input to button
        className={classes}
        size="s"
        fill={isSelected}
        disabled={isDisabled}
        color={color}
        {...rest}
      >
        {label}
      </EuiButton>
    </EuiToggle>
  );
};

EuiButtonToggle.propTypes = {
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,

  /**
   * See EuiButton
   */
  color: PropTypes.string,

  /**
   * Button label, which is also passed to EuiToggle as the input's label
   */
  label: PropTypes.string.isRequired,

  /**
   * Starting state of toggle
   */
  isSelected: PropTypes.bool,
  type: PropTypes.oneOf(TOGGLE_TYPES),
};

EuiButtonToggle.defaultProps = {
  color: 'text',
};
