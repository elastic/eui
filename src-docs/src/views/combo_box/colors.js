import React, { Component } from 'react';

import { EuiComboBox } from '../../../../src/components';
import { euiPaletteColorBlindBehindText } from '../../../../src/services';

export default class extends Component {
  constructor(props) {
    super(props);

    this.visColorsBehindText = euiPaletteColorBlindBehindText();

    this.options = [
      {
        label: 'Titan',
        'data-test-subj': 'titanOption',
        color: this.visColorsBehindText[0],
      },
      {
        label: 'Enceladus',
        color: this.visColorsBehindText[1],
      },
      {
        label: 'Mimas',
        color: this.visColorsBehindText[2],
      },
      {
        label: 'Dione',
        color: this.visColorsBehindText[3],
      },
      {
        label: 'Iapetus',
        color: this.visColorsBehindText[4],
      },
      {
        label: 'Phoebe',
        color: this.visColorsBehindText[5],
      },
      {
        label: 'Rhea',
        color: this.visColorsBehindText[6],
      },
      {
        label:
          "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
        color: this.visColorsBehindText[7],
      },
      {
        label: 'Tethys',
        color: this.visColorsBehindText[8],
      },
      {
        label: 'Hyperion',
        color: this.visColorsBehindText[9],
      },
    ];

    this.state = {
      selectedOptions: [this.options[2], this.options[5]],
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
