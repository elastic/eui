import React, { Component } from 'react';

import { EuiComboBox } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [
      {
        label: 'Titan',
        'data-test-subj': 'titanOption',
        color: 'primary',
      },
      {
        label: 'Enceladus',
        color: 'secondary',
      },
      {
        label: 'Mimas',
        color: '#D36086',
      },
      {
        label: 'Dione',
        color: 'accent',
      },
      {
        label: 'Iapetus',
        color: 'warning',
      },
      {
        label: 'Phoebe',
        color: 'danger',
      },
      {
        label: 'Rhea',
        color: 'default',
      },
      {
        label:
          "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
        color: '#DA8B45',
      },
      {
        label: 'Tethys',
        color: '#CA8EAE',
      },
      {
        label: 'Hyperion',
        color: '#B9A888',
      },
    ];

    this.state = {
      selectedOptions: [this.options[2], this.options[4]],
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
