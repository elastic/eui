import React from 'react';

import {
  EuiButton,
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

const images = ['Nature', 'Water', 'City'];

const cardNodes = images.map(function (item) {
  return (
    <EuiFlexItem>
      <EuiCard
        image={`https://source.unsplash.com/400x200/?${item}`}
        title={`Elastic in ${item}`}
        description="Example of a card's description. Stick to one or two sentences."
        footer={<EuiButton>Go for it</EuiButton>}
      />
    </EuiFlexItem>
  );
});

export default () => (
  <EuiFlexGroup gutterSize="l">
    {cardNodes}
  </EuiFlexGroup>
);
