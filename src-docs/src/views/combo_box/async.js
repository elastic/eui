import React, { Component } from 'react';

import {
  EuiComboBox,
} from '../../../../src/components';

const allOptions = [{
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

    this.state = {
      isLoading: false,
      isPopoverOpen: false,
      selectedOptions: [],
      options: [],
    };
  }

  onChange = (selectedOptions) => {
    this.setState({
      selectedOptions,
    });
  };

  onSearchChange = (searchValue) => {
    this.setState({
      isLoading: true,
      options: [],
    });

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      // Simulate a remotely-executed search.
      this.setState({
        isLoading: false,
        options: allOptions.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase())),
      });
    }, 1200);
  }

  onCreateOption = (searchValue, flattenedOptions) => {
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
      allOptions.push(newOption);
      this.setState(prevState => ({
        options: prevState.options.concat(newOption),
      }));
    }

    // Select the option.
    this.setState(prevState => ({
      selectedOptions: prevState.selectedOptions.concat(newOption),
    }));
  };

  componentDidMount() {
    // Simulate initial load.
    this.onSearchChange('');
  }

  render() {
    const { selectedOptions, isLoading, options } = this.state;

    return (
      <EuiComboBox
        placeholder="Search asynchronously"
        async
        options={options}
        selectedOptions={selectedOptions}
        isLoading={isLoading}
        onChange={this.onChange}
        onSearchChange={this.onSearchChange}
        onCreateOption={this.onCreateOption}
      />
    );
  }
}
