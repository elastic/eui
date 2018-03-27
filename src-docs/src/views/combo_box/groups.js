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
      isPopoverOpen: false,
      selectedOptions: [colorGroup.options[2], soundGroup.options[3]],
    };
  }

  onChange = (selectedOptions) => {
    this.setState({
      selectedOptions,
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
      selectedOptions: prevState.selectedOptions.concat(newOption),
    }));
  };

  render() {
    return (
      <EuiComboBox
        options={this.options}
        selectedOptions={this.state.selectedOptions}
        onChange={this.onChange}
        onCreateOption={this.onCreateOption}
      />
    );
  }
}
