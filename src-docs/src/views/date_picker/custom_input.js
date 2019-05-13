import React, { Component } from 'react';

import PropTypes from 'prop-types';

import moment from 'moment';

import { EuiDatePicker, EuiButton } from '../../../../src/components';

// Should be a component because the date picker does some ref stuff behind the scenes
// eslint-disable-next-line react/prefer-stateless-function
class ExampleCustomInput extends React.Component {
  render() {
    return (
      <EuiButton className="example-custom-input" onClick={this.props.onClick}>
        {this.props.value}
      </EuiButton>
    );
  }
}

ExampleCustomInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

// eslint-disable-next-line react/no-multi-comp
export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
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
