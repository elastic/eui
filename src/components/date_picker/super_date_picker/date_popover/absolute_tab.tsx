import React, { Component, ChangeEventHandler } from 'react';

import moment, { Moment, LocaleSpecifier } from 'moment'; // eslint-disable-line import/named

import dateMath from '@elastic/datemath';

import { EuiDatePicker } from '../../date_picker';
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

  handleChange: EuiDatePopoverContentProps['onChange'] = (date, event) => {
    const { onChange } = this.props;
    if (date === null) {
      return;
    }
    onChange(typeof date === 'string' ? date : date.toISOString(), event);

    const valueAsMoment = moment(date);
    this.setState({
      valueAsMoment,
      textInputValue: valueAsMoment.format(this.props.dateFormat),
      isTextInvalid: false,
    });
  };

  handleTextChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { onChange } = this.props;
    const valueAsMoment = moment(
      event.target.value,
      this.props.dateFormat,
      true
    );
    const dateIsValid = valueAsMoment.isValid();
    if (dateIsValid) {
      onChange(valueAsMoment, event);
    }
    this.setState({
      textInputValue: event.target.value as string,
      isTextInvalid: !dateIsValid,
      valueAsMoment: dateIsValid ? valueAsMoment : null,
    });
  };

  render() {
    return (
      <div>
        <EuiDatePicker
          inline
          showTimeSelect
          shadow={false}
          selected={this.state.valueAsMoment}
          onChange={this.handleChange}
          dateFormat={this.props.dateFormat}
          timeFormat={this.props.timeFormat}
          locale={this.props.locale}
        />
        <EuiFormRow
          className="euiSuperDatePicker__absoluteDateFormRow"
          isInvalid={this.state.isTextInvalid}
          error={
            this.state.isTextInvalid
              ? `Expected format ${this.props.dateFormat}`
              : undefined
          }>
          <EuiFieldText
            compressed
            isInvalid={this.state.isTextInvalid}
            value={this.state.textInputValue}
            onChange={this.handleTextChange}
            data-test-subj={'superDatePickerAbsoluteDateInput'}
            prepend={
              <EuiFormLabel>
                {this.state.sentenceCasedPosition} date
              </EuiFormLabel>
            }
          />
        </EuiFormRow>
      </div>
    );
  }
}
