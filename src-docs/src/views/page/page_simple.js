import React from 'react';

import {
  EuiPage,
  EuiPageContent,
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
        paddingBottom={false}
      >
        <EuiPageHeader
          pageTitle="Page title"
          rightSideItems={[button]}
          tabs={[{ label: 'Tab 1', isSelected: true }, { label: 'Tab 2' }]}
        />
      </EuiPageContent>
      <EuiPageContent restrictWidth border="topExtended" template="default">
        {content}
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
