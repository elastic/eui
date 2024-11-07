import React, { useEffect, useState } from 'react';
import { VIS_COLOR_STORE_EVENTS } from '@elastic/eui-theme-common';
import {
  EUI_VIS_COLOR_STORE,
  euiPaletteColorBlind,
  euiPaletteForStatus,
  euiPaletteForTemperature,
} from '../../../../src/services';

import {
  EuiSwitch,
  EuiSpacer,
  EuiCode,
  EuiColorPalettePicker,
} from '../../../../src/components/';

import { DisplayToggles } from '../form_controls/display_toggles';

const getPalettes = () => [
  {
    value: 'palette_1',
    title: 'EUI color blind (fixed)',
    palette: euiPaletteColorBlind(),
    type: 'fixed',
  },
  {
    value: 'palette_2',
    title: 'EUI palette for status (gradient)',
    palette: euiPaletteForStatus(5),
    type: 'gradient',
  },
  {
    value: 'palette_3',
    title: 'EUI palette for temperature (fixed)',
    palette: euiPaletteForTemperature(5),
    type: 'fixed',
  },
  {
    value: 'palette_4',
    title: 'Grayscale (gradient with stops)',
    palette: [
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
    ],
    type: 'gradient',
  },
  {
    value: 'pallette_5',
    title: 'Grayscale (fixed with stops)',
    palette: [
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
    ],
    type: 'fixed',
  },
  {
    value: 'custom',
    title: 'Plain text as a custom option',
    type: 'text',
  },
];

export default () => {
  const [selectionDisplay, setSelectionDisplay] = useState(false);
  const [palettes, setPalettes] = useState(getPalettes());
  const [selectedPalette, setSelectedPalette] = useState('palette_1');

  useEffect(() => {
    const storeId = EUI_VIS_COLOR_STORE.subscribe(
      VIS_COLOR_STORE_EVENTS.UPDATE,
      () => {
        setPalettes(getPalettes());
      }
    );

    return () => {
      EUI_VIS_COLOR_STORE.unsubscribe(VIS_COLOR_STORE_EVENTS.UPDATE, storeId);
    };
  }, []);

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
          onChange={setSelectedPalette}
          valueOfSelected={selectedPalette}
          selectionDisplay={selectionDisplay ? 'title' : 'palette'}
        />
      </DisplayToggles>
    </>
  );
};
