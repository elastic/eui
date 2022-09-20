/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { EuiButtonDisplayDeprecated as EuiButtonDisplay } from '../button';
import { EuiButtonGroupOptionProps, EuiButtonGroupProps } from './button_group';
import { useInnerText } from '../../inner_text';
import { useGeneratedHtmlId } from '../../../services';
import { useEuiButtonColorCSS } from '../../../themes/amsterdam/global_styling/mixins/button';

type Props = EuiButtonGroupOptionProps & {
  /**
   * Element to display based on single or multi
   */
  element: 'button' | 'label';
  /**
   * Styles the selected button to look selected (usually with `fill`)
   */
  isSelected?: boolean;
  /**
   * Name of the whole group for 'single'.
   */
  name?: string;
  /**
   * The value of the radio input for 'single'.
   */
  value?: string;
  /**
   * Inherit from EuiButtonGroup
   */
  color: EuiButtonGroupProps['color'];
  /**
   * Inherit from EuiButtonGroup
   */
  size: EuiButtonGroupProps['buttonSize'];
  /**
   * Inherit from EuiButtonGroup
   */
  isIconOnly: EuiButtonGroupProps['isIconOnly'];
  /**
   * Inherit from EuiButtonGroup
   */
  onChange: EuiButtonGroupProps['onChange'];
};

export const EuiButtonGroupButton: FunctionComponent<Props> = ({
  className,
  id,
  isDisabled,
  isIconOnly,
  isSelected = false,
  label,
  name,
  onChange,
  size,
  value,
  color: _color = 'primary',
  element = 'button',
  type = 'button',
  ...rest
}) => {
  // Force element to be a button if disabled
  const el = isDisabled ? 'button' : element;
  const newId = useGeneratedHtmlId();

  let elementProps = {};
  let singleInput;
  if (el === 'label') {
    elementProps = {
      ...elementProps,
      htmlFor: newId,
    };
    singleInput = (
      <input
        id={newId}
        className="euiScreenReaderOnly"
        name={name}
        checked={isSelected}
        disabled={isDisabled}
        value={value}
        type="radio"
        onChange={() => onChange(id, value)}
        data-test-subj={id}
      />
    );
  } else {
    elementProps = {
      ...elementProps,
      id: newId,
      'data-test-subj': id,
      isSelected,
      type,
      onClick: () => onChange(id),
    };
  }

  // eslint-disable-next-line no-nested-ternary
  const color = isDisabled ? 'disabled' : _color;
  // eslint-disable-next-line no-nested-ternary
  const display = isSelected
    ? 'fill'
    : size === 'compressed'
    ? 'empty'
    : 'base';
  const buttonColorStyles = useEuiButtonColorCSS({ display })[color];

  const buttonClasses = classNames(
    {
      'euiButtonGroupButton-isSelected': isSelected,
      'euiButtonGroupButton-isIconOnly': isIconOnly,
    },
    className
  );

  /**
   * Because the selected buttons also increase their text weight to 'bold',
   * we don't want the whole button size to shift when selected, so we determine
   * the base width of the button via the `euiTextShift()` method in SASS.
   */
  const [buttonTextRef, innerText] = useInnerText();

  return (
    <EuiButtonDisplay
      css={[buttonColorStyles]}
      baseClassName="euiButtonGroupButton"
      className={buttonClasses}
      element={el}
      isDisabled={isDisabled}
      size={size === 'compressed' ? 's' : size}
      textProps={{
        className: isIconOnly
          ? 'euiScreenReaderOnly'
          : 'euiButtonGroupButton__textShift',
        ref: buttonTextRef,
        'data-text': innerText,
      }}
      title={innerText}
      {...elementProps}
      {...rest}
    >
      {singleInput}
      {label}
    </EuiButtonDisplay>
  );
};
