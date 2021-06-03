import React from 'react';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiTitle,
  EuiButton,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <EuiPage>
    <EuiPageSideBar>SideBar nav</EuiPageSideBar>
    <EuiPageBody>
      <EuiPageHeader
        iconType="logoElastic"
        pageTitle="Page title"
        rightSideItems={[
          <EuiButton fill>Add something</EuiButton>,
          <EuiButton>Do something</EuiButton>,
        ]}
      />
      <EuiPageContent>
        <EuiTitle>
          <h2>Content title</h2>
        </EuiTitle>
        <EuiSpacer />
        <EuiPageContentBody>Content body</EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
