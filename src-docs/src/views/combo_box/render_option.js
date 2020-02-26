import React, { Component } from 'react';

import {
  EuiComboBox,
  EuiHighlight,
  EuiHealth,
} from '../../../../src/components';
import {
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText,
} from '../../../../src/services';

export default class extends Component {
  constructor(props) {
    super(props);

    this.visColors = euiPaletteColorBlind();
    this.visColorsBehindText = euiPaletteColorBlindBehindText();

    this.options = [
      {
        value: {
          size: 5,
        },
        label: 'Titan',
        'data-test-subj': 'titanOption',
        color: this.visColorsBehindText[0],
      },
      {
        value: {
          size: 2,
        },
        label: 'Enceladus',
        color: this.visColorsBehindText[1],
      },
      {
        value: {
          size: 15,
        },
        label: 'Mimas',
        color: this.visColorsBehindText[2],
      },
      {
        value: {
          size: 1,
        },
        label: 'Dione',
        color: this.visColorsBehindText[3],
      },
      {
        value: {
          size: 8,
        },
        label: 'Iapetus',
        color: this.visColorsBehindText[4],
      },
      {
        value: {
          size: 2,
        },
        label: 'Phoebe',
        color: this.visColorsBehindText[5],
      },
      {
        value: {
          size: 33,
        },
        label: 'Rhea',
        color: this.visColorsBehindText[6],
      },
      {
        value: {
          size: 18,
        },
        label:
          "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
        color: this.visColorsBehindText[7],
      },
      {
        value: {
          size: 9,
        },
        label: 'Tethys',
        color: this.visColorsBehindText[8],
      },
      {
        value: {
          size: 4,
        },
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
      value: searchValue,
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

  renderOption = (option, searchValue, contentClassName) => {
    const { color, label, value } = option;
    const dotColor = this.visColors[this.visColorsBehindText.indexOf(color)];
    return (
      <EuiHealth color={dotColor}>
        <span className={contentClassName}>
          <EuiHighlight search={searchValue}>{label}</EuiHighlight>
          &nbsp;
          <span>({value.size})</span>
        </span>
      </EuiHealth>
    );
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
        renderOption={this.renderOption}
      />
    );
  }
}
