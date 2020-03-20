import React, { Component } from 'react';

import {
  EuiCopy,
  EuiButton,
  EuiFieldText,
  EuiSpacer,
  EuiFormRow,
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
        <EuiFormRow label="Enter text that will be copied to clipboard">
          <EuiFieldText value={this.state.copyText} onChange={this.onChange} />
        </EuiFormRow>

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
