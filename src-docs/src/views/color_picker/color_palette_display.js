import React, { useState } from 'react';
import {
  euiPaletteColorBlind,
  euiPaletteCool,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteGray,
} from '../../../../src/services/color';

import {
  EuiColorPaletteDisplay,
  EuiColorPalettePicker,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components/';

const paletteWithStops = [
  {
    stop: 100,
    color: 'white',
  },
  {
    stop: 250,
    color: 'lightgray',
  },
  {
    stop: 320,
    color: 'gray',
  },
  {
    stop: 470,
    color: 'black',
  },
];

const palettesComplexExample = [
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
    title: 'EUI palette for status (gradient)',
    palette: euiPaletteForStatus(5),
    type: 'gradient',
  },
  {
    value: 'pallette_4',
    title: 'EUI palette cool (gradient)',
    palette: euiPaletteCool(6),
    type: 'gradient',
  },
  {
    value: 'pallette_5',
    title: 'EUI palette gray (gradient)',
    palette: euiPaletteGray(5),
    type: 'gradient',
  },
];

export default () => {
  const [paletteValue, setPaletteValue] = useState('pallette_3');

  const currentSelectedPalette = palettesComplexExample.find(
    (palette) => palette.value === paletteValue
  );

  return (
    <>
      <EuiFormRow label="Fixed">
        <EuiColorPaletteDisplay type="fixed" palette={euiPaletteColorBlind()} />
      </EuiFormRow>
      <EuiFormRow label="Gradient">
        <EuiColorPaletteDisplay
          type="gradient"
          palette={euiPaletteColorBlind()}
        />
      </EuiFormRow>
      <EuiFormRow label="Fixed with stops">
        <EuiColorPaletteDisplay type="fixed" palette={paletteWithStops} />
      </EuiFormRow>
      <EuiFormRow label="Gradient with stops">
        <EuiColorPaletteDisplay type="gradient" palette={paletteWithStops} />
      </EuiFormRow>
      <EuiSpacer />
      <EuiSpacer size="s" />
      <EuiFormRow label="Use in conjunction with EuiColorPalettePicker">
        <EuiColorPalettePicker
          palettes={palettesComplexExample}
          onChange={setPaletteValue}
          valueOfSelected={paletteValue}
          selectionDisplay="title"
        />
      </EuiFormRow>
      <EuiSpacer size="s" />
      <EuiFormRow>
        <EuiColorPaletteDisplay
          type={currentSelectedPalette.type}
          palette={currentSelectedPalette.palette}
        />
      </EuiFormRow>
    </>
  );
};
