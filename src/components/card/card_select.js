import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiButtonEmpty,
  COLORS as BUTTON_EMPTY_COLORS,
} from '../button/button_empty';

import { EuiI18n } from '../i18n';

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

  const selectClasses = classNames(
    'euiCardSelect',
    `euiCardSelect--${euiCardSelectableColor(color, isSelected)}`,
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
    text = (<EuiI18n
      token="euiCardSelect.selected"
      default="Selected"
    />);
  } else if (isDisabled) {
    text = (<EuiI18n
      token="euiCardSelect.unavailable"
      default="Unavailable"
    />);
  } else {
    text = (<EuiI18n
      token="euiCardSelect.select"
      default="Select"
    />);
  }

  return text;
}

export function euiCardSelectableColor(color, isSelected) {
  let calculatedColor;
  if (color) {
    calculatedColor = color;
  } else if (isSelected) {
    calculatedColor = 'success';
  } else {
    calculatedColor = 'text';
  }

  return calculatedColor;
}
