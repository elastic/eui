import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiEmptyPrompt,
  EuiPageHeader,
  EuiPageSideBar,
} from '../../../../src/components';

export default ({ button, sideNav }) => (
  <EuiPage paddingSize="none">
    <EuiPageSideBar>{sideNav}</EuiPageSideBar>

    <EuiPageContent
      borderRadius="none"
      style={{ display: 'flex', flexDirection: 'column' }}>
      <EuiPageHeader
        iconType="logoElastic"
        pageTitle="Page title"
        rightSideItems={[button]}
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
