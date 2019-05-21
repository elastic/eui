import React, { Component } from 'react';

import { EuiComboBox } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    const colorGroup = {
      label: 'Colors',
      options: [
        {
          label: 'Red',
        },
        {
          label: 'Blue',
        },
        {
          label: 'Yellow',
        },
        {
          label: 'Green',
        },
      ],
    };

    const soundGroup = {
      label: 'Sounds',
      options: [
        {
          label: 'Pop',
        },
        {
          label: 'Hiss',
        },
        {
          label: 'Screech',
        },
        {
          label: 'Ding',
        },
      ],
    };

    this.options = [colorGroup, soundGroup];

    this.state = {
      selectedOptions: [colorGroup.options[2], soundGroup.options[3]],
    };
  }

  onChange = selectedOptions => {
    this.setState({
      selectedOptions,
    });
  };

  onCreateOption = (searchValue, flattenedOptions = []) => {
    if (!searchValue) {
      return;
    }

    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        option => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
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
        placeholder="These options are grouped"
        options={this.options}
        selectedOptions={this.state.selectedOptions}
        onChange={this.onChange}
        onCreateOption={this.onCreateOption}
      />
    );
  }
}
