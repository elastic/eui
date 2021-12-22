import React, { ReactNode } from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
  EuiBottomBar,
} from '../../../../../src';

export default ({
  button = <></>,
  content = <></>,
  sideNav,
  bottomBar = <></>,
}: {
  button?: ReactNode;
  content?: ReactNode;
  sideNav?: ReactNode;
  bottomBar?: ReactNode;
}) => {
  return (
    <EuiPage paddingSize="none">
      {sideNav && (
        <EuiPageSideBar paddingSize="l" sticky>
          {sideNav}
        </EuiPageSideBar>
      )}

      <EuiPageBody panelled={Boolean(sideNav)}>
        <EuiPageHeader
          restrictWidth
          iconType="logoElastic"
          pageTitle="Page title"
          rightSideItems={[button]}
          bottomBorder={sideNav ? true : 'extended'}
        />
        <EuiPageContent restrictWidth>{content}</EuiPageContent>
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
