import React, { useState } from 'react';

import {
  EuiDescriptionList,
  EuiButtonGroup,
  EuiSpacer,
  EuiTitle,
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

  const onChange = (id) => {
    setGutterSelected(id);
  };

  return (
    <>
      <EuiTitle size="xxs">
        <h3>Row gutter sizes</h3>
      </EuiTitle>
      <EuiButtonGroup
        legend="This is a basic group"
        options={gutterToggleButtons}
        idSelected={gutterSelected}
        onChange={(id) => onChange(id)}
      />
      <EuiSpacer />
      <EuiDescriptionList
        type="column"
        gutterSize={gutterSelected}
        listItems={favoriteVideoGames}
      />
      <EuiSpacer />
      <EuiDescriptionList
        type="row"
        gutterSize={gutterSelected}
        listItems={favoriteVideoGames}
      />
    </>
  );
};
