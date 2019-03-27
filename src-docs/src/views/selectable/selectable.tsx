import React, { Component } from 'react';

import { EuiSelectable } from '../../../../src/components/selectable';
import { Option } from '../../../../src/components/selectable/types';
import { Options } from './data';

export default class extends Component<{}, { selectedOptions: Option[] }> {
  options: Option[] = [];
  constructor(props: any) {
    super(props);

    this.options = Options as Option[];
    const selectedOptions = this.options.filter(option => option.checked);

    this.state = {
      selectedOptions,
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
        options={this.options}
        onChange={() => this.onChange(selectedOptions)}
        listProps={{ bordered: true }}>
        {list => list}
      </EuiSelectable>
    );
  }
}
