import React, { Component, Fragment } from 'react';

import { EuiSelectable } from '../../../../src/components/selectable';
import { Option } from '../../../../src/components/selectable/types';

export default class extends Component {
  constructor(props: any) {
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

  onChange = (selectedOptions: Option[]) => {
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
          fullWidth: true,
        }}
        options={this.options}
        selectedOptions={selectedOptions}
        onChange={this.onChange}>
        {(search: React.ReactNode, list: React.ReactNode) => (
          <Fragment>
            {search}
            {list}
          </Fragment>
        )}
      </EuiSelectable>
    );
  }
}
