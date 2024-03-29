import React from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';

import { useColorPickerState } from '../../../../src/services';

export default () => {
  const [color, setColor, errors] = useColorPickerState('#D36086');

  return (
    <>
      <EuiFormRow label="Pick a swatch" isInvalid={!!errors} error={errors}>
        <EuiColorPicker
          mode="swatch"
          onChange={setColor}
          color={color}
          isInvalid={!!errors}
        />
      </EuiFormRow>
      <EuiFormRow label="Pick a color" isInvalid={!!errors} error={errors}>
        <EuiColorPicker
          mode="picker"
          onChange={setColor}
          color={color}
          isInvalid={!!errors}
        />
      </EuiFormRow>
    </>
  );
};
