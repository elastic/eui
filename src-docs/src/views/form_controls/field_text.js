import React, { useState } from 'react';

import { EuiFieldText } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default function() {
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canPrepend canAppend>
      <EuiFieldText
        placeholder="Placeholder text"
        value={value}
        onChange={e => onChange(e)}
        aria-label="Use aria labels when no actual label is in use"
      />
    </DisplayToggles>
  );
}
