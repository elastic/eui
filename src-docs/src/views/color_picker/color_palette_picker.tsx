import React, { useState } from 'react';
import {
  euiPaletteColorBlind,
  euiPaletteForStatus,
} from '../../../../src/services';
import {
  EuiColorPalettePicker,
  EuiColorPalettePickerPaletteProps,
} from '../../../../src/components/color_picker/color_palette_picker';
// @ts-ignore
import { DisplayToggles } from '../form_controls/display_toggles';

const palettes: EuiColorPalettePickerPaletteProps[] = [
  {
    value: 'palette1',
    title: 'EUI Color Blind (stops)',
    palette: euiPaletteColorBlind(),
    type: 'fixed',
  },
  {
    value: 'palette2',
    title: 'Summer Colors (stops)',
    palette: ['#1fb0b2', '#ffdb6d', '#ee9191', '#ffffff', '#888094'],
    type: 'fixed',
  },
  {
    value: 'palette4',
    title: 'Beautiful Gradient (gradient)',
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
    title: 'For Status (gradient)',
    palette: euiPaletteForStatus(5),
    type: 'gradient',
  },
  {
    value: 'palette6',
    title: 'Electric Pop (stops)',
    palette: ['#ff3f3f', '#ffcc06', '#0a9ad7', '#030000', '#fdf2dd'],
    type: 'fixed',
  },
];

export const ColorPalettePicker = () => {
  const [palette, setPalette] = useState('palette1');

  const onPaletteChange = (value: any) => {
    setPalette(value);
  };

  return (
    <DisplayToggles canPrepend={true} canAppend={true}>
      <EuiColorPalettePicker
        palettes={palettes}
        onChange={onPaletteChange}
        valueOfSelected={palette}
      />
    </DisplayToggles>
  );
};
