import React from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';
import { useColorPickerState } from '../../../../src/services';

export default () => {
  const [color, setColor, errors] = useColorPickerState('#D36086');
  const [color2, setColor2, errors2] = useColorPickerState('211, 96, 134');

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

  const customSwatches2 = [
    '211, 96, 134, 0.25',
    '211, 96, 134, 0.5',
    '211, 96, 134, 0.75',
    '211, 96, 134',
  ];

  return (
    <>
      <EuiFormRow
        label="Pick a color with optional opacity"
        isInvalid={!!errors}
        error={errors}
      >
        <EuiColorPicker
          onChange={setColor}
          color={color}
          showAlpha={true}
          isInvalid={!!errors}
          swatches={customSwatches}
        />
      </EuiFormRow>

      <EuiFormRow
        label="Using RGBa format"
        isInvalid={!!errors2}
        error={errors2}
      >
        <EuiColorPicker
          onChange={setColor2}
          color={color2}
          showAlpha={true}
          format="rgba"
          isInvalid={!!errors2}
          swatches={customSwatches2}
        />
      </EuiFormRow>
    </>
  );
};
