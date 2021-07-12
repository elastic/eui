/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { FunctionComponent, useRef } from 'react';
import { EuiButtonDisplay } from '../button';
import { EuiButtonGroupOptionProps, EuiButtonGroupProps } from './button_group';
import { useInnerText } from '../../inner_text';
import { htmlIdGenerator } from '../../../services';

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
  element = 'button',
  type = 'button',
  ...rest
}) => {
  // Force element to be a button if disabled
  const el = isDisabled ? 'button' : element;
  const newId = useRef(htmlIdGenerator()()).current;

  let elementProps = {};
  let singleInput;
  if (el === 'label') {
    elementProps = {
      ...elementProps,
      htmlFor: newId,
      onClick: () => onChange(id, value),
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
      baseClassName="euiButtonGroupButton"
      className={buttonClasses}
      element={el}
      fill={size !== 'compressed' && isSelected}
      isDisabled={isDisabled}
      size={size === 'compressed' ? 's' : size}
      textProps={{
        className: isIconOnly
          ? 'euiScreenReaderOnly'
          : 'euiButtonGroupButton__textShift',
        ref: buttonTextRef,
        'data-text': innerText,
        title: innerText,
      }}
      {...elementProps}
      {...rest}>
      {singleInput}
      {label}
    </EuiButtonDisplay>
  );
};
