import React, { Component } from 'react';

import {
  EuiComboBox,
  EuiFormRow,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [{
      label: 'Titan',
      'data-test-subj': 'titanOption',
    }, {
      label: 'Enceladus',
    }, {
      label: 'Mimas',
    }, {
      label: 'Dione',
    }, {
      label: 'Iapetus',
    }, {
      label: 'Phoebe',
    }, {
      label: 'Rhea',
    }, {
      label: 'Pandora is one of Saturn\'s moons, named for a Titaness of Greek mythology',
    }, {
      label: 'Tethys',
    }, {
      label: 'Hyperion',
    }];

    this.state = {
      error: undefined,
      selectedOptions: [this.options[2], this.options[4]],
    };
  }

  onChange = (selectedOptions) => {
    this.setState({
      error: undefined,
      selectedOptions,
    });
  }

  onSearchChange = (value, hasMatchingOptions) => {
    this.setState({
      error: value.length === 0 || hasMatchingOptions ? undefined : `"${value}" is not a valid option`,
    });
  }

  onBlur = () => {
    const { value } = this.inputRef;
    this.setState({
      error: value.length === 0 ? undefined : `"${value}" is not a valid option`,
    });
  }

  setInputRef = ref => this.inputRef = ref;

  render() {
    return (
      <EuiFormRow error={this.state.error} isInvalid={this.state.error !== undefined}>
        <EuiComboBox
          placeholder="Select from a list of options"
          options={this.options}
          selectedOptions={this.state.selectedOptions}
          inputRef={this.setInputRef}
          onChange={this.onChange}
          onSearchChange={this.onSearchChange}
          onBlur={this.onBlur}
        />
      </EuiFormRow>
    );
  }
}
