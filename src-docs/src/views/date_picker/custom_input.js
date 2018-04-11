import React, {
  Component,
} from 'react';

import PropTypes from 'prop-types';

import moment from 'moment';

import {
  EuiDatePicker,
  EuiButton,
} from '../../../../src/components';

export const ExampleCustomInput = ({
  value,
  onClick,
}) => {
  return (
    <EuiButton
      className="example-custom-input"
      onClick={onClick}
    >
      {value}
    </EuiButton>
  );
}

ExampleCustomInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

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
      <EuiDatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        customInput={<ExampleCustomInput />}
      />
    );
  }
}
