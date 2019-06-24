import PropTypes from 'prop-types';
import React, { Component } from 'react';

import moment from 'moment';

import dateMath from '@elastic/datemath';

import { EuiDatePicker } from '../../date_picker';
import { EuiFormRow, EuiFieldText, EuiFormLabel } from '../../../form';
import { toSentenceCase } from '../../../../services/string/to_case';

const INPUT_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';

export class EuiAbsoluteTab extends Component {
  constructor(props) {
    super(props);

    const parsedValue = dateMath.parse(props.value, { roundUp: props.roundUp });
    const valueAsMoment =
      parsedValue && parsedValue.isValid() ? parsedValue : moment();
    const sentenceCasedPosition = toSentenceCase(props.position);

    this.state = {
      valueAsMoment,
      textInputValue: valueAsMoment.format(INPUT_DATE_FORMAT),
      isTextInvalid: false,
      sentenceCasedPosition,
    };
  }

  handleChange = date => {
    this.props.onChange(date.toISOString());
    this.setState({
      valueAsMoment: date,
      textInputValue: date.format(INPUT_DATE_FORMAT),
      isTextInvalid: false,
    });
  };

  handleTextChange = evt => {
    const date = moment(evt.target.value, INPUT_DATE_FORMAT, true);
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
        />
        <EuiFormRow
          className="euiDatePopoverContent__padded"
          isInvalid={this.state.isTextInvalid}
          error={
            this.state.isTextInvalid
              ? `Expected format ${INPUT_DATE_FORMAT}`
              : undefined
          }>
          <EuiFieldText
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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  roundUp: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(['start', 'end']),
};
