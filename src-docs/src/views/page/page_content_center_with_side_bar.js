import React from 'react';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageSideBar,
  EuiTitle,
} from '../../../../src/components';

export default () => (
  <EuiPage>
    <EuiPageSideBar>SideBar nav</EuiPageSideBar>
    {/* The EUI docs site  already has a wrapping <main> tag, so we've changed this example to a <div> for accessibility. You likely don't need to copy the `component` prop for your own usage. */}
    <EuiPageBody component="div">
      <EuiPageHeader
        pageTitle="Page title"
        rightSideItems={['Page abilities']}
        alignItems="center"
      />
      <EuiPageContent verticalPosition="center" horizontalPosition="center">
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Content title</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
          <EuiPageContentHeaderSection>
            Content abilities
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>Content body</EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
