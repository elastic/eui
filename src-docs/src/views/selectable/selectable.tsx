import React, { Component, Fragment } from 'react';

import { EuiSelectable } from '../../../../src/components/selectable';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [
      {
        label: 'Titan',
        'data-test-subj': 'titanOption',
      },
      {
        label: 'Enceladus is disabled',
        disabled: true,
      },
      {
        label: 'Mimas',
        checked: 'on',
      },
      {
        label: 'Dione',
      },
      {
        label: 'Iapetus',
        checked: 'on',
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
    const { selectedOptions } = this.state;

    return (
      <EuiSelectable
        searchable
        searchProps={{
          placeholder: 'Select some options',
        }}
        options={this.options}
        selectedOptions={selectedOptions}
        style={{ width: 300 }}
        onChange={this.onChange}>
        {(search: React.ReactNode, list: React.ReactNode) => (
          <Fragment>
            {search}
            Some unique child
            {list}
          </Fragment>
        )}
      </EuiSelectable>
    );
  }
}
