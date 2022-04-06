import React, { ReactElement } from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
  EuiBottomBar,
  EuiPageHeaderProps,
} from '../../../../../src';

export default ({
  bottomBar = <></>,
  content = <></>,
  sideNav,
  pageHeader,
}: {
  bottomBar: ReactElement;
  content: ReactElement;
  sideNav?: ReactElement;
  pageHeader?: EuiPageHeaderProps;
}) => (
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
