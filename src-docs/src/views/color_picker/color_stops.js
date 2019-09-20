import React, { useState } from 'react';

import { EuiColorStops, EuiFormRow } from '../../../../src/components';

export const ColorStops = () => {
  const [colorStops, setColorStops] = useState([
    {
      stop: 0,
      color: '#ff0000',
    },
    {
      stop: 25,
      color: '#FFFF00',
    },
    {
      stop: 35,
      color: '#008000',
    },
  ]);

  const handleChange = colorStops => {
    setColorStops(colorStops);
  };

  const [extendedColorStops, setExtendedColorStops] = useState([
    {
      stop: 100,
      color: '#ff0000',
    },
    {
      stop: 250,
      color: '#FFFF00',
    },
    {
      stop: 350,
      color: '#008000',
    },
  ]);

  const handleExtendedChange = colorStops => {
    setExtendedColorStops(colorStops);
  };

  return (
    <React.Fragment>
      <EuiFormRow label="Standard">
        <EuiColorStops
          onChange={handleChange}
          colorStops={colorStops}
          min={0}
          max={100}
        />
      </EuiFormRow>

      <EuiFormRow label="Extended range">
        <EuiColorStops
          onChange={handleExtendedChange}
          colorStops={extendedColorStops}
          min={100}
          max={400}
        />
      </EuiFormRow>

      <EuiFormRow label="Swatch-only mode">
        <EuiColorStops
          onChange={handleChange}
          colorStops={colorStops}
          min={0}
          max={100}
          mode="swatch"
        />
      </EuiFormRow>

      <EuiFormRow label="Picker-only mode">
        <EuiColorStops
          onChange={handleChange}
          colorStops={colorStops}
          min={0}
          max={100}
          mode="picker"
        />
      </EuiFormRow>

      <EuiFormRow label="Custom swatches">
        <EuiColorStops
          onChange={handleChange}
          colorStops={colorStops}
          min={0}
          max={100}
          swatches={['#333', '#666', '#999', '#CCC']}
        />
      </EuiFormRow>

      <EuiFormRow label="Fixed color segments">
        <EuiColorStops
          onChange={handleChange}
          colorStops={colorStops}
          min={0}
          max={100}
          stopType="fixed"
        />
      </EuiFormRow>
    </React.Fragment>
  );
};
