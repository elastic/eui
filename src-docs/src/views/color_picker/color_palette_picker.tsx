import React, { useState } from 'react';
import {
  euiPaletteColorBlind,
  euiPaletteForStatus,
  euiPaletteForTemperature,
} from '../../../../src/services';
import { EuiSwitch } from '../../../../src/components/form';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiCode } from '../../../../src/components/code';
import {
  EuiColorPalettePicker,
  EuiColorPalettePickerPaletteProps,
} from '../../../../src/components/color_picker/color_palette_picker';
// @ts-ignore
import { DisplayToggles } from '../form_controls/display_toggles';

const palettes: EuiColorPalettePickerPaletteProps[] = [
  {
    value: 'pallette_1',
    title: 'EUI color blind (fixed)',
    palette: euiPaletteColorBlind(),
    type: 'fixed',
  },
  {
    value: 'pallette_2',
    title: 'EUI palette for temperature (fixed)',
    palette: euiPaletteForTemperature(5),
    type: 'fixed',
  },
  {
    value: 'pallette_3',
    title: 'Grayscale (gradient with stops)',
    palette: [
      {
        stop: 100,
        color: 'white',
      },
      {
        stop: 250,
        color: 'gray',
      },
      {
        stop: 350,
        color: 'dimgray',
      },
      {
        stop: 470,
        color: 'black',
      },
    ],
    type: 'gradient',
  },
  {
    value: 'pallette_4',
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

export const ColorPalettePicker = () => {
  const [selectionDisplay, setSelectionDisplay] = useState(false);
  const [pallette, setPallette] = useState('pallette_1');

  return (
    <>
      <EuiSwitch
        label={
          <span>
            Display selected item as a <EuiCode>title</EuiCode>
          </span>
        }
        checked={selectionDisplay}
        onChange={() => setSelectionDisplay(!selectionDisplay)}
      />
      <EuiSpacer />
      <DisplayToggles canPrepend={true} canAppend={true} canReadOnly={false}>
        <EuiColorPalettePicker
          palettes={palettes}
          onChange={setPallette}
          valueOfSelected={pallette}
          selectionDisplay={selectionDisplay ? 'title' : 'palette'}
        />
      </DisplayToggles>
    </>
  );
};
