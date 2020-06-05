import React, { useState } from 'react';

import { EuiFieldNumber } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default () => {
  const [value, setValue] = useState('');

  const onChange = e => {
    const sanitizedValue = parseInt(e.target.value, 10);
    setValue(isNaN(sanitizedValue) ? '' : sanitizedValue);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canPrepend canAppend>
      <EuiFieldNumber
        placeholder="Placeholder text"
        value={value}
        onChange={e => onChange(e)}
        aria-label="Use aria labels when no actual label is in use"
      />
    </DisplayToggles>
  );
};
