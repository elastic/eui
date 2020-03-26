import React from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';
import { useColorPickerState } from '../../../../src/services';

export const Formats = () => {
  const [color, setColor, errors] = useColorPickerState('#D36086');
  const [color2, setColor2, errors2] = useColorPickerState('#D36086');
  const [color3, setColor3, errors3] = useColorPickerState('211, 96, 134');
  return (
    <>
      <EuiFormRow label="Auto format" isInvalid={!!errors} error={errors}>
        <EuiColorPicker
          onChange={setColor}
          color={color}
          isInvalid={!!errors}
        />
      </EuiFormRow>
      <EuiFormRow label="Hex format" isInvalid={!!errors2} error={errors2}>
        <EuiColorPicker
          format="hex"
          onChange={setColor2}
          color={color2}
          isInvalid={!!errors2}
        />
      </EuiFormRow>
      <EuiFormRow label="RGB(a) format" isInvalid={!!errors3} error={errors3}>
        <EuiColorPicker
          format="rgba"
          onChange={setColor3}
          color={color3}
          isInvalid={!!errors3}
          showAlpha={true}
        />
      </EuiFormRow>
    </>
  );
};
