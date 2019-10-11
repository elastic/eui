import React, { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { EuiButtonEmpty, EuiButtonEmptyColor } from '../button/button_empty';

import { EuiI18n } from '../i18n';

export type EuiCardSelectProps = CommonProps & {
  /**
   * You must handle the click event in order to have a select button
   */
  onClick: MouseEventHandler<HTMLButtonElement>;
  /**
   * Is in the selected state
   */
  isSelected?: boolean;
  isDisabled?: boolean;
  /**
   * Override the default color with one of the available colors from `EuiButtonEmpty`
   */
  color?: EuiButtonEmptyColor;
};

export const EuiCardSelect: FunctionComponent<EuiCardSelectProps> = ({
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
      {...rest}>
      {child}
    </EuiButtonEmpty>
  );
};

function euiCardSelectableText(
  isSelected: boolean | undefined,
  isDisabled: boolean | undefined,
  children: ReactNode
): ReactNode {
  if (children) {
    return children;
  }

  let text;

  if (isSelected) {
    text = <EuiI18n token="euiCardSelect.selected" default="Selected" />;
  } else if (isDisabled) {
    text = <EuiI18n token="euiCardSelect.unavailable" default="Unavailable" />;
  } else {
    text = <EuiI18n token="euiCardSelect.select" default="Select" />;
  }

  return text;
}

export function euiCardSelectableColor(
  color: EuiButtonEmptyColor | undefined,
  isSelected: boolean | undefined
): string {
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
