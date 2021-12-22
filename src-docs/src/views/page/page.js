import React from 'react';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <EuiPage paddingSize="l">
    <EuiPageSideBar>SideBar nav</EuiPageSideBar>
    <EuiPageBody>
      <EuiPageHeader paddingSize="none" alignItems="center">
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Page title</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
        <EuiPageHeaderSection>Page abilities</EuiPageHeaderSection>
      </EuiPageHeader>
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
