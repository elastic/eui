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
      />
      <EuiPageContent borderRadius="none" hasShadow={false}>
        <EuiPageContentBody restrictWidth>{content}</EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
