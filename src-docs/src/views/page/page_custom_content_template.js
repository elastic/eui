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
    pageHeader={{
      iconType: 'logoElastic',
      pageTitle: 'Page title',
      rightSideItems: [button, <EuiButton>Do something</EuiButton>],
      style: {
        marginBottom: 0,
      },
    }}
    pageContentProps={{
      color: 'transparent',
    }}>
    <EuiFlexGrid columns={2}>
      <EuiFlexItem>
        <EuiPanel style={{ height: 150 }} />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel style={{ height: 150 }} />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel style={{ height: 150 }} />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel style={{ height: 150 }} />
      </EuiFlexItem>
    </EuiFlexGrid>
  </EuiPageTemplate>
);
