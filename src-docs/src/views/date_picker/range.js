
import React, {
  Component,
} from 'react';

import moment from 'moment';

import {
  EuiDatePicker,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      endDate: moment().add(11, 'd'),
    };

    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
  }

  render() {
    return (
      <div>
        <EuiDatePicker
          selected={this.state.startDate}
          onChange={this.handleChangeStart}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          showTimeSelect
        />
        <EuiDatePicker
          selected={this.state.endDate}
          onChange={this.handleChangeEnd}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          showTimeSelect
        />
      </div>
    );
  }
}
