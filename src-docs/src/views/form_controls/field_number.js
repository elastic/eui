import React, { Component } from 'react';

import { EuiFieldNumber } from '../../../../src/components';
import { Switches } from './shared';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  onChange = e => {
    const sanitizedValue = parseInt(e.target.value, 10);
    this.setState({
      value: isNaN(sanitizedValue) ? '' : sanitizedValue,
    });
  };

  render() {
    return (
      <Switches canPrepend canAppend>
        <EuiFieldNumber
          placeholder="Placeholder text"
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
        />
      </Switches>
    );
  }
}
