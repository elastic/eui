import React from 'react';

import { EuiFormFieldset } from '../../../../src/components/form/form_fieldset';
import { EuiSwitch } from '../../../../src/components/form/switch';
import { EuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <EuiFormFieldset legend={{ children: 'Enable these objects' }}>
    <EuiSwitch label="Object 1" onChange={() => {}} checked={false} />
    <EuiSpacer size="s" />
    <EuiSwitch label="Object 2" onChange={() => {}} checked={true} />
  </EuiFormFieldset>
);
