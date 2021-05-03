import React, { useState } from 'react';

import { EuiDualRange, EuiSpacer } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState(['', '']);
  const [value2, setValue2] = useState(['40', '60']);

  return (
    <>
      <EuiDualRange
        id={htmlIdGenerator()()}
        min={-100}
        max={200}
        step={10}
        value={value}
        onChange={setValue}
        showLabels
        aria-label="An example of EuiDualRange"
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
