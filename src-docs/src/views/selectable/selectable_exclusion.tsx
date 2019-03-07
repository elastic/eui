import React, { Component } from 'react';

import { EuiSelectable } from '../../../../src/components/selectable';
import { Option } from '../../../../src/components/selectable/types';
import { Options } from './data';

export default class extends Component<{}, { options: Option[] }> {
  options: Option[] = [];
  constructor(props: any) {
    super(props);

    this.options = Options as Option[];
    this.state = {
      options: this.options,
    };
  }

  onChange = (options: Option[]) => {
    this.setState({
      options,
    });
  };

  render() {
    const { options } = this.state;

    return (
      <EuiSelectable
        allowExclusions
        options={options}
        onChange={() => this.onChange(options)}>
        {list => list}
      </EuiSelectable>
    );
  }
}
