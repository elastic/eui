import React, { Component } from 'react';

import 'brace/mode/less';
import 'brace/theme/github';

import {
  EuiCodeEditor,
} from '../../../../src/components';

export default class extends Component {
  state = {
    value: ''
  };

  onChange = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <EuiCodeEditor
        mode="less"
        theme="github"
        width="100%"
        value={this.state.value}
        onChange={this.onChange}
        setOptions={{ fontSize: '14px' }}
        onBlur={() => { console.log('blur'); }}
      />
    );
  }
}
