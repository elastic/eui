import React, { Component } from 'react';

import {
  EuiComboBox,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [{
      value: 'titan',
      label: 'Titan',
      'data-test-subj': 'titanOption',
      color: 'primary',
    }, {
      value: 'enceladus',
      label: 'Enceladus',
      color: 'secondary',
    }, {
      value: 'mimas',
      label: 'Mimas',
      color: '#DB1374',
    }, {
      value: 'dione',
      label: 'Dione',
      color: 'accent',
    }, {
      value: 'iapetus',
      label: 'Iapetus',
      color: 'primary',
      color: 'warning',
    }, {
      value: 'phoebe',
      label: 'Phoebe',
      color: 'danger',
    }, {
      value: 'rhea',
      label: 'Rhea',
      color: 'default',
    }, {
      value: 'pandora',
      label: 'Pandora is one of Saturn\'s moons, named for a Titaness of Greek mythology',
      color: '#F98510',
    }, {
      value: 'tethys',
      label: 'Tethys',
      color: '#FEB6DB',
    }, {
      value: 'hyperion',
      label: 'Hyperion',
      color: '#BFA180',
    }];

    this.state = {
      selectedOptions: [this.options[2], this.options[4]],
    };
  }

  onChange = (selectedOptions) => {
    this.setState({
      selectedOptions,
    });
  };

  onCreateOption =(searchValue, flattenedOptions) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      value: searchValue,
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (flattenedOptions.findIndex(option =>
      option.value.trim().toLowerCase() === normalizedSearchValue
    ) === -1) {
      this.options.push(newOption);
    }

    // Select the option.
    this.setState(prevState => ({
      selectedOptions: prevState.selectedOptions.concat(newOption),
    }));
  };

  render() {
    const { selectedOptions } = this.state;
    return (
      <EuiComboBox
        placeholder="Select or create options"
        options={this.options}
        selectedOptions={selectedOptions}
        onChange={this.onChange}
        onCreateOption={this.onCreateOption}
      />
    );
  }
}
