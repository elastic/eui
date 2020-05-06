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
    title: 'EUI Color Blind (fixed)',
    palette: euiPaletteColorBlind(),
    type: 'fixed',
  },
  {
    value: 'palette2',
    title: 'Summer Colors (fixed)',
    palette: ['#1fb0b2', '#ffdb6d', '#ee9191', '#ffffff', '#888094'],
    type: 'fixed',
  },
  {
    value: 'palette4',
    title: 'Beautiful Gradient (gradient with stops)',
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
    title: 'CSS color names (fixed)',
    palette: ['red', 'gold', 'deepskyblue', 'black', 'linen'],
    type: 'fixed',
  },
  {
    value: 'palette7',
    title: 'RGBA colors (fixed)',
    palette: ['rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255, 0.2)'],
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
