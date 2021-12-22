import React, { ReactNode } from 'react';

import {
  EuiPage,
  EuiPageHeader,
  EuiPageContent,
  EuiPageBody,
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
  EuiPageSideBar,
} from '../../../../../src';

export default ({
  button = <></>,
  sideNav,
}: {
  button?: ReactNode;
  sideNav?: ReactNode;
}) => (
  <EuiPage paddingSize="none">
    {sideNav && (
      <EuiPageSideBar paddingSize="l" sticky>
        {sideNav}
      </EuiPageSideBar>
    )}
    <EuiPageBody panelled={!!sideNav}>
      <EuiPageContent
        style={{ position: 'sticky', top: 0 }}
        color="subdued"
        grow={false}
        bottomBorder={'extended'}
      >
        Global content
      </EuiPageContent>
      <EuiPageHeader
        bottomBorder={'extended'}
        pageTitle="Page title"
        rightSideItems={[button]}
      />
      <EuiPageContent panelled={false}>
        <EuiFlexGrid columns={2}>
          <EuiFlexItem>
            <EuiPanel hasBorder={!!sideNav} style={{ height: 200 }} />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel hasBorder={!!sideNav} style={{ height: 200 }} />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel hasBorder={!!sideNav} style={{ height: 200 }} />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel hasBorder={!!sideNav} style={{ height: 200 }} />
          </EuiFlexItem>
        </EuiFlexGrid>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
