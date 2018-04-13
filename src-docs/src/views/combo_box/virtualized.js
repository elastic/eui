import React, { Component } from 'react';

import {
  EuiComboBox,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [];
    for (let i=0; i < 5000; i++) {
      this.options.push({ label: `option${i}` });
    }

    this.state = {
      selectedOptions: [],
    };
  }

  onChange = (selectedOptions) => {
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
