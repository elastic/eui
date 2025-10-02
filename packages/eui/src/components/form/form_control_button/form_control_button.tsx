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
import { useInnerText } from '../../inner_text';
import {
  EuiButtonEmptyPropsForAnchor,
  EuiButtonEmptyPropsForButton,
} from '../../button/button_empty/button_empty';

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
  /**
   * Expand to fill 100% of the parent.
   * Defaults to `fullWidth` prop of `<EuiForm>`.
   * @default true
   */
  fullWidth?: boolean;
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
  fullWidth = true,
  href,
  rel, // required by our local href-with-rel eslint rule
  ...rest
}) => {
  const [buttonTextRef, innerText] = useInnerText();

  const styles = useEuiMemoizedStyles(euiFormControlButtonStyles);
  const classes = classNames('euiFormControlButton', className);

  const cssStyles = [
    styles.euiFormControlButton,
    isInvalid && styles.isInvalid,
    compressed && styles.compressed,
    fullWidth ? styles.fullWidth : styles.formWidth,
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

  const content = children ? (
    isValidElement(children) ? (
      children
    ) : (
      <span>{children}</span>
    )
  ) : null;
  const hasText = value || placeholder;

  const linkProps = {
    href,
    rel,
    ...rest,
  } as EuiButtonEmptyPropsForAnchor;

  const buttonProps = {
    value: value ? innerText ?? '' : undefined,
    ...rest,
  } as EuiButtonEmptyPropsForButton;

  const restProps = href ? linkProps : buttonProps;

  return (
    <EuiButtonEmpty
      css={cssStyles}
      className={classes}
      contentProps={contentProps}
      textProps={false}
      color="text"
      {...restProps}
    >
      {hasText && (
        <span {...customTextProps} ref={buttonTextRef}>
          {value || placeholder}
        </span>
      )}
      {hasText && content && ' '}
      {content}
    </EuiButtonEmpty>
  );
};
