import React from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';
import { useColorPickerState } from '../../../../src/services';

export const ColorPicker = () => {
  const [color, setColor, errors] = useColorPickerState('#D36086');
  return (
    <EuiFormRow label="Pick a color" isInvalid={!!errors} error={errors}>
      <EuiColorPicker onChange={setColor} color={color} isInvalid={!!errors} />
    </EuiFormRow>
  );
};
