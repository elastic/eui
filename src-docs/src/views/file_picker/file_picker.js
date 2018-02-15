import React from 'react';

import {
  EuiFilePicker,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFilePicker id="asdf" />
    <EuiSpacer size="m" />
    <EuiFilePicker
      id="asdf2"
      multiple
      initialButtonText="Select or drag and drop multiple files"
      onChange={files => { console.log('Selected', files); }}
    />
  </div>
);
