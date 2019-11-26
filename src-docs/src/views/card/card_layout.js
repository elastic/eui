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
        icon={<EuiIcon size="xl" type={'logoBeats'} />}
        title={'Elastic Beats'}
        description="This card adds uses an xl size icon and it works well in a horizontal layout."
        onClick={() => window.alert('Card clicked')}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        layout="horizontal"
        icon={<EuiIcon size="l" type={'logoCloud'} />}
        titleSize="xs"
        title={'Elastic Cloud'}
        description="This card uses a large size icon and therefore also shrinks its title size to xs."
        onClick={() => window.alert('Card clicked')}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        layout="horizontal"
        title={'No icon example'}
        description="Example of a card's description. Stick to one or two sentences."
        onClick={() => window.alert('Card clicked')}
        href="#"
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
