import React, { Component } from 'react';

import {
  EuiCopy,
  EuiButton,
  EuiFieldText,
  EuiSpacer,
} from '../../../../src/components/';

export default class extends Component {
  state = {
    copyText: 'I am the text that will be copied',
  };

  onChange = e => {
    this.setState({
      copyText: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <EuiFieldText
          placeholder="Enter text that will be copied to clipboard"
          value={this.state.copyText}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiCopy textToCopy={this.state.copyText}>
          {copy => (
            <EuiButton onClick={copy}>Click to copy input text</EuiButton>
          )}
        </EuiCopy>
      </div>
    );
  }
}
