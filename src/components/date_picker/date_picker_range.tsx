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
  FunctionComponent,
  ReactNode,
  cloneElement,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useState,
  useEffect,
} from 'react';
import classNames from 'classnames';
import moment from 'moment';

import { useGeneratedHtmlId, useUpdateEffect } from '../../services';
import { CommonProps } from '../common';
import { EuiDatePickerProps } from './date_picker';
import { IconType, EuiIcon } from '../icon';
import { EuiI18n, useEuiI18n } from '../i18n';

export interface EuiDatePickerRangeValue {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export type EuiDatePickerRangeProps = CommonProps & {
  /**
   * Space-separated list of element IDs describing the elements for ARIA purposes.
   */
  'aria-describedby'?: string;

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
   * Value object of the date range picker
   */
  value?: EuiDatePickerRangeValue;

  /**
   * Triggered whenever the start or end controls' values are changed
   */
  onChange?: (value: EuiDatePickerRangeValue) => void;

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
  value,
  onChange,
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

  const [currentValue, setCurrentValue] = useState<EuiDatePickerRangeValue>(
    () =>
      value || {
        startDate: startDateControl?.props.selected,
        endDate: endDateControl?.props.selected,
      }
  );

  useEffect(() => {
    if (value && currentValue !== value) {
      setCurrentValue(value);
    }
  }, [value, currentValue]);

  const handleChange = useCallback(
    (date: moment.Moment | null, key: keyof EuiDatePickerRangeValue) => {
      setCurrentValue((prevState) => ({
        ...prevState,
        [key]: date,
      }));
    },
    [setCurrentValue]
  );

  useUpdateEffect(() => {
    onChange?.(currentValue);
  }, [currentValue, onChange]);

  const describedById = useGeneratedHtmlId({
    prefix: 'euiDatePickerRange',
    suffix: 'description',
  });

  const emptyDateString = useEuiI18n(
    'euiDatePickerRange.inputsAriaDescribedByEmptyDate',
    'Empty date'
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
        selected: currentValue.startDate || startDateControl.props.selected,
        'aria-describedby':
          startDateControl.props['aria-describedby'] ?? describedById,
        className: classNames(
          'euiDatePickerRange__start',
          startDateControl.props.className
        ),
        onChange: (date: moment.Moment | null, event: SyntheticEvent<any>) => {
          startDateControl.props?.onChange?.(date, event);
          handleChange(date, 'startDate');
        },
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
        selected: currentValue.endDate || endDateControl.props.selected,
        'aria-describedby':
          endDateControl.props['aria-describedby'] ?? describedById,
        popoverPlacement: 'downRight',
        className: classNames(
          'euiDatePickerRange__end',
          endDateControl.props.className
        ),
        onChange: (date: moment.Moment | null, event: SyntheticEvent<any>) => {
          endDateControl.props?.onChange?.(date, event);
          handleChange(date, 'endDate');
        },
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
    <>
      <div className={classes} {...rest}>
        {children ? (
          children
        ) : (
          <>
            {startControl}
            {delimiter}
            {endControl}
          </>
        )}
      </div>
      {/* Custom ARIA description for start and end date inputs */}
      {!isCustom && (
        <p id={describedById} hidden>
          <EuiI18n
            token="euiDatePickerRange.inputsAriaDescribedBy"
            default="Selected range: {startDate} to {endDate}"
            values={{
              startDate:
                currentValue.startDate?.format('LLL') || emptyDateString,
              endDate: currentValue.endDate?.format('LLL') || emptyDateString,
            }}
          />
        </p>
      )}
    </>
  );
};
