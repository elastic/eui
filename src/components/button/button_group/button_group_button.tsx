/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { useEuiTheme } from '../../../services';
import { useEuiButtonColorCSS } from '../../../themes/amsterdam/global_styling/mixins/button';
import { useInnerText } from '../../inner_text';

import { EuiButtonDisplay } from '../button_display/_button_display';
import { EuiButtonGroupOptionProps, EuiButtonGroupProps } from './button_group';
import {
  euiButtonGroupButtonStyles,
  _compressedButtonFocusColor,
  _uncompressedButtonFocus,
} from './button_group_button.styles';

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
  element: _element = 'button',
  type = 'button',
  ...rest
}) => {
  // Force element to be a button if disabled
  const element = isDisabled ? 'button' : _element;

  let elementProps = {};
  let singleInput;
  if (element === 'label') {
    singleInput = (
      <input
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
      'data-test-subj': id,
      isSelected,
      type,
      onClick: () => onChange(id),
    };
  }

  const isCompressed = size === 'compressed';
  const color = isDisabled ? 'disabled' : _color;
  const display = isSelected ? 'fill' : isCompressed ? 'empty' : 'base';

  const euiTheme = useEuiTheme();
  const buttonColorStyles = useEuiButtonColorCSS({ display })[color];
  const focusColorStyles = isCompressed
    ? _compressedButtonFocusColor(euiTheme, color)
    : _uncompressedButtonFocus(euiTheme);

  const styles = euiButtonGroupButtonStyles(euiTheme);
  const cssStyles = [
    styles.euiButtonGroupButton,
    isIconOnly && styles.iconOnly,
    styles[size!],
    !isCompressed && styles.uncompressed,
    isDisabled && isSelected ? styles.disabledAndSelected : buttonColorStyles,
    !isDisabled && focusColorStyles,
  ];
  const contentStyles = [
    styles.content.euiButtonGroupButton__content,
    isCompressed && styles.content.compressed,
  ];
  const textStyles = [
    isIconOnly
      ? styles.text.euiButtonGroupButton__iconOnly
      : styles.text.euiButtonGroupButton__text,
  ];

  const buttonClasses = classNames(
    'euiButtonGroupButton',
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
      css={cssStyles}
      className={buttonClasses}
      element={element}
      isDisabled={isDisabled}
      size={size === 'compressed' ? 's' : size}
      contentProps={{ css: contentStyles }}
      textProps={{
        css: textStyles,
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
