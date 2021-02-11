import React from 'react';

import {
  EuiPage,
  EuiPageHeader,
  EuiPageBody,
  EuiButton,
} from '../../../../src/components';
import { EuiFlexGrid, EuiFlexItem } from '../../../../src/components/flex';
import { EuiPanel } from '../../../../src/components/panel';

export default () => (
  <EuiPage paddingSize="none">
    <EuiPageBody>
      <EuiPageHeader
        iconType="logoElastic"
        pageTitle="Page title"
        rightSideItems={[
          <EuiButton fill>Add something</EuiButton>,
          <EuiButton>Do something</EuiButton>,
        ]}
      />
      <div style={{ padding: 24 }}>
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
      </div>
    </EuiPageBody>
  </EuiPage>
);
