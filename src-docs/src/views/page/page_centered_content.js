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
    <EuiPageSideBar paddingSize="l" sticky>
      {sideNav}
    </EuiPageSideBar>

    <EuiPageBody panelled>
      <EuiPageHeader
        restrictWidth
        iconType="logoElastic"
        pageTitle="Page title"
        rightSideItems={[button]}
      />

      <EuiPageContent
        verticalPosition="center"
        horizontalPosition="center"
        paddingSize="none"
        color="subdued"
        hasShadow={false}>
        <EuiEmptyPrompt title={<span>No spice</span>} body={content} />
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
