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
import { toSentenceCase } from '../../../../services/string/to_case';
import { EuiDatePopoverContentProps } from './date_popover_content';

export interface EuiAbsoluteTabProps {
  dateFormat: string;
  timeFormat: string;
  locale?: LocaleSpecifier;
  value: string;
  onChange: EuiDatePopoverContentProps['onChange'];
  roundUp: boolean;
  position: 'start' | 'end';
  utcOffset?: number;
}

interface EuiAbsoluteTabState {
  isTextInvalid: boolean;
  sentenceCasedPosition: string;
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

    const sentenceCasedPosition = toSentenceCase(props.position);

    const parsedValue = dateMath.parse(props.value, { roundUp: props.roundUp });
    const valueAsMoment =
      parsedValue && parsedValue.isValid() ? parsedValue : moment();

    const textInputValue = valueAsMoment
      .locale(this.props.locale || 'en')
      .format(this.props.dateFormat);

    this.state = {
      isTextInvalid: false,
      sentenceCasedPosition,
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
    const { onChange } = this.props;
    const valueAsMoment = moment(
      event.target.value,
      this.props.dateFormat,
      true
    );
    const dateIsValid = valueAsMoment.isValid();
    if (dateIsValid) {
      onChange(valueAsMoment.toISOString(), event);
    }
    this.setState({
      textInputValue: event.target.value,
      isTextInvalid: !dateIsValid,
      valueAsMoment: dateIsValid ? valueAsMoment : null,
    });
  };

  render() {
    const { dateFormat, timeFormat, locale, utcOffset } = this.props;
    const {
      valueAsMoment,
      isTextInvalid,
      textInputValue,
      sentenceCasedPosition,
    } = this.state;

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
        <EuiFormRow
          className="euiSuperDatePicker__absoluteDateFormRow"
          isInvalid={isTextInvalid}
          error={isTextInvalid ? `Expected format ${dateFormat}` : undefined}>
          <EuiFieldText
            compressed
            isInvalid={isTextInvalid}
            value={textInputValue}
            onChange={this.handleTextChange}
            data-test-subj={'superDatePickerAbsoluteDateInput'}
            prepend={<EuiFormLabel>{sentenceCasedPosition} date</EuiFormLabel>}
          />
        </EuiFormRow>
      </div>
    );
  }
}
