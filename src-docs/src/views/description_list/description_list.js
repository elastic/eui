import React from 'react';

import {
  EuiDescriptionList,
  EuiFlexItem,
  EuiFlexGroup,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
} from '../../../../src/components';

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
  <EuiFlexGroup>
    <EuiFlexItem>
      <EuiDescriptionList listItems={favoriteVideoGames} />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiDescriptionList>
        <EuiDescriptionListTitle>Dota 2</EuiDescriptionListTitle>
        <EuiDescriptionListDescription>
          A videogame that I have spent way too much time on over the years.
        </EuiDescriptionListDescription>
        <EuiDescriptionListTitle>Kings Quest VI</EuiDescriptionListTitle>
        <EuiDescriptionListDescription>
          The game that forced me to learn DOS.
        </EuiDescriptionListDescription>
      </EuiDescriptionList>
    </EuiFlexItem>
  </EuiFlexGroup>
);
