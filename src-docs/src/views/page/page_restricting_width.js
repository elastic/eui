import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
  EuiText,
} from '../../../../src/components';

export default ({ button = <></>, content, sideNav }) => {
  return (
    <EuiPage paddingSize="none">
      {sideNav && (
        <EuiPageSideBar paddingSize="l" sticky>
          {sideNav}
        </EuiPageSideBar>
      )}

      <EuiPageBody panelled={Boolean(sideNav)}>
        <EuiPageContent
          restrictWidth="75%"
          template="empty"
          grow={false}
          border={'bottomExtended'}
        >
          <EuiPageHeader pageTitle="Page title" rightSideItems={[button]} />
        </EuiPageContent>
        <EuiPageContent restrictWidth="75%" color="subdued" grow={false}>
          <EuiText>
            <p>Restricting the width to 75% on multiple contents.</p>
          </EuiText>
        </EuiPageContent>
        <EuiPageContent
          restrictWidth="75%"
          template="default"
          border={'topExtended'}
        >
          {content}
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
