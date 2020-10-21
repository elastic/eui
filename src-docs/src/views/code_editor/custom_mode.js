import React, { useState } from 'react';
import { EuiCodeEditor } from '../../../../src/components';
import 'brace/mode/text';
import 'brace/theme/github';

const TextMode = window.ace.acequire('ace/mode/text').Mode;
class MyCustomAceMode extends TextMode {
  // Your custom mode definition goes here.
  // See https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode
}

export default () => {
  const [value, updateValue] = useState('');

  const onChange = (value) => {
    updateValue(value);
  };

  return (
    <EuiCodeEditor
      mode={new MyCustomAceMode()}
      aria-label="Custom mode code editor"
      theme="github"
      width="100%"
      value={value}
      onChange={onChange}
      setOptions={{ fontSize: '14px' }}
    />
  );
};
