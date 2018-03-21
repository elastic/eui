import React, {
  Component,
} from 'react';

import {
  EuiFieldNumber,
} from '../../../../src/components';

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
      <EuiFieldNumber
        placeholder="Placeholder text"
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}
