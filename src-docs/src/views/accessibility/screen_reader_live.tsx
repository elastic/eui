import React, { useState } from 'react';

import {
  EuiCode,
  EuiFieldNumber,
  EuiFormRow,
  EuiScreenReaderLive,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

export default () => {
  const [value, setValue] = useState(1);
  return (
    <>
      <EuiFormRow label="Current value">
        <EuiFieldNumber
          placeholder="Current value"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          min={0}
        />
      </EuiFormRow>
      <EuiSpacer />
      <EuiText>
        <p>
          <em>Content announced by screen reader: </em>
          <EuiCode>Current value: {value}</EuiCode>
        </p>
        <EuiScreenReaderLive>
          <p>Current value: {value}</p>
        </EuiScreenReaderLive>
      </EuiText>
    </>
  );
};
