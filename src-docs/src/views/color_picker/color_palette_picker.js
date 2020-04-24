import React, { useState } from 'react';

import { EuiColorPalettePicker, EuiFormRow } from '../../../../src/components';

import {
  euiPaletteColorBlind,
  euiPaletteForStatus,
} from '../../../../src/services';

const basicExample = [
  {
    value: 'basicExample1',
    title: 'EUI basicPalette Cool',
    palette: euiPaletteColorBlind(),
    type: 'stops',
  },
  {
    value: 'basicExample2',
    title: 'Paul Tor 14',
    palette: ['red', 'blue'],
    type: 'stops',
  },
  {
    value: 'basicExample3',
    title: 'EUI basicPalette for Status',
    palette: euiPaletteForStatus(),
    type: 'stops',
  },
  {
    value: 'basicExample4',
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
    value: 'basicExample5',
    title: 'Linear For Status',
    palette: euiPaletteForStatus(),
    type: 'gradient',
  },
  {
    title: 'Custom Option',
    type: 'button',
  },
];

export const ColorPalettePicker = () => {
  const [basicPalette, setBasicPalette] = useState('basicExample1');

  const onBasicPaletteChange = value => {
    setBasicPalette(value);
  };

  return (
    <>
      <EuiFormRow label="Basic palette picker">
        <EuiColorPalettePicker
          palettes={basicExample}
          onChange={onBasicPaletteChange}
          valueOfSelected={basicPalette}
        />
      </EuiFormRow>
    </>
  );
};
