import React from 'react';

import { EuiDescriptionList, EuiSpacer } from '../../../../src/components';

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
export default () => (
  <div style={{ maxWidth: '400px' }}>
    <EuiDescriptionList
      listItems={favoriteVideoGames}
      align="center"
      compressed
    />

    <EuiSpacer size="l" />

    <EuiDescriptionList
      listItems={favoriteVideoGames}
      type="column"
      align="center"
      compressed
    />

    <EuiSpacer size="l" />

    <EuiDescriptionList
      listItems={favoriteVideoGames}
      type="inline"
      align="center"
      compressed
    />
  </div>
);
