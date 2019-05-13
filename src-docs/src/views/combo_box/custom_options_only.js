import React, { Component } from 'react';

import { EuiComboBox, EuiFormRow } from '../../../../src/components';

const isValid = value => {
  // Only allow letters. No spaces, numbers, or special characters.
  return value.match(/^[a-zA-Z]+$/) !== null;
};

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInvalid: false,
      selectedOptions: [],
    };
  }

  onCreateOption = searchValue => {
    if (!isValid(searchValue)) {
      // Return false to explicitly reject the user's input.
      return false;
    }

    const newOption = {
      label: searchValue,
    };

    // Select the option.
    this.setState(prevState => ({
      selectedOptions: prevState.selectedOptions.concat(newOption),
    }));
  };

  onSearchChange = searchValue => {
    if (!searchValue) {
      this.setState({
        isInvalid: false,
      });

      return;
    }

    this.setState({
      isInvalid: !isValid(searchValue),
    });
  };

  onChange = selectedOptions => {
    this.setState({
      selectedOptions,
      isInvalid: false,
    });
  };

  render() {
    const { selectedOptions, isInvalid } = this.state;
    return (
      <EuiFormRow
        label="Only custom options"
        isInvalid={isInvalid}
        error={isInvalid ? 'Only letters are allowed' : undefined}>
        <EuiComboBox
          noSuggestions
          placeholder="Create some tags (letters only)"
          selectedOptions={selectedOptions}
          onCreateOption={this.onCreateOption}
          onChange={this.onChange}
          onSearchChange={this.onSearchChange}
          isInvalid={isInvalid}
        />
      </EuiFormRow>
    );
  }
}
