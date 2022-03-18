import React, { useState } from 'react';

import { EuiFieldSearch, EuiSwitch } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default () => {
  const [isClearable, setIsClearable] = useState(true);
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles
      canPrepend
      canAppend
      extras={[
        <EuiSwitch
          compressed
          label={'clearable'}
          checked={isClearable}
          onChange={(e) => {
            setIsClearable(e.target.checked);
          }}
        />,
      ]}
    >
      <EuiFieldSearch
        placeholder="Search this"
        value={value}
        onChange={(e) => onChange(e)}
        isClearable={isClearable}
        aria-label="Use aria labels when no actual label is in use"
      />
    </DisplayToggles>
  );
};
