/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FocusEvent,
  FocusEventHandler,
  Fragment,
  FunctionComponent,
  ReactNode,
  cloneElement,
  ReactElement,
} from 'react';
import classNames from 'classnames';

import { IconType, EuiIcon } from '../icon';
import { CommonProps } from '../common';
import { EuiDatePickerProps } from './date_picker';

export type EuiDatePickerRangeProps = CommonProps & {
  /**
   * Including any children will replace all innards with the provided children
   */
  children?: ReactNode;

  /**
   * The end date `EuiDatePicker` element
   */
  endDateControl: ReactElement;

  /**
   * The start date `EuiDatePicker` element
   */
  startDateControl: ReactElement;

  /**
   * Pass either an icon type or set to `false` to remove icon entirely
   */
  iconType?: boolean | IconType;

  /**
   * Won't apply any additional props to start and end date components
   */
  isCustom?: boolean;

  /**
   * Will turn the range delimeter into an alert icon and pass through to each control
   */
  isInvalid?: boolean;

  /**
   * Passes through to each control
   */
  disabled?: boolean;

  /**
   * Passes through to each control
   */
  readOnly?: boolean;

  /**
   * Passes through to each control
   */
  fullWidth?: boolean;

  /**
   * Triggered whenever the start or end controls are blurred
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;

  /**
   * Triggered whenever the start or end controls are focused
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
};

export const EuiDatePickerRange: FunctionComponent<EuiDatePickerRangeProps> = ({
  children,
  className,
  startDateControl,
  endDateControl,
  iconType = true,
  fullWidth,
  isCustom,
  readOnly,
  isInvalid,
  disabled,
  onFocus,
  onBlur,
  ...rest
}) => {
  const classes = classNames(
    'euiDatePickerRange',
    {
      'euiDatePickerRange--fullWidth': fullWidth,
      'euiDatePickerRange--readOnly': readOnly,
      'euiDatePickerRange--isInvalid': isInvalid,
      'euiDatePickerRange--isDisabled': disabled,
    },
    className
  );

  let startControl = startDateControl;
  let endControl = endDateControl;

  if (!isCustom) {
    startControl = cloneElement(
      startDateControl as ReactElement<EuiDatePickerProps>,
      {
        iconType: typeof iconType === 'boolean' ? undefined : iconType,
        showIcon: !!iconType,
        fullWidth: fullWidth,
        readOnly: readOnly,
        disabled: disabled || startDateControl.props.disabled,
        isInvalid: isInvalid || startDateControl.props.isInvalid,
        className: classNames(
          'euiDatePickerRange__start',
          startDateControl.props.className
        ),
        onBlur: (event: FocusEvent<HTMLInputElement>) => {
          startDateControl.props?.onBlur?.(event);
          onBlur?.(event);
        },
        onFocus: (event: FocusEvent<HTMLInputElement>) => {
          startDateControl.props?.onFocus?.(event);
          onFocus?.(event);
        },
      }
    );

    endControl = cloneElement(
      endDateControl as ReactElement<EuiDatePickerProps>,
      {
        showIcon: false,
        fullWidth: fullWidth,
        readOnly: readOnly,
        disabled: disabled || endDateControl.props.disabled,
        isInvalid: isInvalid || endDateControl.props.isInvalid,
        popoverPlacement: 'downRight',
        className: classNames(
          'euiDatePickerRange__end',
          endDateControl.props.className
        ),
        onBlur: (event: FocusEvent<HTMLInputElement>) => {
          endDateControl.props?.onBlur?.(event);
          onBlur?.(event);
        },
        onFocus: (event: FocusEvent<HTMLInputElement>) => {
          endDateControl.props?.onFocus?.(event);
          onFocus?.(event);
        },
      }
    );
  }

  const delimiter = (
    <span className="euiDatePickerRange__delimeter">
      <EuiIcon
        color={isInvalid ? 'danger' : 'subdued'}
        type={isInvalid ? 'warning' : 'sortRight'}
      />
    </span>
  );

  return (
    <div className={classes} {...rest}>
      {children ? (
        children
      ) : (
        <Fragment>
          {startControl}
          {delimiter}
          {endControl}
        </Fragment>
      )}
    </div>
  );
};
