import React from 'react';

import {
  EuiColorPicker,
  EuiColorStops,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

import { useColorPicker, useColorStop } from './utils';

export const CustomSwatches = () => {
  const [color, setColor, errors] = useColorPicker();
  const [colorStops, setColorStops] = useColorStop();

  const customSwatches = ['#333', '#666', '#999', '#CCC'];

  return (
    <React.Fragment>
      <EuiFormRow label="Pick a color" isInvalid={!!errors} error={errors}>
        <EuiColorPicker
          onChange={setColor}
          color={color}
          isInvalid={!!errors}
          swatches={customSwatches}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow label="Set color stops">
        <EuiColorStops
          label="Set color stops"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          swatches={customSwatches}
        />
      </EuiFormRow>
    </React.Fragment>
  );
};
