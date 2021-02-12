import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiButton,
} from '../../../../src/components';

export default ({ button, content, sideNav }) => (
  <EuiPage paddingSize="none">
    <EuiPageSideBar>{sideNav}</EuiPageSideBar>

    <EuiPageContent borderRadius="none">
      <EuiPageHeader
        iconType="logoElastic"
        pageTitle="Page title"
        rightSideItems={[button, <EuiButton>Do something</EuiButton>]}
      />

      <EuiPageContentBody>{content}</EuiPageContentBody>
    </EuiPageContent>
  </EuiPage>
);
