import React from 'react';

import {
  EuiPage,
  EuiPageHeader,
  EuiPageContentBody,
  EuiPageBody,
  EuiPageSideBar,
} from '../../../../../src';

export default ({ pageHeader, content, sideNav }) => (
  <EuiPage paddingSize="none">
    {sideNav && (
      <EuiPageSideBar paddingSize="l" sticky>
        {sideNav}
      </EuiPageSideBar>
    )}
    <EuiPageBody paddingSize="l">
      <EuiPageHeader {...pageHeader} restrictWidth bottomBorder />
      <EuiPageContentBody>{content}</EuiPageContentBody>
    </EuiPageBody>
  </EuiPage>
);
