import React, { Component } from 'react';

import { EuiFieldSearch } from '../../../../src/components';
import { Switches } from './shared';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <Switches>
        <EuiFieldSearch
          placeholder="Search this"
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
        />
      </Switches>
    );
  }
}
