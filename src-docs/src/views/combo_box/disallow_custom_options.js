import React, { Component } from 'react';

import { EuiComboBox } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [
      {
        label: 'Titan',
        'data-test-subj': 'titanOption',
      },
      {
        label: 'Enceladus',
      },
      {
        label: 'Mimas',
      },
      {
        label: 'Dione',
      },
      {
        label: 'Iapetus',
      },
      {
        label: 'Phoebe',
      },
      {
        label: 'Rhea',
      },
      {
        label:
          "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
      },
      {
        label: 'Tethys',
      },
      {
        label: 'Hyperion',
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

  render() {
    return (
      <EuiComboBox
        placeholder="Select from a list of options"
        options={this.options}
        selectedOptions={this.state.selectedOptions}
        onChange={this.onChange}
      />
    );
  }
}
