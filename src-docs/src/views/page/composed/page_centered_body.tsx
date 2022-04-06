import React, { ReactElement } from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageSideBar,
  EuiPageBody,
  EuiPageHeader,
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

    <EuiPageBody paddingSize="l">
      {pageHeader && (
        <EuiPageHeader {...pageHeader} restrictWidth bottomBorder />
      )}
      <EuiPageContent
        verticalPosition="center"
        horizontalPosition="center"
        paddingSize="l"
      >
        {content}
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
