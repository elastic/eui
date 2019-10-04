import React from 'react';

import {
  EuiColorPicker,
  EuiColorStops,
  EuiSpacer,
} from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

import { useColorPicker, useColorStop } from './utils';

export const KitchenSink = () => {
  const [color, setColor] = useColorPicker('#DB1374');
  const [colorStops, setColorStops, addStop] = useColorStop(true);

  return (
    <React.Fragment>
      {/* DisplayToggles wrapper for Docs only */}
      <DisplayToggles canLoading={false}>
        <EuiColorPicker color={color} onChange={setColor} />
      </DisplayToggles>
      <EuiSpacer />
      {/* DisplayToggles wrapper for Docs only */}
      <DisplayToggles canLoading={false}>
        <EuiColorStops
          label="Kitchen sink"
          colorStops={colorStops}
          onChange={setColorStops}
          min={0}
          max={100}
          addStop={addStop}
        />
      </DisplayToggles>
    </React.Fragment>
  );
};
