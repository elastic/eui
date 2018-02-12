import React from 'react';

import {
  EuiButton,
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup gutterSize="l">
    <EuiFlexItem>
      <EuiCard
        image="https://source.unsplash.com/400x200/?Nature"
        title="Elastic in Nature"
        description="Example of a card's description. Stick to one or two sentences."
        footer={<EuiButton>Go for it</EuiButton>}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        image="https://source.unsplash.com/400x200/?Water"
        title="Elastic in Water"
        description="Example of a card's description. Stick to one or two sentences."
        footer={<EuiButton>Go for it</EuiButton>}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        image="https://source.unsplash.com/400x200/?City"
        icon={<EuiIcon size="xxl" type="logoBeats" />}
        title={`Beats in the City`}
        description="Example of a card's description. Stick to one or two sentences."
        footer={<EuiButton>Go for it</EuiButton>}
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
