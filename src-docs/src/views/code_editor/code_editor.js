import React, { useState } from 'react';

import 'react-ace'; // this import can be omitted from your project, but is required for our Code Sandbox demo link to work
import 'brace/theme/github';
import 'brace/mode/javascript';
import 'brace/snippets/javascript';
import 'brace/ext/language_tools';

import { EuiCodeEditor } from '../../../../src/components';

export default () => {
  const [value, updateValue] = useState('');

  const onChange = value => {
    updateValue(value);
  };

  return (
    <EuiCodeEditor
      mode="javascript"
      theme="github"
      width="100%"
      value={value}
      onChange={onChange}
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
};
