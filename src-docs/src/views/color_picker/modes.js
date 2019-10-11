import React from 'react';

import {
  EuiColorPicker,
  EuiColorStops,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

import { useColorPicker, useColorStop } from './utils';

export const Modes = () => {
  const [color, setColor, errors] = useColorPicker('#DB1374');
  const [colorStops, setColorStops] = useColorStop();

  return (
    <React.Fragment>
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

      <EuiSpacer />

      <EuiFormRow label="Set stops with swatches">
        <EuiColorStops
          label="Set stops with swatches"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          mode="swatch"
        />
      </EuiFormRow>

      <EuiFormRow label="Set stops with picker">
        <EuiColorStops
          label="Set stops with picker"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          mode="picker"
        />
      </EuiFormRow>
    </React.Fragment>
  );
};
