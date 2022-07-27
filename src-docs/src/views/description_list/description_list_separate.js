import React from 'react';

import {
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
} from '../../../../src/components';

export default () => (
  <EuiDescriptionList>
    <EuiDescriptionListTitle>
      The Elder Scrolls: Morrowind
    </EuiDescriptionListTitle>
    <EuiDescriptionListDescription>
      The opening music alone evokes such strong memories.
    </EuiDescriptionListDescription>
    <EuiDescriptionListTitle>TIE Fighter</EuiDescriptionListTitle>
    <EuiDescriptionListDescription>
      The sequel to XWING, join the dark side and fly for the Emperor.
    </EuiDescriptionListDescription>
    <EuiDescriptionListTitle>Quake 2</EuiDescriptionListTitle>
    <EuiDescriptionListDescription>
      The game that made me drop out of college.
    </EuiDescriptionListDescription>
  </EuiDescriptionList>
);
