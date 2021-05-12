import React, { useState } from 'react';

import {
  EuiCopy,
  EuiButton,
  EuiFieldText,
  EuiSpacer,
} from '../../../../src/components/';

export default () => {
  const [copyText, setCopyText] = useState('I am the text that will be copied');

  const onChange = (e) => {
    setCopyText(e.target.value);
  };

  return (
    <div>
      <EuiFieldText
        label="Enter text that will be copied to clipboard"
        value={copyText}
        onChange={onChange}
      />

      <EuiSpacer size="m" />

      <EuiCopy textToCopy={copyText}>
        {(copy) => (
          <EuiButton onClick={copy}>Click to copy input text</EuiButton>
        )}
      </EuiCopy>
    </div>
  );
};
