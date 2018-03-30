import React, { Component } from 'react';

import {
  EuiComboBox,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptions: [],
    };
  }

  onCreateOption = (searchValue) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Select the option.
    this.setState(prevState => ({
      selectedOptions: prevState.selectedOptions.concat(newOption),
    }));
  };

  onChange = (selectedOptions) => {
    this.setState({
      selectedOptions,
    });
  };

  render() {
    const { selectedOptions } = this.state;
    return (
      <EuiComboBox
        noSuggestions
        placeholder="Create some tags"
        selectedOptions={selectedOptions}
        onCreateOption={this.onCreateOption}
        onChange={this.onChange}
      />
    );
  }
}
