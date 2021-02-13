import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiEmptyPrompt,
  EuiPageBody,
  EuiPageHeader,
} from '../../../../src/components';

export default ({ button, content }) => {
  return (
    <EuiPage paddingSize="none">
      <EuiPageBody>
        <EuiPageHeader
          iconType="logoElastic"
          pageTitle="Page title"
          rightSideItems={[button]}
          paddingSize="l"
        />

        <EuiPageBody paddingSize="l">
          <EuiPageContent
            verticalPosition="center"
            horizontalPosition="center"
            paddingSize="none">
            <EuiEmptyPrompt
              title={<span>No spice</span>}
              body={content}
              actions={button}
            />
          </EuiPageContent>
        </EuiPageBody>
      </EuiPageBody>
    </EuiPage>
  );
};
