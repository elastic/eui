import React from 'react';

import {
  EuiPageTemplate,
  EuiButton,
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
} from '../../../../src/components';

export default ({ button = <></> }) => (
  <EuiPageTemplate
    restrictWidth={false}
    template="empty"
    pageHeader={{
      iconType: 'logoElastic',
      pageTitle: 'Page title',
      rightSideItems: [button, <EuiButton>Do something</EuiButton>],
    }}
  >
    <EuiFlexGrid columns={2}>
      <EuiFlexItem>
        <EuiPanel style={{ height: 200 }} />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel style={{ height: 200 }} />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel style={{ height: 200 }} />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel style={{ height: 200 }} />
      </EuiFlexItem>
    </EuiFlexGrid>
  </EuiPageTemplate>
);
