import React, { useState } from 'react';
import { DisplayToggles } from './display_toggles';
import { EuiTextArea } from '../../../../src';

export default () => {
  const [value, setValue] = useState('');

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canLoading={false}>
      <EuiTextArea
        placeholder="Placeholder text"
        aria-label="Use aria labels when no actual label is in use"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </DisplayToggles>
  );
};
