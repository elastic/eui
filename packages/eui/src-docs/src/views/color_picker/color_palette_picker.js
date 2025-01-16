import React, { useState } from 'react';
import { css } from '@emotion/react';

import {
  euiPaletteColorBlind,
  euiPaletteForStatus,
  euiPaletteForTemperature,
} from '../../../../src/services';

import {
  EuiSwitch,
  EuiSpacer,
  EuiCode,
  EuiColorPalettePicker,
  EuiText,
  EuiFlexGroup,
} from '../../../../src/components/';

import { DisplayToggles } from '../form_controls/display_toggles';

/** Text wrapper to remove text-decoration on appended text */
const AppendedTitleText = ({ label }) => (
  <EuiText color="subdued" size="xs">
    <span
      css={css`
        display: inline-block;
      `}
    >
      {label}
    </span>
  </EuiText>
);

const getPalettes = (appendTitles) => [
  {
    value: 'pallette_1',
    title: 'EUI color blind',
    palette: euiPaletteColorBlind(),
    append: appendTitles && <AppendedTitleText label="fixed" />,
    type: 'fixed',
  },
  {
    value: 'pallette_2',
    title: 'EUI palette for status',
    palette: euiPaletteForStatus(5),
    append: appendTitles && <AppendedTitleText label="gradient" />,
    type: 'gradient',
  },
  {
    value: 'pallette_3',
    title: 'EUI palette for temperature',
    palette: euiPaletteForTemperature(5),
    append: appendTitles && <AppendedTitleText label="fixed" />,
    type: 'fixed',
  },
  {
    value: 'pallette_4',
    title: 'Grayscale',
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
    append: appendTitles && <AppendedTitleText label="gradient with stops" />,
    type: 'gradient',
  },
  {
    value: 'pallette_5',
    title: 'Grayscale',
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
    append: appendTitles && <AppendedTitleText label="fixed with stops" />,
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
  const [showAppendedTitles, setShowAppendedTitles] = useState(false);
  const [pallette, setPallette] = useState('pallette_1');

  return (
    <>
      <EuiFlexGroup>
        <EuiSwitch
          label={
            <span>
              Display selected item as a <EuiCode>title</EuiCode>
            </span>
          }
          checked={selectionDisplay}
          onChange={() => setSelectionDisplay(!selectionDisplay)}
        />
        <EuiSwitch
          label={
            <span>
              Display <EuiCode>append</EuiCode> element on title
            </span>
          }
          checked={showAppendedTitles}
          onChange={() => setShowAppendedTitles(!showAppendedTitles)}
        />
      </EuiFlexGroup>
      <EuiSpacer />
      <DisplayToggles canPrepend={true} canAppend={true} canReadOnly={false}>
        <EuiColorPalettePicker
          palettes={getPalettes(showAppendedTitles)}
          onChange={setPallette}
          valueOfSelected={pallette}
          selectionDisplay={selectionDisplay ? 'title' : 'palette'}
        />
      </DisplayToggles>
    </>
  );
};
