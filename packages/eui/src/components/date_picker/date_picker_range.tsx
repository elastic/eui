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

import { useEuiMemoizedStyles } from '../../services';
import {
  euiDatePickerRangeStyles,
  euiDatePickerRangeInlineStyles,
} from './date_picker_range.styles';

import { EuiDatePickerProps } from './date_picker';

export type EuiDatePickerRangeProps = CommonProps &
  Pick<
    EuiFormControlLayoutDelimitedProps,
    | 'isLoading'
    | 'isInvalid'
    | 'readOnly'
    | 'fullWidth'
    | 'compressed'
    | 'prepend'
    | 'append'
    | 'delimiter'
  > & {
    /**
     * Including any children will replace all innards with the provided children
     */
    children?: ReactNode;

    /**
     * The end date `EuiDatePicker` element
     */
    endDateControl?: ReactElement;

    /**
     * The start date `EuiDatePicker` element
     */
    startDateControl?: ReactElement;

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
  'data-test-subj': dataTestSubj,
  startDateControl,
  endDateControl,
  iconType = true,
  inline,
  shadow = true,
  fullWidth: _fullWidth,
  compressed: _compressed,
  isCustom,
  readOnly,
  isLoading,
  isInvalid,
  disabled,
  onFocus,
  onBlur,
  append,
  prepend,
  delimiter,
  ...rest
}) => {
  // `fullWidth` and `compressed` should not affect inline datepickers (matches non-range behavior)
  const fullWidth = _fullWidth && !inline;
  const compressed = _compressed && !inline;

  const classes = classNames('euiDatePickerRange', className);

  const styles = useEuiMemoizedStyles(euiDatePickerRangeStyles);
  const inlineStyles = useEuiMemoizedStyles(euiDatePickerRangeInlineStyles);
  const cssStyles = !inline
    ? styles.euiDatePickerRange
    : [
        inlineStyles.euiDatePickerRangeInline,
        // Determine the inline container query to use based on the width of the react-datepicker
        startDateControl?.props.showTimeSelect ||
        endDateControl?.props.showTimeSelect
          ? inlineStyles.responsiveWithTimeSelect
          : inlineStyles.responsive,
        shadow && inlineStyles.shadow,
      ];

  let startControl = startDateControl;
  let endControl = endDateControl;

  if (!isCustom) {
    startControl =
      startControl &&
      cloneElement(startDateControl as ReactElement<EuiDatePickerProps>, {
        controlOnly: true,
        showIcon: false,
        inline,
        compressed,
        fullWidth,
        readOnly,
        disabled: disabled || startDateControl?.props.disabled,
        isInvalid: isInvalid || startDateControl?.props.isInvalid,
        className: classNames(
          'euiDatePickerRange__start',
          startDateControl?.props.className
        ),
        'data-test-subj': dataTestSubj
          ? `${dataTestSubj}-start-date`
          : undefined,
        onBlur: (event: FocusEvent<HTMLInputElement>) => {
          startDateControl?.props?.onBlur?.(event);
          onBlur?.(event);
        },
        onFocus: (event: FocusEvent<HTMLInputElement>) => {
          startDateControl?.props?.onFocus?.(event);
          onFocus?.(event);
        },
      });

    endControl =
      endControl &&
      cloneElement(endDateControl as ReactElement<EuiDatePickerProps>, {
        controlOnly: true,
        showIcon: false,
        inline,
        compressed,
        fullWidth,
        readOnly,
        disabled: disabled || endDateControl?.props.disabled,
        isInvalid: isInvalid || endDateControl?.props.isInvalid,
        popoverPlacement: 'downRight',
        className: classNames(
          'euiDatePickerRange__end',
          endDateControl?.props.className
        ),
        'data-test-subj': dataTestSubj ? `${dataTestSubj}-end-date` : undefined,
        onBlur: (event: FocusEvent<HTMLInputElement>) => {
          endDateControl?.props?.onBlur?.(event);
          onBlur?.(event);
        },
        onFocus: (event: FocusEvent<HTMLInputElement>) => {
          endDateControl?.props?.onFocus?.(event);
          onFocus?.(event);
        },
      });
  }

  const icon = useMemo(() => {
    if (inline) return undefined;
    if (iconType === false) return undefined;
    if (iconType === true) return 'calendar';
    return iconType;
  }, [iconType, inline]);

  return (
    <div
      className={classes}
      css={cssStyles}
      data-test-subj={dataTestSubj}
      {...rest}
    >
      <EuiFormControlLayoutDelimited
        delimiter={delimiter}
        icon={icon}
        startControl={startControl}
        endControl={endControl}
        fullWidth={fullWidth}
        compressed={compressed}
        readOnly={readOnly}
        isDisabled={disabled}
        isInvalid={isInvalid}
        isLoading={isLoading}
        append={inline ? undefined : append}
        prepend={inline ? undefined : prepend}
        css={
          inline &&
          !disabled &&
          (shadow
            ? inlineStyles.formLayout.shadow
            : inlineStyles.formLayout.noShadow)
        }
        wrapperProps={{
          'data-test-subj': dataTestSubj
            ? `${dataTestSubj}-range-wrapper`
            : undefined,
        }}
      />
    </div>
  );
};
