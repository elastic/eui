import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageHeader,
  EuiPageBody,
  EuiPageContentBody,
} from '../../../../src/components';

export default ({ button = <></>, content }) => (
  <EuiPage paddingSize="none">
    <EuiPageBody>
      <EuiPageHeader
        restrictWidth
        paddingSize="l"
        pageTitle="Page title"
        rightSideItems={[button]}
        tabs={[{ label: 'Tab 1', isSelected: true }, { label: 'Tab 2' }]}
      />
      <EuiPageContent borderRadius="none" hasShadow={false} paddingSize="none">
        <EuiPageContentBody restrictWidth paddingSize="l">
          {content}
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
