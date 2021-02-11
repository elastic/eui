import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiButton,
} from '../../../../src/components';

export default () => (
  <EuiPage paddingSize="none">
    <EuiPageSideBar>SideBar nav</EuiPageSideBar>

    <EuiPageContent borderRadius="none">
      <EuiPageHeader
        iconType="logoElastic"
        pageTitle="Page title"
        rightSideItems={[
          <EuiButton fill>Add something</EuiButton>,
          <EuiButton>Do something</EuiButton>,
        ]}
        tabs={[
          {
            label: 'Tab 1',
            isSelected: true,
          },
          {
            label: 'Tab 2',
          },
        ]}
        description="This description should."
      />

      <EuiPageContentBody>Content body</EuiPageContentBody>
    </EuiPageContent>
  </EuiPage>
);
