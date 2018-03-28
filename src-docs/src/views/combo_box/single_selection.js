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
      selectedOption: undefined,
    };
  }

  onChange = (selectedOption) => {
    this.setState({
      selectedOption,
    });
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <EuiComboBox
        placeholder="Select a single option"
        singleSelection
        options={this.options}
        selectedOptions={selectedOption}
        onChange={this.onChange}
      />
    );
  }
}
