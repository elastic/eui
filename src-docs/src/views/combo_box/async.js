import React, { Component } from 'react';

import {
  EuiComboBox,
} from '../../../../src/components';

const options = [{
  value: 'titan',
  label: 'Titan',
  'data-test-subj': 'titanOption',
}, {
  value: 'enceladus',
  label: 'Enceladus',
}, {
  value: 'mimas',
  label: 'Mimas',
}, {
  value: 'dione',
  label: 'Dione',
}, {
  value: 'iapetus',
  label: 'Iapetus',
}, {
  value: 'phoebe',
  label: 'Phoebe',
}, {
  value: 'rhea',
  label: 'Rhea',
}, {
  value: 'pandora',
  label: 'Pandora is one of Saturn\'s moons, named for a Titaness of Greek mythology',
}, {
  value: 'tethys',
  label: 'Tethys',
}, {
  value: 'hyperion',
  label: 'Hyperion',
}];

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = options.slice();

    this.state = {
      isLoading: false,
      isPopoverOpen: false,
      selectedOptions: [this.options[2], this.options[4]],
    };
  }

  onChange = (selectedOptions) => {
    this.setState({
      selectedOptions,
    });
  };

  onSearchChange = (searchValue) => {
    this.options = [];

    this.setState({
      isLoading: true,
    });

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.options = options.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase()));
      this.setState({
        isLoading: false,
      });
    }, 1200);
  }

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
      // Simulate creating this option on the server.
      options.push(newOption);
      this.options.push(newOption);
    }

    // Select the option.
    this.setState(prevState => ({
      selectedOptions: prevState.selectedOptions.concat(newOption),
    }));
  };

  render() {
    const { selectedOptions, isLoading } = this.state;

    return (
      <EuiComboBox
        async
        options={this.options}
        selectedOptions={selectedOptions}
        isLoading={isLoading}
        onChange={this.onChange}
        onSearchChange={this.onSearchChange}
        onCreateOption={this.onCreateOption}
      />
    );
  }
}
