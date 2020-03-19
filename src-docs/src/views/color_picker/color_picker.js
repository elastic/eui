import React from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';
import { useColorPicker } from './utils';

export const ColorPicker = () => {
  const [color, setColor, errors] = useColorPicker('#D36086');
  return (
    <EuiFormRow label="Pick a color" isInvalid={!!errors} error={errors}>
      <EuiColorPicker onChange={setColor} color={color} isInvalid={!!errors} />
    </EuiFormRow>
  );
};
