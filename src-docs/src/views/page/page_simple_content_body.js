import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiEmptyPrompt,
  EuiPageBody,
} from '../../../../src/components';

export default ({ button = <></>, content }) => {
  return (
    <EuiPage paddingSize="none">
      <EuiPageBody paddingSize="l">
        <EuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          paddingSize="none"
        >
          <EuiEmptyPrompt
            title={<span>No spice</span>}
            body={content}
            actions={button}
          />
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
