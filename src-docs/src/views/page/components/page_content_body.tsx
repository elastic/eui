import React, { ReactNode } from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiEmptyPrompt,
  EuiPageSideBar,
  EuiPageBody,
  EuiPageHeader,
} from '../../../../../src/components';

export default ({
  content,
  sideNav,
}: {
  content?: ReactNode;
  sideNav?: ReactNode;
}) => {
  return (
    <EuiPage paddingSize="none">
      {sideNav && (
        <EuiPageSideBar paddingSize="l" sticky>
          {sideNav}
        </EuiPageSideBar>
      )}

      <EuiPageBody panelled={Boolean(sideNav)}>
        <EuiPageContent
          restrictWidth="75%"
          template="empty"
          grow={false}
          border={sideNav ? 'bottom' : 'bottomExtended'}
        >
          <EuiPageHeader pageTitle="Page title" />
        </EuiPageContent>
        {/* <EuiPageContent restrictWidth="75%" color="subdued" grow={false}>
          SUBDUED CONTENT
        </EuiPageContent> */}
        <EuiPageContent
          restrictWidth="75%"
          template="empty"
          border={sideNav ? 'top' : 'topExtended'}
        >
          <EuiEmptyPrompt
            title={<span>No spice</span>}
            body={content}
            color="subdued"
          />
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
