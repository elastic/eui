import React, { useState } from 'react';

import { EuiDualRange, EuiSpacer } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState(['100', '150']);
  const [value2, setValue2] = useState(['40', '60']);
  const [value3, setValue3] = useState(['.4', '.6']);

  return (
    <>
      <EuiDualRange
        id={htmlIdGenerator()()}
        min={0}
        max={300}
        step={10}
        value={value}
        onChange={setValue}
        showLabels
        aria-label="An example of EuiDualRange"
        isDraggable
      />

      <EuiSpacer />

      <EuiDualRange
        id={htmlIdGenerator()()}
        min={0}
        max={1}
        step={0.1}
        value={value3}
        onChange={setValue3}
        showLabels
        aria-label="An example of EuiDualRange"
        isDraggable
      />

      <EuiSpacer />

      <EuiDualRange
        id={htmlIdGenerator()()}
        min={0}
        max={100}
        step={1}
        value={value2}
        onChange={setValue2}
        showLabels
        aria-label="An example of EuiDualRange"
        isDraggable
      />
    </>
  );
};
