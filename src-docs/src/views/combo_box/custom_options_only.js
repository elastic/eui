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
      value: searchValue,
      label: searchValue,
    };

    // Select the option.
    this.setState(prevState => ({
      selectedOptions: prevState.selectedOptions.concat(newOption),
    }));
  };

  render() {
    const { selectedOptions } = this.state;
    return (
      <EuiComboBox
        selectedOptions={selectedOptions}
        onCreateOption={this.onCreateOption}
      />
    );
  }
}
