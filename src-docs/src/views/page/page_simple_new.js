import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageHeader,
  EuiPageBody,
  EuiPageContentBody,
} from '../../../../src/components';

export default ({ button, content }) => (
  <EuiPage paddingSize="none">
    <EuiPageBody>
      <EuiPageHeader
        restrictWidth={'75%'}
        paddingSize="l"
        pageTitle="Page title"
        rightSideItems={[button]}
      />
      <EuiPageContent borderRadius="none" hasShadow={false}>
        <EuiPageContentBody restrictWidth={'75%'}>{content}</EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
