import React, { ReactNode } from 'react';

import {
  EuiPage,
  EuiPageContent,
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
          restrictWidth="75%"
          bottomBorder={sideNav ? true : 'extended'}
          iconType={'logoElastic'}
          pageTitle={'Page title'}
          rightSideItems={[button]}
          description={'Restricting the width to 75%.'}
        />
        <EuiPageContent restrictWidth="75%" alignment="top">
          {content}
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
