import React from 'react';

import {
  EuiPage,
  EuiPageHeader,
  EuiCallOut,
  EuiPageContentBody,
  EuiPageBody,
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
} from '../../../../../src/components';

export default ({ pageHeader }) => (
  <EuiPage paddingSize="l">
    <EuiPageBody>
      <EuiCallOut title="This callout is placed before the EuiPageHeader." />
      <EuiSpacer />
      <EuiPageHeader {...pageHeader} bottomBorder />
      <EuiPageContentBody>
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
