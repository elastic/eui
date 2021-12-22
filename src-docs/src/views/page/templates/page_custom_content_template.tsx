import React, { ReactNode } from 'react';

import {
  EuiPageTemplate,
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
  EuiPageContent,
  EuiPageHeader,
} from '../../../../../src';

export default ({
  button = <></>,
  sideNav,
}: {
  button?: ReactNode;
  sideNav?: ReactNode;
}) => (
  <EuiPageTemplate
    restrictWidth={false}
    template="customContent"
    pageSideBar={sideNav}
  >
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
  </EuiPageTemplate>
);
