/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useMemo,
  FocusEvent,
  FocusEventHandler,
  FunctionComponent,
  ReactNode,
  cloneElement,
  ReactElement,
} from 'react';
import classNames from 'classnames';

import {
  EuiFormControlLayoutDelimited,
  EuiFormControlLayoutDelimitedProps,
} from '../form';
import { IconType } from '../icon';
import { CommonProps } from '../common';

import { useEuiTheme } from '../../services';
import {
  euiDatePickerRangeStyles,
  euiDatePickerRangeInlineStyles,
} from './date_picker_range.styles';

import { EuiDatePickerProps } from './date_picker';

export type EuiDatePickerRangeProps = CommonProps &
  Pick<
    EuiFormControlLayoutDelimitedProps,
    'isLoading' | 'isInvalid' | 'readOnly' | 'fullWidth' | 'prepend' | 'append'
  > & {
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
     * Passes through to each control
     */
    disabled?: boolean;

    /**
     * Displays both date picker calendars directly on the page.
     * Will not render `iconType`, `fullWidth`, `prepend`, or `append`.
     *
     * Passes through to each control if `isCustom` is not set.
     */
    inline?: EuiDatePickerProps['inline'];

    /**
     * Allows turning the shadow off if using the `inline` prop
     */
    shadow?: EuiDatePickerProps['shadow'];

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
  inline,
  shadow = true,
  fullWidth: _fullWidth,
  isCustom,
  readOnly,
  isLoading,
  isInvalid,
  disabled,
  onFocus,
  onBlur,
  append,
  prepend,
  ...rest
}) => {
  // `fullWidth` should not affect inline datepickers (matches non-range behavior)
  const fullWidth = _fullWidth && !inline;

  const classes = classNames('euiDatePickerRange', className);

  const euiTheme = useEuiTheme();
  const styles = euiDatePickerRangeStyles(euiTheme);
  const cssStyles = [styles.euiDatePickerRange];

  if (inline) {
    // Determine the inline container query to use based on the width of the react-datepicker
    const hasTimeSelect =
      startDateControl.props.showTimeSelect ||
      endDateControl.props.showTimeSelect;

    const inlineStyles = euiDatePickerRangeInlineStyles(euiTheme);
    cssStyles.push(inlineStyles.inline);
    cssStyles.push(
      hasTimeSelect
        ? inlineStyles.responsiveWithTimeSelect
        : inlineStyles.responsive
    );
    if (shadow) cssStyles.push(inlineStyles.shadow);
  }

  let startControl = startDateControl;
  let endControl = endDateControl;

  if (!isCustom) {
    startControl = cloneElement(
      startDateControl as ReactElement<EuiDatePickerProps>,
      {
        controlOnly: true,
        showIcon: false,
        inline,
        fullWidth,
        readOnly,
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
        controlOnly: true,
        showIcon: false,
        inline,
        fullWidth,
        readOnly,
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

  const icon = useMemo(() => {
    if (inline) return undefined;
    if (iconType === false) return undefined;
    if (iconType === true) return 'calendar';
    return iconType;
  }, [iconType, inline]);

  return (
    <span className={classes} css={cssStyles} {...rest}>
      <EuiFormControlLayoutDelimited
        icon={icon}
        startControl={startControl}
        endControl={endControl}
        fullWidth={fullWidth}
        readOnly={readOnly}
        isDisabled={disabled}
        isInvalid={isInvalid}
        isLoading={isLoading}
        append={inline ? undefined : append}
        prepend={inline ? undefined : prepend}
      />
    </span>
  );
};
