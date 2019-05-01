import React, { Component } from 'react';
import 'brace/mode/text';

import { EuiCodeEditor } from '../../../../src/components';

const TextMode = window.ace.acequire('ace/mode/text').Mode;
class MyCustomAceMode extends TextMode {
  // Your custom mode definition goes here.
  // See https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode
}

export default class extends Component {
  state = {
    value: '',
  };

  render() {
    return (
      <EuiCodeEditor
        mode={new MyCustomAceMode()}
        aria-label="Custom mode code editor"
        theme="github"
        width="100%"
        value={this.state.value}
        setOptions={{ fontSize: '14px' }}
      />
    );
  }
}
