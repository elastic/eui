import React, { useState } from 'react';

import { EuiColorStops, EuiFormRow } from '../../../../src/components';

import { useColorStop } from './utils';

export const ColorStops = () => {
  const [colorStops, setColorStops, addColor] = useColorStop(true);

  const [extendedColorStops, setExtendedColorStops] = useState([
    {
      stop: 100,
      color: '#00B3A4',
    },
    {
      stop: 250,
      color: '#DB1374',
    },
    {
      stop: 350,
      color: '#490092',
    },
  ]);

  const handleExtendedChange = colorStops => {
    setExtendedColorStops(colorStops);
  };

  const [emptyColorStops, setEmptyColorStops] = useState([]);

  const handleEmptyChange = colorStops => {
    setEmptyColorStops(colorStops);
  };

  return (
    <React.Fragment>
      <EuiFormRow label="Empty start">
        <EuiColorStops
          label="Empty start"
          onChange={handleEmptyChange}
          colorStops={emptyColorStops}
          min={0}
          max={100}
        />
      </EuiFormRow>
      <EuiFormRow label="Standard">
        <EuiColorStops
          label="Standard"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
        />
      </EuiFormRow>
      <EuiFormRow label="Random new color">
        <EuiColorStops
          label="Random new color"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          addColor={addColor}
        />
      </EuiFormRow>
      <EuiFormRow label="Extended range">
        <EuiColorStops
          label="Extended range"
          onChange={handleExtendedChange}
          colorStops={extendedColorStops}
          min={100}
          max={400}
        />
      </EuiFormRow>
      <EuiFormRow label="Fixed color segments">
        <EuiColorStops
          label="Fixed color segments"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          stopType="fixed"
        />
      </EuiFormRow>
    </React.Fragment>
  );
};
