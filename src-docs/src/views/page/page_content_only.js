import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
} from '../../../../src/components';

export default ({ button, content, sideNav }) => {
  return (
    <EuiPage paddingSize="none">
      <EuiPageSideBar sticky>{sideNav}</EuiPageSideBar>

      <EuiPageBody panelled>
        <EuiPageHeader
          restrictWidth={'75%'}
          iconType="logoElastic"
          pageTitle="Page title"
          rightSideItems={[button]}
          description="Simulating a very narrow restricted width of 75%."
        />

        <EuiPageContent
          hasShadow={false}
          paddingSize="none"
          color="transparent"
          borderRadius="none">
          <EuiPageContentBody restrictWidth={'75%'}>
            {content}
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
