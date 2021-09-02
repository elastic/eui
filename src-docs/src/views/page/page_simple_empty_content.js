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
      <EuiPageHeader
        restrictWidth
        iconType="logoElastic"
        pageTitle="Page title"
        rightSideItems={[button]}
        paddingSize="l"
      />
      <EuiPageContent
        borderRadius="none"
        hasShadow={false}
        style={{ display: 'flex' }}
      >
        <EuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          paddingSize="none"
          color="subdued"
          hasShadow={false}
        >
          <EuiEmptyPrompt title={<span>No spice</span>} body={content} />
        </EuiPageContent>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
