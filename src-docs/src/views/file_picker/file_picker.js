import React from 'react';

import {
  EuiFilePicker,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFilePicker id="asdf" />
    <EuiSpacer size="m" />
    <EuiFilePicker id="asdf2" multiple initialButtonText="Choose multiple files" />
  </div>
);
