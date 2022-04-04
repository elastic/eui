import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageSideBar,
  EuiPageBody,
  EuiPageHeader,
} from '../../../../../src';

export default ({ pageHeader, content, sideNav }) => {
  return (
    <EuiPage paddingSize="none">
      {sideNav && (
        <EuiPageSideBar paddingSize="l" sticky>
          {sideNav}
        </EuiPageSideBar>
      )}

      <EuiPageBody paddingSize="l">
        <EuiPageHeader {...pageHeader} restrictWidth bottomBorder />
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
};
