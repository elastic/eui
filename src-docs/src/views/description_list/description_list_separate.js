import React from 'react';

import {
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
} from '../../../../src/components';

export default () => (
  <EuiDescriptionList align="center">
    <EuiDescriptionListTitle>Dota 2</EuiDescriptionListTitle>
    <EuiDescriptionListDescription>
      A videogame that I have spent way too much time on over the years.
    </EuiDescriptionListDescription>
    <EuiDescriptionListTitle>Kings Quest VI</EuiDescriptionListTitle>
    <EuiDescriptionListDescription>
      The game that forced me to learn DOS.
    </EuiDescriptionListDescription>
  </EuiDescriptionList>
);
