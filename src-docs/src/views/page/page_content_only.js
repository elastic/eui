import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
} from '../../../../src/components';

export default ({ button, content, sideNav }) => {
  return (
    <EuiPage paddingSize="none">
      <EuiPageSideBar>{sideNav}</EuiPageSideBar>

      <EuiPageContent borderRadius="none">
        <EuiPageHeader
          restrictWidth={'75%'}
          iconType="logoElastic"
          pageTitle="Page title"
          rightSideItems={[button]}
          description="Simulating a very narrow restricted width of 75%."
        />

        <EuiPageContentBody restrictWidth={'75%'}>{content}</EuiPageContentBody>
      </EuiPageContent>
    </EuiPage>
  );
};
