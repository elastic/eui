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
      <EuiPageSideBar paddingSize="l" sticky>
        {sideNav}
      </EuiPageSideBar>

      {/* Double EuiPageBody to accommodate for the bottom bar */}
      <EuiPageBody panelled paddingSize="none">
        <EuiPageBody paddingSize="l">
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
          {/* Wrapping the contents with EuiPageContentBody allows us to match the restrictWidth to keep the contents aligned */}
          <EuiPageContentBody paddingSize={'none'} restrictWidth>
            {bottomBar}
          </EuiPageContentBody>
        </EuiBottomBar>
      </EuiPageBody>
    </EuiPage>
  );
};
