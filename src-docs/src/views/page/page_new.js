import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
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
        tabs={[{ label: 'Tab 1', isSelected: true }, { label: 'Tab 2' }]}
      />
      <EuiPageContent
        hasBorder={false}
        hasShadow={false}
        paddingSize="none"
        color="transparent"
        borderRadius="none">
        <EuiPageContentBody restrictWidth>{content}</EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
