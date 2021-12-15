import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
  EuiBottomBar,
} from '../../../../src/components';

export default ({ button = <></>, content, sideNav, bottomBar }) => {
  return (
    <EuiPage paddingSize="none">
      {sideNav && (
        <EuiPageSideBar paddingSize="l" sticky>
          {sideNav}
        </EuiPageSideBar>
      )}

      {/* Double EuiPageBody to accommodate for the bottom bar */}
      <EuiPageBody panelled={Boolean(sideNav)}>
        <EuiPageContent
          restrictWidth
          template="empty"
          grow={false}
          border={sideNav ? 'bottom' : 'bottomExtended'}
        >
          <EuiPageHeader
            iconType="logoElastic"
            pageTitle="Page title"
            rightSideItems={[button]}
          />
        </EuiPageContent>
        <EuiPageContent restrictWidth template="default">
          {content}
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
