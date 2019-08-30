import React from 'react';

import {
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup gutterSize="l">
    <EuiFlexItem>
      <EuiCard
        layout="horizontal"
        icon={<EuiIcon size="l" type={'logoBeats'} />}
        title={'Elastic Beats'}
        description="Example of a card's description. Stick to one or two sentences."
        onClick={() => window.alert('Card clicked')}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        layout="horizontal"
        icon={<EuiIcon size="l" type={'logoCloud'} />}
        title={'Elastic Cloud'}
        description="Example of a card's description. Stick to one or two sentences."
        onClick={() => window.alert('Card clicked')}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        layout="horizontal"
        title={'No icon example'}
        icon={<EuiIcon size="l" type={'logoCloud'} />}
        description="Example of a card's description. Stick to one or two sentences."
        onClick={() => window.alert('Card clicked')}
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
