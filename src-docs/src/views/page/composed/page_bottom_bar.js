import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
  EuiBottomBar,
} from '../../../../../src';

export default ({ pageHeader, content, sideNav, bottomBar }) => {
  return (
    <EuiPage paddingSize="none">
      {sideNav && (
        <EuiPageSideBar paddingSize="l" sticky>
          {sideNav}
        </EuiPageSideBar>
      )}

      <EuiPageBody panelled={!!sideNav} paddingSize="none">
        <EuiPageHeader
          {...pageHeader}
          paddingSize="l"
          bottomBorder
          restrictWidth
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
        <EuiBottomBar paddingSize="l" position="sticky">
          {/* Wrapping the contents with EuiPageContentBody allows us to match the restrictWidth to keep the contents aligned */}
          <EuiPageContentBody paddingSize={'none'} restrictWidth>
            {bottomBar}
          </EuiPageContentBody>
        </EuiBottomBar>
      </EuiPageBody>
    </EuiPage>
  );
};
