import React from 'react';

import {
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

const icons = ['Beats', 'Cloud', 'Xpack'];

const cardNodes = icons.map(function (item, index) {
  return (
    <EuiFlexItem key={index}>
      <EuiCard
        layout="horizontal"
        icon={<EuiIcon size="xxl" type={`logo${item}`} />}
        title={`Elastic ${item}`}
        description="Example of a card's description. Stick to one or two sentences."
        onClick={() => window.alert('Card clicked')}
        textAlign="right"
      />
    </EuiFlexItem>
  );
});

export default () => (
  <EuiFlexGroup gutterSize="l">
    {cardNodes}
  </EuiFlexGroup>
);
