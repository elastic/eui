import React from 'react';

import { EuiCard, EuiIcon, EuiFlexGroup, EuiFlexItem } from '../../../../src';

export default () => (
  <EuiFlexGroup gutterSize="l">
    <EuiFlexItem>
      <EuiCard
        layout="horizontal"
        icon={<EuiIcon size="xl" type={'logoBeats'} />}
        title={'Elastic Beats'}
        description="This card adds uses an 'xl' size icon which works well in a horizontal layout."
        onClick={() => {}}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        layout="horizontal"
        icon={<EuiIcon size="l" type={'logoCloud'} />}
        titleSize="xs"
        title={'Elastic Cloud'}
        description="This card uses an 'l' size icon but also shrinks the 'titleSize' to 'xs'."
        onClick={() => {}}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        layout="horizontal"
        title={'No icon example'}
        description="Example of a card's description. Stick to one or two sentences."
        onClick={() => {}}
        href="#"
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
