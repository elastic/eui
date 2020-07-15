import React, { useState } from 'react';

import {
  EuiFieldPassword,
  EuiSpacer,
  EuiFormRow,
  EuiCode,
} from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default function() {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  return (
    <>
      {/* DisplayToggles wrapper for Docs only */}
      <DisplayToggles canAppend canPrepend>
        <EuiFieldPassword
          placeholder="Placeholder text"
          value={value}
          onChange={e => setValue(e.target.value)}
          aria-label="Use aria labels when no actual label is in use"
        />
      </DisplayToggles>
      <EuiSpacer />
      <EuiFormRow
        label={
          <>
            Allowing <EuiCode>canToggleVisibility</EuiCode> to toggle
            obfuscation
          </>
        }>
        <EuiFieldPassword
          placeholder="Placeholder text"
          value={value2}
          onChange={e => setValue2(e.target.value)}
          canToggleVisibility
        />
      </EuiFormRow>
    </>
  );
}
