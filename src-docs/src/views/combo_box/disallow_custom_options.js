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
      selectedOptions,
    });
  }

  onBlur = () => {
    const { value } = this.inputRef;
    if (value.length !== 0) {
      this.setState({
        error: `"${value}" is not a valid option`,
      });
    }
  }

  clearError = () => this.setState({ error: undefined });

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
          onBlur={this.onBlur}
          onFocus={this.clearError}
        />
      </EuiFormRow>
    );
  }
}
