import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiEmptyPrompt,
  EuiPageHeader,
  EuiPageBody,
} from '../../../../src/components';

export default ({ button = <></>, content }) => (
  <EuiPage paddingSize="none">
    <EuiPageBody>
      <EuiPageContent
        restrictWidth
        template="empty"
        grow={false}
        border="bottomExtended"
      >
        <EuiPageHeader
          iconType="logoElastic"
          pageTitle="Page title"
          rightSideItems={[button]}
        />
      </EuiPageContent>
      <EuiPageContent restrictWidth template="centeredContent">
        <EuiEmptyPrompt
          color="subdued"
          title={<span>No spice</span>}
          body={content}
        />
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
