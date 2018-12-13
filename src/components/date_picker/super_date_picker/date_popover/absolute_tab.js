import PropTypes from 'prop-types';
import React, { Component } from 'react';

import moment from 'moment';

import dateMath from '@elastic/datemath';

import { EuiDatePicker } from '../../date_picker';
import { EuiFormRow, EuiFieldText } from '../../../form';

const INPUT_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';

const toMoment = (value, roundUp) => {
  const valueAsMoment = dateMath.parse(value, { roundUp });
  return {
    valueAsMoment,
    textInputValue: valueAsMoment.format(INPUT_DATE_FORMAT)
  };
};

export class EuiAbsoluteTab extends Component {

  state = {}

  static getDerivedStateFromProps = (nextProps) => {
    return {
      ...toMoment(nextProps.value, nextProps.roundUp),
      isTextInvalid: false,
    };
  }

  handleChange = (date) => {
    this.props.onChange(date.toISOString());
  }

  handleTextChange = (evt) => {
    const date = moment(evt.target.value, INPUT_DATE_FORMAT, true);
    if (date.isValid()) {
      this.props.onChange(date.toISOString());
    }

    this.setState({
      textInputValue: evt.target.value,
      isTextInvalid: !date.isValid()
    });
  }

  render() {
    return (
      <div style={{ width: 390, padding: 0 }}>
        <EuiDatePicker
          inline
          showTimeSelect
          shadow={false}
          selected={this.state.value}
          onChange={this.handleChange}
        />
        <EuiFormRow
          style={{ padding: '0 8px 8px' }}
          isInvalid={this.state.isTextInvalid}
          error={this.state.isTextInvalid ? `Expected format ${INPUT_DATE_FORMAT}` : undefined}
        >
          <EuiFieldText
            isInvalid={this.state.isTextInvalid}
            value={this.state.textInputValue}
            onChange={this.handleTextChange}
            data-test-subj={`superDatePickerAbsoluteDateInput`}
          />
        </EuiFormRow>
      </div>
    );
  }
}

EuiAbsoluteTab.propTypes = {
  dateFormat: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  roundUp: PropTypes.bool.isRequired,
};
