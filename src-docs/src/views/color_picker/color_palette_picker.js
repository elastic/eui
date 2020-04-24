import React, { useState } from 'react';

import { EuiColorPalettePicker, EuiFormRow } from '../../../../src/components';

import { palettes } from './palettes';

export const ColorPalettePicker = () => {
  const [palette, setPalette] = useState('palette1');

  const onPaletteChange = value => {
    setPalette(value);
  };

  return (
    <EuiFormRow label="Select a palette:">
      <EuiColorPalettePicker
        palettes={palettes}
        onChange={onPaletteChange}
        valueOfSelected={palette}
      />
    </EuiFormRow>
  );
};
