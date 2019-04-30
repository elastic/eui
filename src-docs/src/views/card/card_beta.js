import React from 'react';

import {
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

const icons = ['dashboard', 'monitoring', 'watches'];
const badges = [null, 'Beta', 'Lab'];

const cardNodes = icons.map(function(item, index) {
  return (
    <EuiFlexItem key={index}>
      <EuiCard
        icon={<EuiIcon size="xxl" type={`${item}App`} />}
        title={`Kibana ${item}`}
        description="Example of a card's description. Stick to one or two sentences."
        betaBadgeLabel={badges[index]}
        betaBadgeTooltipContent={
          badges[index]
            ? 'This module is not GA. Please help us by reporting any bugs.'
            : undefined
        }
        onClick={() => window.alert('Card clicked')}
      />
    </EuiFlexItem>
  );
});

export default () => <EuiFlexGroup gutterSize="l">{cardNodes}</EuiFlexGroup>;
