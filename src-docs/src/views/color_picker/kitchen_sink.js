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
