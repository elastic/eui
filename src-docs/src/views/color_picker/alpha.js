import React, { useState } from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';
import { useColorPicker } from './utils';

export const Alpha = () => {
  const [color, setColor, errors] = useColorPicker('#D36086');
  const [alpha, setAlpha] = useState(1);

  const handleChange = (hex, [, , , a]) => {
    setColor(hex);
    setAlpha(a);
  };

  return (
    <>
      <EuiFormRow
        label="Pick a color with optional opacity"
        isInvalid={!!errors}
        error={errors}>
        <EuiColorPicker
          onChange={handleChange}
          color={color}
          alpha={alpha}
          showAlpha={true}
          isInvalid={!!errors}
        />
      </EuiFormRow>

      <EuiFormRow
        label="Pick a color with required opacity"
        isInvalid={!!errors}
        error={errors}>
        <EuiColorPicker
          onChange={hex => setColor(hex)}
          color={color}
          alpha={0.25}
          showAlpha={false}
          isInvalid={!!errors}
        />
      </EuiFormRow>
    </>
  );
};
