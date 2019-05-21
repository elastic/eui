import React, { Component } from 'react';

import {
  EuiComboBox,
  EuiHighlight,
  EuiHealth,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [
      {
        value: {
          size: 5,
        },
        label: 'Titan',
        'data-test-subj': 'titanOption',
        color: 'primary',
      },
      {
        value: {
          size: 2,
        },
        label: 'Enceladus',
        color: 'secondary',
      },
      {
        value: {
          size: 15,
        },
        label: 'Mimas',
        color: '#DB1374',
      },
      {
        value: {
          size: 1,
        },
        label: 'Dione',
        color: 'accent',
      },
      {
        value: {
          size: 8,
        },
        label: 'Iapetus',
        color: 'primary',
        color: 'warning',
      },
      {
        value: {
          size: 2,
        },
        label: 'Phoebe',
        color: 'danger',
      },
      {
        value: {
          size: 33,
        },
        label: 'Rhea',
        color: 'default',
      },
      {
        value: {
          size: 18,
        },
        label:
          "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
        color: '#F98510',
      },
      {
        value: {
          size: 9,
        },
        label: 'Tethys',
        color: '#FEB6DB',
      },
      {
        value: {
          size: 4,
        },
        label: 'Hyperion',
        color: '#BFA180',
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
    return (
      <EuiHealth color={color}>
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
