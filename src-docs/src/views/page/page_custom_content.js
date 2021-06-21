import React from 'react';

import {
  EuiPage,
  EuiPageHeader,
  EuiButton,
  EuiPageContentBody,
  EuiPageBody,
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
} from '../../../../src/components';

export default ({ button = <></> }) => (
  <EuiPage paddingSize="l">
    <EuiPageBody>
      <EuiPageHeader
        iconType="logoElastic"
        pageTitle="Page title"
        rightSideItems={[button, <EuiButton>Do something</EuiButton>]}
        paddingSize="none"
        bottomBorder
      />
      <EuiPageContentBody paddingSize="none">
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
      </EuiPageContentBody>
    </EuiPageBody>
  </EuiPage>
);
