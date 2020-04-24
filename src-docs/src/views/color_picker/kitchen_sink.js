import React, { useState } from 'react';

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
} from '../../../../src/services';

import { palettes } from './palettes';

export const KitchenSink = () => {
  const [color, setColor] = useColorPickerState('#D36086');
  const [colorStops, setColorStops, addStop] = useColorStopsState(true);
  const [palette, setPalette] = useState('palette1');

  const onPaletteChange = value => {
    setPalette(value);
  };

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
        <EuiColorPalettePicker
          palettes={palettes}
          onChange={onPaletteChange}
          valueOfSelected={palette}
        />
      </DisplayToggles>
    </React.Fragment>
  );
};
