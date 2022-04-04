import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
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
        paddingSize="l"
        {...pageHeader}
        restrictWidth
        bottomBorder
      />
      <EuiPageContent
        hasBorder={false}
        hasShadow={false}
        paddingSize="l"
        color={sideNav ? 'transparent' : 'plain'}
        borderRadius="none"
      >
        <EuiPageContentBody restrictWidth>{content}</EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
