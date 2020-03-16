import React from 'react';

import {
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

const icons = ['Beats', 'Cloud', 'Xpack', 'Kibana'];

const cardNodes = icons.map(function(item, index) {
  return (
    <EuiFlexItem key={index}>
      <EuiCard
        icon={<EuiIcon size="xxl" type={`logo${item}`} />}
        title={`Elastic ${item}`}
        description="Example of a card's description. Stick to one or two sentences."
        onClick={() => window.alert('Card clicked')}
      />
    </EuiFlexItem>
  );
});

export default () => <EuiFlexGroup gutterSize="l">{cardNodes}</EuiFlexGroup>;
