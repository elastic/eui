import React, { Component } from 'react';

import {
  EuiComboBox,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [{
      value: 'titan',
      label: 'Titan',
      'data-test-subj': 'titanOption',
    }, {
      value: 'enceladus',
      label: 'Enceladus',
    }, {
      value: 'mimas',
      label: 'Mimas',
    }, {
      value: 'dione',
      label: 'Dione',
    }, {
      value: 'iapetus',
      label: 'Iapetus',
    }, {
      value: 'phoebe',
      label: 'Phoebe',
    }, {
      value: 'rhea',
      label: 'Rhea',
    }, {
      value: 'pandora',
      label: 'Pandora is one of Saturn\'s moons, named for a Titaness of Greek mythology',
    }, {
      value: 'tethys',
      label: 'Tethys',
    }, {
      value: 'hyperion',
      label: 'Hyperion',
    }];

    this.state = {
      searchValue: '',
      isPopoverOpen: false,
      selectedOptions: [this.options[2], this.options[4]],
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

  onCreateOption = () => {
    const { searchValue } = this.state;
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return false;
    }

    // Don't do anything if the option already exists.
    if (this.options.findIndex(option =>
      option.value.trim().toLowerCase() === normalizedSearchValue
    ) !== -1) {
      return false;
    }

    const newOption = {
      value: searchValue,
      label: searchValue,
    };

    this.options.push(newOption);

    this.setState(prevState => ({
      searchValue: '',
      selectedOptions: prevState.selectedOptions.concat(newOption),
    }));

    return true;
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
