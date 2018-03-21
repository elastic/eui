import React, {
  Component,
} from 'react';

import {
  EuiFieldText,
} from '../../../../src/components';

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
      <EuiFieldText
        placeholder="Placeholder text"
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}
