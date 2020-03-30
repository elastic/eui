import React from 'react';

import {
  EuiColorPicker,
  EuiColorPalettePicker,
  EuiColorStops,
  EuiSpacer,
} from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

import {
  useColorPickerState,
  useColorStopsState,
  euiPaletteColorBlind,
  euiPaletteForStatus,
  euiPaletteCool,
} from '../../../../src/services';

export const KitchenSink = () => {
  const [color, setColor] = useColorPickerState('#D36086');
  const [colorStops, setColorStops, addStop] = useColorStopsState(true);

  const customPalettes = [
    {
      value: 'basicExample1',
      title: 'EUI basicPalette Cool',
      palette: euiPaletteCool(),
      type: 'stops',
    },
    {
      value: 'basicExample2',
      title: 'Paul Tor 14',
      palette: euiPaletteColorBlind(2),
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
      title: 'Liner Gradient',
      palette:
        'linear-gradient(to right, rgb(0, 104, 55) 0%, rgb(45, 161, 84) 14%, rgb(134, 203, 102) 28%, rgb(205, 233, 131) 42%, rgb(255, 254, 189) 57%, rgb(253, 210, 127) 71%, rgb(248, 139, 81) 85%, rgb(164, 0, 37) 100%)',
      type: 'gradient',
    },
  ];

  return (
    <React.Fragment>
      {/* DisplayToggles wrapper for Docs only */}
      <DisplayToggles canLoading={false} canPrepend={true} canAppend={true}>
        <EuiColorPicker color={color} onChange={setColor} />
      </DisplayToggles>
      <EuiSpacer />
      {/* DisplayToggles wrapper for Docs only */}
      <DisplayToggles
        canLoading={false}
        canInvalid={false}
        canCompressed={false}>
        <EuiColorStops
          label="Kitchen sink"
          colorStops={colorStops}
          onChange={setColorStops}
          min={0}
          max={100}
          addStop={addStop}
        />
      </DisplayToggles>
      <EuiSpacer />
      <DisplayToggles canLoading={false} canPrepend={true} canAppend={true}>
        <EuiColorPalettePicker palettes={customPalettes} />
      </DisplayToggles>
    </React.Fragment>
  );
};
