import React, { ReactElement } from 'react';

import {
  EuiPage,
  EuiPageContent,
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
