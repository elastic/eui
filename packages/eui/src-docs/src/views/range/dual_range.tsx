import React, { useState } from 'react';

import {
  EuiDualRange,
  EuiDualRangeProps,
  EuiSpacer,
  EuiTitle,
  useGeneratedHtmlId,
} from '../../../../src';

export default () => {
  const [dualValue, setDualValue] = useState<EuiDualRangeProps['value']>([
    '100',
    '150',
  ]);
  const [dualValue2, setDualValue2] = useState<EuiDualRangeProps['value']>([
    '40',
    '60',
  ]);

  const basicRangeSliderId = useGeneratedHtmlId({ prefix: 'basicRangeSlider' });
  const draggableRangeSliderId = useGeneratedHtmlId({
    prefix: 'draggableRangeSlider',
  });

  const onDualChange = (value: EuiDualRangeProps['value']) => {
    setDualValue(value);
  };

  return (
    <>
      <EuiDualRange
        id={basicRangeSliderId}
        min={0}
        max={300}
        step={10}
        value={dualValue}
        onChange={onDualChange}
        showLabels
        aria-label="An example of EuiDualRange"
      />

      <EuiSpacer size="xl" />

      <EuiTitle size="xxs">
        <h3>Draggable highlight area</h3>
      </EuiTitle>

      <EuiSpacer size="l" />

      <EuiDualRange
        id={draggableRangeSliderId}
        min={0}
        max={100}
        step={1}
        value={dualValue2}
        onChange={setDualValue2}
        showLabels
        aria-label="An example of EuiDualRange with isDraggable='true'"
        isDraggable
      />
    </>
  );
};
