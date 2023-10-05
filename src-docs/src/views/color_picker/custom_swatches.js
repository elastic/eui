import React from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';

import { useColorPickerState } from '../../../../src/services';

export default () => {
  const [color, setColor, errors] = useColorPickerState();

  const customSwatches = ['#333', '#666', '#999', '#CCC'];

  return (
    <EuiFormRow label="Pick a color" isInvalid={!!errors} error={errors}>
      <EuiColorPicker
        onChange={setColor}
        color={color}
        isInvalid={!!errors}
        swatches={customSwatches}
      />
    </EuiFormRow>
  );
};
