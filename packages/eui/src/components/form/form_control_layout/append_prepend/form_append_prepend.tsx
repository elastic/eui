/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  useContext,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../../services';
import { CommonProps, ExclusiveUnion } from '../../../common';
import { EuiIcon, IconType } from '../../../icon';
import { EuiFormLabel } from '../../form_label';
import {
  _EuiFormLabelProps,
  _EuiFormLabelSpanProps,
} from '../../form_label/form_label';
import { euiFormAppendPrependStyles } from './form_append_prepend.styles';
import { EuiFormControlLayoutContext } from '../form_control_layout_context';

export type EuiFormAppendProps = EuiFormAppendPrependBaseProps;

export const EuiFormAppend = ({ className, ...rest }: EuiFormAppendProps) => {
  const classes = classNames('euiFormAppend', className);

  return <EuiFormAppendPrepend className={classes} {...rest} side="append" />;
};

export type EuiFormPrependProps = EuiFormAppendPrependBaseProps;

export const EuiFormPrepend = ({ className, ...rest }: EuiFormPrependProps) => {
  const classes = classNames('euiFormPrepend', className);

  return <EuiFormAppendPrepend className={classes} {...rest} side="prepend" />;
};

export type EuiFormAppendPrependCommonProps = CommonProps & {
  /**
   * Main content label
   */
  label?: ReactNode;
  /**
   * Left side icon
   */
  iconLeft?: IconType;
  /**
   * Right side icon
   */
  iconRight?: IconType;
  /**
   * Optional content that will be appended to `label` and icons
   */
  children?: ReactNode;
  /**
   * id of the input element that the form label is linked to via `htmlFor` attribute
   */
  inputId?: string;
  /**
   * Renders the element with smaller height and padding
   */
  compressed?: boolean;
};

export type EuiFormAppendPrependButtonProps =
  EuiFormAppendPrependCommonProps & {
    /**
     * Defines the rendered HTML element
     */
    element?: 'button';
    isDisabled?: boolean;
  } & ButtonHTMLAttributes<HTMLButtonElement>;

export type EuiFormAppendPrependDivProps = EuiFormAppendPrependCommonProps & {
  /**
   * Defines the rendered HTML element
   */
  element?: 'div';
} & HTMLAttributes<HTMLDivElement>;

export type EuiFormAppendPrependBaseProps = ExclusiveUnion<
  EuiFormAppendPrependButtonProps,
  EuiFormAppendPrependDivProps
>;

export type EuiFormAppendPrependProps = {
  side: 'append' | 'prepend';
} & EuiFormAppendPrependBaseProps;

/* Internal component */

export const EuiFormAppendPrepend: FunctionComponent<
  EuiFormAppendPrependProps
> = ({
  element = 'div',
  id,
  side,
  children,
  className,
  inputId: _inputId,
  compressed: _compressed,
  iconLeft: _iconLeft,
  iconRight: _iconRight,
  label: _label,
  isDisabled: _isDisabled,
  disabled,
  ...rest
}) => {
  const styles = useEuiMemoizedStyles(euiFormAppendPrependStyles);

  const {
    compressed: formLayoutCompressed,
    inputId: formLayoutInputId,
    isDisabled: formLayoutIsDisabled,
  } = useContext(EuiFormControlLayoutContext);
  const compressed = _compressed ?? formLayoutCompressed;
  const inputId = _inputId ?? formLayoutInputId;

  // Adding automatic check on onClick for DevX convinience, this doesn't replace defining `element`
  const isButton = element === 'button' || typeof rest.onClick === 'function';
  const isDisabled =
    _isDisabled || disabled || (!isButton && formLayoutIsDisabled);

  const iconLeft = _iconLeft && <EuiIcon type={_iconLeft} css={styles.icon} />;
  const iconRight = _iconRight && (
    <EuiIcon type={_iconRight} css={styles.icon} />
  );

  const cssStyles = [
    styles.side,
    compressed ? styles.compressed : styles.uncompressed,
    isButton && !isDisabled && styles.isInteractive,
    isDisabled && styles.disabled,
  ];

  const labelProps = isButton
    ? ({
        type: 'span',
        id,
        className: 'eui-textTruncate',
      } as _EuiFormLabelSpanProps)
    : ({
        type: 'label',
        id,
        htmlFor: inputId || undefined,
      } as _EuiFormLabelProps);

  const label = _label && (
    <EuiFormLabel {...labelProps} css={styles.label}>
      {_label}
    </EuiFormLabel>
  );

  const content = (
    <>
      {iconLeft}
      {label}
      {iconRight}
      {children}
    </>
  );

  let component = (
    <div
      className={className}
      css={cssStyles}
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
      {content}
    </div>
  );

  if (isButton) {
    component = (
      <button
        className={className}
        css={cssStyles}
        disabled={isDisabled}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  return <div css={styles.wrapper}>{component}</div>;
};
