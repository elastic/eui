import React, { useState } from 'react';
import {
  euiPaletteColorBlind,
  euiPaletteForStatus,
} from '../../../../src/services';
// @ts-ignore
import { EuiFormRow } from '../../../../src/components';
import {
  EuiColorPalettePicker,
  EuiColorPalettePickerPaletteProps,
} from '../../../../src/components/color_picker/color_palette_picker';
// @ts-ignore
import { DisplayToggles } from '../form_controls/display_toggles';

const palettesExample1: EuiColorPalettePickerPaletteProps[] = [
  {
    value: 'palletteExample1_1',
    title: 'EUI Color Blind (fixed)',
    palette: euiPaletteColorBlind(),
    type: 'fixed',
  },
  {
    value: 'palletteExample1_2',
    title: 'Summer Colors (fixed)',
    palette: ['#1fb0b2', '#ffdb6d', '#ee9191', '#ffffff', '#888094'],
    type: 'fixed',
  },
  {
    value: 'palletteExample1_3',
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
    value: 'palletteExample1_4',
    title: 'For Status (gradient)',
    palette: euiPaletteForStatus(5),
    type: 'gradient',
  },
  {
    value: 'palletteExample1_5',
    title: 'CSS color names (fixed)',
    palette: ['red', 'gold', 'deepskyblue', 'black', 'linen'],
    type: 'fixed',
  },
  {
    value: 'palletteExample1_6',
    title: 'RGBA colors (fixed)',
    palette: ['rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255, 0.2)'],
    type: 'fixed',
  },
  {
    value: 'custom',
    title: 'Just a text as an option',
    type: 'text',
  },
];

const palettesExample2: EuiColorPalettePickerPaletteProps[] = [
  {
    value: 'palletteExample2_1',
    title: 'EUI Color Blind',
    palette: euiPaletteColorBlind(),
    type: 'fixed',
  },
  {
    value: 'palletteExample2_2',
    title: 'Summer Colors',
    palette: ['#1fb0b2', '#ffdb6d', '#ee9191', '#ffffff', '#888094'],
    type: 'fixed',
  },
  {
    value: 'palletteExample2_3',
    title: 'For Status',
    palette: euiPaletteForStatus(5),
    type: 'fixed',
  },
];

const palettesExample3: EuiColorPalettePickerPaletteProps[] = [
  {
    value: 'palletteExample3_1',
    title: 'For Status',
    palette: euiPaletteForStatus(5),
    type: 'fixed',
  },
  {
    value: 'palletteExample3_2',
    title: 'Summer Colors',
    palette: ['#1fb0b2', '#ffdb6d', '#ee9191', '#ffffff', '#888094'],
    type: 'fixed',
  },
  {
    value: 'palletteExample3_3',
    title: 'EUI Color Blind',
    palette: euiPaletteColorBlind(),
    type: 'fixed',
  },
];

export const ColorPalettePicker = () => {
  const [palletteExample1, setPalletteExample1] = useState(
    'palletteExample1_1'
  );
  const [palletteExample2, setPalletteExample2] = useState(
    'palletteExample2_1'
  );
  const [palletteExample3, setPalletteExample3] = useState(
    'palletteExample3_1'
  );

  return (
    <>
      <EuiFormRow label="Different type of palettes">
        <DisplayToggles canPrepend={true} canAppend={true}>
          <EuiColorPalettePicker
            palettes={palettesExample1}
            onChange={setPalletteExample1}
            valueOfSelected={palletteExample1}
          />
        </DisplayToggles>
      </EuiFormRow>
      <EuiFormRow label="Title selection display">
        <EuiColorPalettePicker
          palettes={palettesExample2}
          onChange={setPalletteExample2}
          valueOfSelected={palletteExample2}
          selectionDisplay="title"
        />
      </EuiFormRow>
      <EuiFormRow label="Palettes with a text option">
        <EuiColorPalettePicker
          palettes={palettesExample3}
          onChange={setPalletteExample3}
          valueOfSelected={palletteExample3}
        />
      </EuiFormRow>
    </>
  );
};
