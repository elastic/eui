import React, { useState } from 'react';

import { DisplayToggles } from '../form_controls/display_toggles';
import {
  EuiColorStops,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

export const ColorStops = () => {
  const generateRandomColor = () =>
    // https://www.paulirish.com/2009/random-hex-color-code-snippets/
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const [addColor, setAddColor] = useState(generateRandomColor());
  const [colorStops, setColorStops] = useState([
    {
      stop: 20,
      color: '#00B3A4',
    },
    {
      stop: 50,
      color: '#DB1374',
    },
    {
      stop: 65,
      color: '#490092',
    },
  ]);

  const handleChange = colorStops => {
    setColorStops(colorStops);
    setAddColor(generateRandomColor());
  };

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
          onChange={handleChange}
          colorStops={colorStops}
          min={0}
          max={100}
          fullWidth={true}
        />
      </EuiFormRow>
      <EuiFormRow label="Random new color">
        <EuiColorStops
          label="Random new color"
          onChange={handleChange}
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
      <EuiFormRow label="Swatch-only mode">
        <EuiColorStops
          label="Swatch-only mode"
          onChange={handleChange}
          colorStops={colorStops}
          min={0}
          max={100}
          mode="swatch"
        />
      </EuiFormRow>
      <EuiFormRow label="Picker-only mode">
        <EuiColorStops
          label="Picker-only mode"
          onChange={handleChange}
          colorStops={colorStops}
          min={0}
          max={100}
          mode="picker"
        />
      </EuiFormRow>
      <EuiFormRow label="Custom swatches">
        <EuiColorStops
          label="Custom swatches"
          onChange={handleChange}
          colorStops={colorStops}
          min={0}
          max={100}
          swatches={['#333', '#666', '#999', '#CCC']}
        />
      </EuiFormRow>
      <EuiFormRow label="Fixed color segments">
        <EuiColorStops
          label="Fixed color segments"
          onChange={handleChange}
          colorStops={colorStops}
          min={0}
          max={100}
          stopType="fixed"
        />
      </EuiFormRow>

      <EuiSpacer size="xxl" />

      <DisplayToggles canLoading={false}>
        <EuiColorStops
          label="State options"
          onChange={handleChange}
          colorStops={colorStops}
          min={0}
          max={100}
        />
      </DisplayToggles>
    </React.Fragment>
  );
};
