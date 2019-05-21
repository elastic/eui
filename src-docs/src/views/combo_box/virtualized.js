import React, { Component } from 'react';

import { EuiComboBox } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [];
    let groupOptions = [];
    for (let i = 1; i < 5000; i++) {
      groupOptions.push({ label: `option${i}` });
      if (i % 25 === 0) {
        this.options.push({
          label: `Options ${i - (groupOptions.length - 1)} to ${i}`,
          options: groupOptions,
        });
        groupOptions = [];
      }
    }

    this.state = {
      selectedOptions: [],
    };
  }

  onChange = selectedOptions => {
    this.setState({
      selectedOptions,
    });
  };

  render() {
    const { selectedOptions } = this.state;
    return (
      <EuiComboBox
        placeholder="Select or create options"
        options={this.options}
        selectedOptions={selectedOptions}
        onChange={this.onChange}
      />
    );
  }
}
