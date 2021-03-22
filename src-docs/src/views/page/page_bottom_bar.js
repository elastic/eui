import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
  EuiBottomBar,
} from '../../../../src/components';

export default ({ button = <></>, content, sideNav, bottomBar }) => {
  return (
    <EuiPage paddingSize="none">
      <EuiPageSideBar sticky>{sideNav}</EuiPageSideBar>

      {/* Double EuiPageBody to accomodate for the bottom bar */}
      <EuiPageBody panelled paddingSize="none">
        <EuiPageBody role="main" paddingSize="l">
          <EuiPageHeader
            bottomBorder
            restrictWidth
            iconType="logoElastic"
            pageTitle="Page title"
            rightSideItems={[button]}
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
        <EuiBottomBar paddingSize="l" position="sticky">
          {bottomBar}
        </EuiBottomBar>
      </EuiPageBody>
    </EuiPage>
  );
};
