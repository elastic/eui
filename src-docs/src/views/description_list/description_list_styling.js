import React, { useState } from 'react';

import {
  EuiDescriptionList,
  EuiSpacer,
  EuiButtonGroup,
  EuiSwitch,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => {
  const favoriteVideoGames = [
    {
      title: 'The Elder Scrolls: Morrowind',
      description: 'The opening music alone evokes such strong memories.',
    },
    {
      title: 'TIE Fighter',
      description:
        'The sequel to XWING, join the dark side and fly for the Emporer.',
    },
    {
      title: 'Quake 2',
      description: 'The game that made me drop out of college.',
    },
  ];

  const alignToggleButtons = [
    {
      id: 'left',
      label: 'Left',
    },
    {
      id: 'center',
      label: 'Center',
    },
  ];

  const [alignSelected, setAlignSelected] = useState('center');

  const alignOnChange = (id) => {
    setAlignSelected(id);
  };

  const gutterToggleButtons = [
    {
      id: 's',
      label: 'Small',
    },
    {
      id: 'm',
      label: 'Medium',
    },
  ];

  const [gutterSelected, setGutterSelected] = useState('m');

  const gutterOnChange = (id) => {
    setGutterSelected(id);
  };

  const [compressed, setCompressed] = useState(true);

  const compressedOnChange = () => {
    setCompressed(!compressed);
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiTitle size="xxs">
            <h3>Align options</h3>
          </EuiTitle>
          <EuiButtonGroup
            legend="Toggle for the EuiDescription align prop"
            options={alignToggleButtons}
            idSelected={alignSelected}
            onChange={(id) => alignOnChange(id)}
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiTitle size="xxs">
            <h3>Row gutter sizes</h3>
          </EuiTitle>
          <EuiButtonGroup
            legend="Toggle for the EuiDescription gutterSize prop"
            options={gutterToggleButtons}
            idSelected={gutterSelected}
            onChange={(id) => gutterOnChange(id)}
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiTitle size="xxs">
            <h3>Compressed</h3>
          </EuiTitle>
          <EuiSwitch
            label="Compressed"
            checked={compressed}
            onChange={compressedOnChange}
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiDescriptionList
        listItems={favoriteVideoGames}
        align={alignSelected}
        compressed={compressed}
        gutterSize={gutterSelected}
      />

      <EuiSpacer size="l" />

      <EuiDescriptionList
        listItems={favoriteVideoGames}
        type="column"
        align={alignSelected}
        compressed={compressed}
        gutterSize={gutterSelected}
      />

      <EuiSpacer size="l" />

      <EuiDescriptionList
        listItems={favoriteVideoGames}
        type="inline"
        align={alignSelected}
        compressed={compressed}
      />
    </div>
  );
};
