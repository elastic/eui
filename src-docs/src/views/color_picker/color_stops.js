import React, { useState } from 'react';

import { EuiColorStops, EuiFormRow } from '../../../../src/components';

export const ColorStops = () => {
  const generateRandomColor = () =>
    // https://www.paulirish.com/2009/random-hex-color-code-snippets/
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const [addColor, setAddColor] = useState(generateRandomColor());
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
      stop: 45,
      color: '#008000',
    },
  ]);

  const handleChange = colorStops => {
    setColorStops(colorStops);
    setAddColor(generateRandomColor());
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

  const [emptyColorStops, setEmptyColorStops] = useState([]);

  const handleEmptyChange = colorStops => {
    setEmptyColorStops(colorStops);
  };

  const changeProps = () => {
    setColorStops([
      {
        stop: 0,
        color: '#ff0000',
      },
      {
        stop: 25,
        color: '#FFFF00',
      },
      {
        stop: 45,
        color: '#008000',
      },
    ]);
  };

  return (
    <React.Fragment>
      <button onClick={changeProps}>Prop Change</button>
      <EuiFormRow label="Empty start">
        <EuiColorStops
          onChange={handleEmptyChange}
          colorStops={emptyColorStops}
          min={0}
          max={100}
        />
      </EuiFormRow>
      <EuiFormRow label="Standard">
        <EuiColorStops
          onChange={handleChange}
          colorStops={colorStops}
          min={0}
          max={100}
          fullWidth={true}
        />
      </EuiFormRow>
      <EuiFormRow label="Random new color">
        <EuiColorStops
          onChange={handleChange}
          colorStops={colorStops}
          min={0}
          max={100}
          addColor={addColor}
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
