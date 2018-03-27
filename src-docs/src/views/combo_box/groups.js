import React, { Component } from 'react';

import {
  EuiComboBox,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    const colorGroup = {
      label: 'Colors',
      options: [{
        value: 'red',
        label: 'Red',
      }, {
        value: 'blue',
        label: 'Blue',
      }, {
        value: 'yellow',
        label: 'Yellow',
      }, {
        value: 'green',
        label: 'Green',
      }],
    };

    const soundGroup = {
      label: 'Sounds',
      options: [{
        value: 'pop',
        label: 'Pop',
      }, {
        value: 'hiss',
        label: 'Hiss',
      }, {
        value: 'screech',
        label: 'Screech',
      }, {
        value: 'ding',
        label: 'Ding',
      }],
    };

    this.options = [colorGroup, soundGroup];

    this.state = {
      searchValue: '',
      isPopoverOpen: false,
      selectedOptions: [colorGroup.options[2], soundGroup.options[3]],
    };
  }

  onChange = (selectedOptions) => {
    // TODO: Encapsulate searchValue within the combo box.
    this.setState({
      searchValue: '',
      selectedOptions,
    });
  };

  onSearchChange = (searchValue) => {
    this.setState({
      searchValue,
    });
  };

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
      if (this.options[this.options.length - 1].label !== 'Custom') {
        this.options.push({
          label: 'Custom',
          options: [],
        });
      }

      this.options[this.options.length - 1].options.push(newOption);
    }

    // Select the option.
    this.setState(prevState => ({
      searchValue: '',
      selectedOptions: prevState.selectedOptions.concat(newOption),
    }));
  };

  render() {
    const { searchValue, selectedOptions } = this.state;
    return (
      <EuiComboBox
        options={this.options}
        selectedOptions={selectedOptions}
        onChange={this.onChange}
        onSearchChange={this.onSearchChange}
        onCreateOption={this.onCreateOption}
        searchValue={searchValue}
      />
    );
  }
}
