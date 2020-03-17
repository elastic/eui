import PropTypes from 'prop-types';
import React, { Component } from 'react';

import moment from 'moment';

import dateMath from '@elastic/datemath';

import { EuiDatePicker } from '../../date_picker';
import { EuiFormRow, EuiFieldText, EuiFormLabel } from '../../../form';
import { toSentenceCase } from '../../../../services/string/to_case';

export class EuiAbsoluteTab extends Component {
  constructor(props) {
    super(props);

    const parsedValue = dateMath.parse(props.value, { roundUp: props.roundUp });
    const valueAsMoment =
      parsedValue && parsedValue.isValid() ? parsedValue : moment();
    const sentenceCasedPosition = toSentenceCase(props.position);

    this.state = {
      valueAsMoment,
      textInputValue: valueAsMoment
        .locale(this.props.locale || 'en')
        .format(this.props.dateFormat),
      isTextInvalid: false,
      sentenceCasedPosition,
    };
  }

  handleChange = date => {
    this.props.onChange(date.toISOString());
    this.setState({
      valueAsMoment: date,
      textInputValue: date.format(this.props.dateFormat),
      isTextInvalid: false,
    });
  };

  handleTextChange = evt => {
    const { dateFormat } = this.props;

    let newVal = evt.target.value.split('');
    const letterNumber = /^[0-9a-zA-Z]/;

    // eslint-disable-next-line guard-for-in
    for (let i = 0; i < dateFormat.length; i++) {
      const ch = dateFormat[i];
      if (i >= newVal.length - 1 && ch !== 'M') {
        if (ch.match(letterNumber)) {
          newVal.push(0);
        } else {
          newVal.push(ch);
        }
      }
    }

    newVal = newVal.join('');
    const date = moment(newVal, dateFormat, true);

    const updatedState = {
      textInputValue: evt.target.value,
      isTextInvalid: !date.isValid(),
    };
    if (date.isValid()) {
      this.props.onChange(date.toISOString());
      updatedState.valueAsMoment = date;
    }

    this.setState(updatedState);
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

EuiAbsoluteTab.propTypes = {
  dateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  locale: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  roundUp: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(['start', 'end']),
};
