import React, { ReactElement } from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
  EuiPageHeaderProps,
} from '../../../../../src';

export default ({
  content = <></>,
  sideNav,
  pageHeader,
}: {
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
        color={'plain'}
        borderRadius="none"
      >
        <EuiPageContentBody restrictWidth>{content}</EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
