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

    <EuiPageBody panelled={!!sideNav}>
      <EuiPageHeader
        {...pageHeader}
        restrictWidth
        bottomBorder
        paddingSize="l"
      />

      <EuiPageContent
        paddingSize="l"
        verticalPosition="center"
        horizontalPosition="center"
        color="transparent"
      >
        {content}
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
