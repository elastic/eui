import React, { useState } from 'react';

import {
  EuiTextArea,
  EuiSwitch,
  EuiFormRow,
  EuiFieldNumber,
} from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default () => {
  const [value, setValue] = useState('');
  const [autoHeight, setAutoHeight] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);

  const onChange = e => {
    setValue(e.target.value);
  };

  const onMaxHeightChange = e => {
    setMaxHeight(e.target.value);
  };

  const autoHeightToggle = (
    <EuiSwitch
      label="autoHeight"
      checked={autoHeight}
      compressed
      onChange={() => setAutoHeight(!autoHeight)}
    />
  );
  const maxHeightField = (
    <EuiFormRow label="Max height">
      <EuiFieldNumber
        value={maxHeight}
        compressed
        placeholder="Null"
        onChange={e => onMaxHeightChange(e)}
      />
    </EuiFormRow>
  );

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles
      canPrepend
      canAppend
      extras={[autoHeightToggle, maxHeightField]}>
      <EuiTextArea
        placeholder="Placeholder text"
        aria-label="Use aria labels when no actual label is in use"
        value={value}
        autoHeight={autoHeight}
        maxHeight={maxHeight === 0 ? undefined : maxHeight}
        onChange={e => onChange(e)}
      />
    </DisplayToggles>
  );
};
