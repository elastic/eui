/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, isValidElement, ReactNode } from 'react';

import classNames from 'classnames';
import { useEuiMemoizedStyles } from '../../../services';
import { EuiButtonEmpty, type EuiButtonEmptyProps } from '../../button';
import { EuiFieldTextProps } from '../field_text';
import { euiFormControlButtonStyles } from './form_control_button.styles';

export type EuiFormControlButtonInputProps = {
  /**
   * Placeholder value to be shown when no `value` is passed
   */
  placeholder?: EuiFieldTextProps['placeholder'];
  /**
   * When `true`, it renders a shorter height element
   */
  compressed?: EuiFieldTextProps['compressed'];
  /**
   * Defines invalid state styling
   */
  isInvalid?: EuiFieldTextProps['isInvalid'];
};
export type EuiFormControlButtonProps = EuiFormControlButtonInputProps &
  Omit<
    EuiButtonEmptyProps,
    'value' | 'color' | 'size' | 'flush' | 'isSelected' | 'isLoading'
  > & {
    /**
     * Defines the button label when used like an input in combination with `placeholder`
     */
    value?: ReactNode;
  };

export const EuiFormControlButton: FunctionComponent<
  EuiFormControlButtonProps
> = ({
  children,
  value,
  placeholder,
  className,
  contentProps: _contentProps,
  textProps: _textProps,
  compressed,
  isInvalid = false,
  ...rest
}) => {
  const styles = useEuiMemoizedStyles(euiFormControlButtonStyles);

  const classes = classNames('euiFormControlButton', className);

  const cssStyles = [
    styles.euiFormControlButton,
    isInvalid && styles.isInvalid,
    compressed && styles.compressed,
  ];

  const contentProps = {
    ..._contentProps,
    css: [styles.euiFormControlButton__content, _contentProps?.css],
  };

  const customTextProps = {
    ..._textProps,
    className: classNames(
      'eui-textTruncate',
      _textProps && _textProps?.className
    ),
    css: [
      styles.textContent,
      !value && styles.placeholder,
      _textProps && _textProps?.css,
    ],
  };

  const content = isValidElement(children) ? children : <span>{children}</span>;
  const hasText = value || placeholder;

  return (
    <EuiButtonEmpty
      css={cssStyles}
      className={classes}
      contentProps={contentProps}
      textProps={false}
      color="text"
      {...(rest as EuiButtonEmptyProps)}
    >
      {hasText && <span {...customTextProps}>{value || placeholder}</span>}
      {hasText && content && ' '}
      {content}
    </EuiButtonEmpty>
  );
};
