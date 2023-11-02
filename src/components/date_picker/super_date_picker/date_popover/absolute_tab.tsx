/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, ChangeEvent } from 'react';

import moment, { Moment, LocaleSpecifier } from 'moment'; // eslint-disable-line import/named

import dateMath from '@elastic/datemath';

import { EuiFormRow, EuiFieldText, EuiFormLabel } from '../../../form';
import { EuiCode } from '../../../code';
import { EuiI18n } from '../../../i18n';

import { EuiDatePicker, EuiDatePickerProps } from '../../date_picker';
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

  handleChange: EuiDatePickerProps['onChange'] = (date) => {
    const { onChange } = this.props;
    if (date === null) {
      return;
    }
    onChange(date.toISOString());

    const valueAsMoment = moment(date);
    this.setState({
      valueAsMoment,
      textInputValue: valueAsMoment.format(this.props.dateFormat),
      isTextInvalid: false,
    });
  };

  debouncedTypeTimeout: ReturnType<typeof setTimeout> | undefined;

  handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ textInputValue: event.target.value });

    // Add a debouncer that gives the user some time to finish typing
    // before attempting to parse the text as a timestamp. Otherwise,
    // typing a single digit gets parsed as a unix timestamp 😬
    clearTimeout(this.debouncedTypeTimeout);
    this.debouncedTypeTimeout = setTimeout(this.parseUserDateInput, 1000); // 1 second debounce
  };

  parseUserDateInput = () => {
    const { onChange, dateFormat } = this.props;
    const { textInputValue } = this.state;

    const invalidDateState = {
      isTextInvalid: true,
      valueAsMoment: null,
    };
    if (!textInputValue) {
      return this.setState(invalidDateState);
    }

    // Attempt to parse with passed `dateFormat`
    let valueAsMoment = moment(textInputValue, dateFormat, true);
    let dateIsValid = valueAsMoment.isValid();

    // If not valid, try a few other other standardized formats
    if (!dateIsValid) {
      valueAsMoment = moment(textInputValue, ALLOWED_USER_DATE_FORMATS, true);
      dateIsValid = valueAsMoment.isValid();
    }

    if (dateIsValid) {
      onChange(valueAsMoment.toISOString());
      this.setState({
        textInputValue: valueAsMoment.format(this.props.dateFormat),
        isTextInvalid: false,
        valueAsMoment: valueAsMoment,
      });
    } else {
      this.setState(invalidDateState);
    }
  };

  render() {
    const { dateFormat, timeFormat, locale, utcOffset, labelPrefix } =
      this.props;
    const { valueAsMoment, isTextInvalid, textInputValue } = this.state;

    return (
      <>
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
                data-test-subj="superDatePickerAbsoluteDateInput"
                prepend={<EuiFormLabel>{labelPrefix}</EuiFormLabel>}
              />
            </EuiFormRow>
          )}
        </EuiI18n>
      </>
    );
  }
}
