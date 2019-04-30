import React from 'react';

import {
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

const badges = [null, 'Beta', 'Lab'];

const panelNodes = badges.map(function(item, index) {
  return (
    <EuiFlexItem key={index}>
      <EuiPanel
        betaBadgeLabel={badges[index]}
        betaBadgeTooltipContent={
          badges[index]
            ? 'This module is not GA. Please help us by reporting any bugs.'
            : undefined
        }
        onClick={() => window.alert('Card clicked')}>
        I am some panel content
      </EuiPanel>
    </EuiFlexItem>
  );
});

export default () => <EuiFlexGroup gutterSize="l">{panelNodes}</EuiFlexGroup>;
