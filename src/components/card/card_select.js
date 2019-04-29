import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiButtonEmpty,
  COLORS as BUTTON_EMPTY_COLORS,
} from '../button/button_empty';

export const EuiCardSelect = ({
  className,
  onClick,
  isSelected,
  isDisabled,
  color,
  children,
  ...rest
}) => {
  const child = euiCardSelectableText(isSelected, isDisabled, children);

  let calculatedColor;
  if (color) {
    calculatedColor = color;
  } else if (isSelected) {
    calculatedColor = 'success';
  } else {
    calculatedColor = 'text';
  }

  const selectClasses = classNames(
    'euiCardSelect',
    `euiCardSelect--${calculatedColor}`,
    className
  );

  return (
    <EuiButtonEmpty
      className={selectClasses}
      color={color || 'text'}
      size="xs"
      onClick={onClick}
      isDisabled={isDisabled}
      iconType={isSelected ? 'check' : undefined}
      {...rest}
    >
      {child}
    </EuiButtonEmpty>
  );
};

export const EuiCardSelectProps = {
  className: PropTypes.string,
  /**
   * You must handle the click event in order to have a select button
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Is in the selected state
   */
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  /**
   * Override the default color with one of the available colors from `EuiButtonEmpty`
   */
  color: PropTypes.oneOf(BUTTON_EMPTY_COLORS),
  /**
   * Override the content (text) of the button
   */
  children: PropTypes.node,
};

EuiCardSelect.propTypes = EuiCardSelectProps;

function euiCardSelectableText(isSelected, isDisabled, children) {
  if (children) {
    return children;
  }

  let text;

  if (isSelected) {
    text = 'Selected';
  } else if (isDisabled) {
    text = 'Unavailable';
  } else {
    text = 'Select';
  }

  return text;
}
