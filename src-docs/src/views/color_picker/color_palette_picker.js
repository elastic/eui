import React, { useState } from 'react';

import { EuiColorPalettePicker, EuiFormRow } from '../../../../src/components';

import {
  euiPaletteColorBlind,
  euiPaletteForStatus,
} from '../../../../src/services';

const palettesExample = [
  {
    value: 'palette1',
    title: 'EUI Color Blind',
    palette: euiPaletteColorBlind(),
    type: 'stops',
  },
  {
    value: 'palette2',
    title: 'Summer Colors',
    palette: ['#1fb0b2', '#ffdb6d', '#ee9191', '#ffffff', '#888094'],
    type: 'stops',
  },
  {
    value: 'palette4',
    title: 'Linear Gradient',
    palette: [
      {
        stop: 100,
        color: '#54B399',
      },
      {
        stop: 250,
        color: '#D36086',
      },
      {
        stop: 350,
        color: '#9170B8',
      },
      {
        stop: 470,
        color: '#F5A700',
      },
    ],
    type: 'gradient',
  },
  {
    value: 'palette5',
    title: 'Linear For Status',
    palette: euiPaletteForStatus(),
    type: 'gradient',
  },
  {
    value: 'palette6',
    title: 'Electric Pop',
    palette: ['#ff3f3f', '#ffcc06', '#0a9ad7', '#030000', '#fdf2dd'],
    type: 'stops',
  },
  {
    title: 'Custom Option',
    type: 'button',
  },
];

export const ColorPalettePicker = () => {
  const [basicPalette, setBasicPalette] = useState('palette1');

  const onBasicPaletteChange = value => {
    setBasicPalette(value);
  };

  return (
    <>
      <EuiFormRow label="Basic palette picker">
        <EuiColorPalettePicker
          palettes={palettesExample}
          onChange={onBasicPaletteChange}
          valueOfSelected={basicPalette}
        />
      </EuiFormRow>
    </>
  );
};
