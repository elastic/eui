import React, { useState } from 'react';

import {
  EuiCopy,
  EuiButton,
  EuiFieldText,
  EuiSpacer,
  EuiFormRow,
} from '../../../../src/components/';

export default () => {
  const [copyText, setCopyText] = useState('I am the text that will be copied');

  const onChange = e => {
    setCopyText(e.target.value);
  };

  return (
    <div>
      <EuiFormRow label="Enter text that will be copied to clipboard">
        <EuiFieldText value={copyText} onChange={onChange} />
      </EuiFormRow>

      <EuiSpacer size="m" />

      <EuiCopy textToCopy={copyText}>
        {copy => <EuiButton onClick={copy}>Click to copy input text</EuiButton>}
      </EuiCopy>
    </div>
  );
};
