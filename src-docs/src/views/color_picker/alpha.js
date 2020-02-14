import React from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';
import { useColorPicker } from './utils';

export const Alpha = () => {
  const [color, setColor, errors] = useColorPicker('#D36086');

  const handleChange = hex => {
    setColor(hex);
  };

  return (
    <EuiFormRow
      label="Pick a color with optional opacity"
      isInvalid={!!errors}
      error={errors}>
      <EuiColorPicker
        onChange={handleChange}
        color={color}
        showAlpha={true}
        isInvalid={!!errors}
      />
    </EuiFormRow>
  );
};
