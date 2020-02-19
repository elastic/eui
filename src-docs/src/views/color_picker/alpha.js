import React from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';
import { useColorPicker } from './utils';

export const Alpha = () => {
  const [color, setColor, errors] = useColorPicker('#D36086');

  const handleChange = hex => {
    setColor(hex);
  };

  const customSwatches = [
    '#54B399',
    '#6092C0',
    '#D36086',
    '#9170B8',
    '#CA8EAE',
    '#54B39940',
    '#6092C040',
    '#D3608640',
    '#9170B840',
    '#CA8EAE40',
  ];

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
        swatches={customSwatches}
      />
    </EuiFormRow>
  );
};
