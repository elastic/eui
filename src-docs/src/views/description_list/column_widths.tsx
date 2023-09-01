import React from 'react';

import { EuiDescriptionList } from '../../../../src/components';

const listItems = [
  {
    title: '25% width',
    description: '75% width',
  },
  {
    title: 'TIE Fighter',
    description:
      'The sequel to XWING, join the dark side and fly for the Emperor.',
  },
  {
    title: 'Quake 2',
    description: 'The game that made me drop out of college.',
  },
];

export default () => (
  <EuiDescriptionList
    listItems={listItems}
    type="column"
    columnWidths={[1, 3]} // Same as [25, 75]
    style={{ maxInlineSize: '400px' }}
  />
);
