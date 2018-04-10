import React, {
  Component,
} from 'react';

import moment from 'moment';

import {
  EuiDatePicker,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

export default class extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startDate: moment()
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <div>
        <EuiFormRow label="Only allow a certain range of dates">
          <EuiDatePicker
            showTimeSelect
            selected={this.state.startDate}
            onChange={this.handleChange}
            minDate={moment().subtract(2, "days")}
            maxDate={moment().add(5, "days")}
          />
        </EuiFormRow>

        <EuiSpacer />

        <EuiFormRow label="Only allow a certain range of times">
          <EuiDatePicker
            showTimeSelect
            selected={this.state.startDate}
            onChange={this.handleChange}
            minTime={moment().hours(17).minutes(0)}
            maxTime={moment().hours(20).minutes(30)}
          />
        </EuiFormRow>

      </div>
    );
  }
}
