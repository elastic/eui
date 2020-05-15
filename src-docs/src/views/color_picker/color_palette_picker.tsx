import React, { useState } from 'react';
import {
  euiPaletteColorBlind,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPalettePositive,
} from '../../../../src/services';
import { EuiFormRow } from '../../../../src/components/form';
import { EuiSpacer } from '../../../../src/components/spacer';
import {
  EuiColorPalettePicker,
  EuiColorPalettePickerPaletteProps,
} from '../../../../src/components/color_picker/';
// @ts-ignore
import { DisplayToggles } from '../form_controls/display_toggles';

const palettesExample1: EuiColorPalettePickerPaletteProps[] = [
  {
    value: 'palletteExample1_1',
    title: 'EUI color blind (fixed)',
    palette: euiPaletteColorBlind(),
    type: 'fixed',
  },
  {
    value: 'palletteExample1_2',
    title: 'EUI palette for temperature (fixed)',
    palette: euiPaletteForTemperature(5),
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
    title: 'EUI palette for status (gradient)',
    palette: euiPaletteForStatus(5),
    type: 'gradient',
  },
  {
    value: 'custom',
    title: 'Plain text as a custom option',
    type: 'text',
  },
];

const palettesExample2: EuiColorPalettePickerPaletteProps[] = [
  {
    value: 'palletteExample2_1',
    title: 'EUI color blind',
    palette: euiPaletteColorBlind(),
    type: 'fixed',
  },
  {
    value: 'palletteExample2_2',
    title: 'EUI palette for temperature',
    palette: euiPaletteForTemperature(5),
    type: 'fixed',
  },
  {
    value: 'palletteExample2_3',
    title: 'EUI palette for status',
    palette: euiPaletteForStatus(5),
    type: 'fixed',
  },
];

const palettesExample3: EuiColorPalettePickerPaletteProps[] = [
  {
    value: 'palletteExample3_1',
    title: 'EUI palette for status',
    palette: euiPaletteForStatus(5),
    type: 'fixed',
  },
  {
    value: 'palletteExample3_2',
    title: 'EUI palette positive',
    palette: euiPalettePositive(5),
    type: 'fixed',
  },
  {
    value: 'palletteExample3_3',
    title: 'EUI color blind',
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
      <DisplayToggles canPrepend={true} canAppend={true}>
        <EuiColorPalettePicker
          palettes={palettesExample1}
          onChange={setPalletteExample1}
          valueOfSelected={palletteExample1}
        />
      </DisplayToggles>
      <EuiSpacer />
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
