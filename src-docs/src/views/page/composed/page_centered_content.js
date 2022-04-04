import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
} from '../../../../../src';

export default ({ pageHeader, content, sideNav }) => (
  <EuiPage paddingSize="none">
    {sideNav && (
      <EuiPageSideBar paddingSize="l" sticky>
        {sideNav}
      </EuiPageSideBar>
    )}

    <EuiPageBody paddingSize="l" panelled={!!sideNav}>
      <EuiPageHeader {...pageHeader} restrictWidth bottomBorder />

      <EuiPageContent
        verticalPosition="center"
        horizontalPosition="center"
        paddingSize="l"
        color="subdued"
        hasShadow={false}
      >
        {content}
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
