/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, ChangeEventHandler } from 'react';

import moment, { Moment, LocaleSpecifier } from 'moment'; // eslint-disable-line import/named

import dateMath from '@elastic/datemath';

import { EuiDatePicker, EuiDatePickerProps } from '../../date_picker';
import { EuiFormRow, EuiFieldText, EuiFormLabel } from '../../../form';
import { EuiCode } from '../../../code';
import { EuiI18n } from '../../../i18n';
import { EuiDatePopoverContentProps } from './date_popover_content';

// Allow users to paste in and have the datepicker parse multiple common date formats,
// in addition to the configured displayed `dateFormat` prop
const ALLOWED_USER_DATE_FORMATS = [
  moment.ISO_8601,
  moment.RFC_2822,
  'X', // Unix timestamp in seconds
];

export interface EuiAbsoluteTabProps {
  dateFormat: string;
  timeFormat: string;
  locale?: LocaleSpecifier;
  value: string;
  onChange: EuiDatePopoverContentProps['onChange'];
  roundUp: boolean;
  position: 'start' | 'end';
  labelPrefix: string;
  utcOffset?: number;
}

interface EuiAbsoluteTabState {
  isTextInvalid: boolean;
  textInputValue: string;
  valueAsMoment: Moment | null;
}

export class EuiAbsoluteTab extends Component<
  EuiAbsoluteTabProps,
  EuiAbsoluteTabState
> {
  state: EuiAbsoluteTabState;

  constructor(props: EuiAbsoluteTabProps) {
    super(props);

    const parsedValue = dateMath.parse(props.value, { roundUp: props.roundUp });
    const valueAsMoment =
      parsedValue && parsedValue.isValid() ? parsedValue : moment();

    const textInputValue = valueAsMoment
      .locale(this.props.locale || 'en')
      .format(this.props.dateFormat);

    this.state = {
      isTextInvalid: false,
      textInputValue,
      valueAsMoment,
    };
  }

  handleChange: EuiDatePickerProps['onChange'] = (date, event) => {
    const { onChange } = this.props;
    if (date === null) {
      return;
    }
    onChange(date.toISOString(), event);

    const valueAsMoment = moment(date);
    this.setState({
      valueAsMoment,
      textInputValue: valueAsMoment.format(this.props.dateFormat),
      isTextInvalid: false,
    });
  };

  handleTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { onChange, dateFormat } = this.props;
    const userInput = event.target.value;

    const valueAsMoment = moment(
      userInput,
      [dateFormat, ...ALLOWED_USER_DATE_FORMATS],
      true
    );
    const dateIsValid = valueAsMoment.isValid();
    if (dateIsValid) {
      onChange(valueAsMoment.toISOString(), event);
    }
    this.setState({
      textInputValue: dateIsValid
        ? valueAsMoment.format(this.props.dateFormat)
        : userInput,
      isTextInvalid: !dateIsValid,
      valueAsMoment: dateIsValid ? valueAsMoment : null,
    });
  };

  render() {
    const { dateFormat, timeFormat, locale, utcOffset, labelPrefix } =
      this.props;
    const { valueAsMoment, isTextInvalid, textInputValue } = this.state;

    return (
      <div>
        <EuiDatePicker
          inline
          showTimeSelect
          shadow={false}
          selected={valueAsMoment}
          onChange={this.handleChange}
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          locale={locale}
          utcOffset={utcOffset}
        />
        <EuiI18n
          token="euiAbsoluteTab.dateFormatError"
          default="Allowed formats: {dateFormat}, ISO 8601, RFC 2822, or Unix timestamp"
          values={{ dateFormat: <EuiCode>{dateFormat}</EuiCode> }}
        >
          {(dateFormatError: string) => (
            <EuiFormRow
              className="euiSuperDatePicker__absoluteDateFormRow"
              isInvalid={isTextInvalid}
              error={isTextInvalid ? dateFormatError : undefined}
            >
              <EuiFieldText
                compressed
                isInvalid={isTextInvalid}
                value={textInputValue}
                onChange={this.handleTextChange}
                data-test-subj={'superDatePickerAbsoluteDateInput'}
                prepend={<EuiFormLabel>{labelPrefix}</EuiFormLabel>}
              />
            </EuiFormRow>
          )}
        </EuiI18n>
      </div>
    );
  }
}
