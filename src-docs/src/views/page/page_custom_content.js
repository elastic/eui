import React from 'react';

import {
  EuiPage,
  EuiPageHeader,
  EuiButton,
  EuiPageContentBody,
  EuiPageBody,
} from '../../../../src/components';
import { EuiFlexGrid, EuiFlexItem } from '../../../../src/components/flex';
import { EuiPanel } from '../../../../src/components/panel';

export default ({ button = <></> }) => (
  <EuiPage paddingSize="none">
    <EuiPageBody>
      <EuiPageHeader
        iconType="logoElastic"
        pageTitle="Page title"
        rightSideItems={[button, <EuiButton>Do something</EuiButton>]}
        paddingSize="l"
      />
      <EuiPageContentBody paddingSize="l" style={{ paddingTop: 0 }}>
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
