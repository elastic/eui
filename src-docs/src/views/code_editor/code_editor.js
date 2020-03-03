import React, { Component } from 'react';

import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

import { EuiCodeEditor } from '../../../../src/components';

export default class extends Component {
  state = {
    value: '',
  };

  onChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <EuiCodeEditor
        mode="javascript"
        theme="github"
        width="100%"
        value={this.state.value}
        onChange={this.onChange}
        setOptions={{
          fontSize: '14px',
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true,
        }}
        onBlur={() => {
          console.log('blur');
        }} // eslint-disable-line no-console
        aria-label="Code Editor"
      />
    );
  }
}
