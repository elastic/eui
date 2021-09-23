import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiEmptyPrompt,
  EuiPageSideBar,
  EuiPageBody,
} from '../../../../src/components';

export default ({ button = <></>, content, sideNav }) => {
  return (
    <EuiPage paddingSize="none">
      <EuiPageSideBar paddingSize="l" sticky>
        {sideNav}
      </EuiPageSideBar>

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
