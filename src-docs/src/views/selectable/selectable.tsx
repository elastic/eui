import React, { Component } from 'react';

import { EuiSelectable } from '../../../../src/components/selectable';
import { Option } from '../../../../src/components/selectable/types';
import { Options } from './data';

export default class extends Component<{}, { options: Option[] }> {
  constructor(props: any) {
    super(props);

    this.state = {
      options: Options as Option[],
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
        options={options}
        onChange={this.onChange}
        listProps={{ bordered: true }}>
        {list => list}
      </EuiSelectable>
    );
  }
}
