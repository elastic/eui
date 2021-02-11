import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiEmptyPrompt,
  EuiPageHeader,
  EuiPageSideBar,
  EuiButton,
} from '../../../../src/components';

export default () => (
  <EuiPage paddingSize="none">
    <EuiPageSideBar>SideBar nav</EuiPageSideBar>

    <EuiPageContent
      borderRadius="none"
      style={{ display: 'flex', flexDirection: 'column' }}>
      <EuiPageHeader
        iconType="logoElastic"
        pageTitle="Page title"
        rightSideItems={[<EuiButton fill>Add something</EuiButton>]}
      />

      <EuiPageContent
        verticalPosition="center"
        horizontalPosition="center"
        paddingSize="none"
        color="subdued"
        hasShadow={false}>
        <EuiEmptyPrompt
          title={<span>No spice</span>}
          body={
            <p>
              Navigators use massive amounts of spice to gain a limited form of
              prescience.{' '}
            </p>
          }
        />
      </EuiPageContent>
    </EuiPageContent>
  </EuiPage>
);
