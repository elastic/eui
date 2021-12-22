import React, { ReactNode } from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiEmptyPrompt,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
} from '../../../../../src';

export default ({
  button = <></>,
  content = <></>,
  sideNav,
}: {
  button?: ReactNode;
  content?: ReactNode;
  sideNav?: ReactNode;
}) => (
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

      <EuiPageContent restrictWidth alignment="center">
        <EuiEmptyPrompt
          color="subdued"
          title={<span>No spice</span>}
          body={content}
        />
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
