import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiEmptyPrompt,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
} from '../../../../src/components';

export default ({ button = <></>, content, sideNav }) => (
  <EuiPage paddingSize="none">
    {sideNav && (
      <EuiPageSideBar paddingSize="l" sticky>
        {sideNav}
      </EuiPageSideBar>
    )}

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

      <EuiPageContent restrictWidth template="centeredContent">
        <EuiEmptyPrompt
          color="subdued"
          title={<span>No spice</span>}
          body={content}
        />
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
