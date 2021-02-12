import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiEmptyPrompt,
  EuiPageSideBar,
} from '../../../../src/components';

export default ({ button, content, sideNav }) => {
  return (
    <EuiPage paddingSize="none">
      <EuiPageSideBar>{sideNav}</EuiPageSideBar>

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
    </EuiPage>
  );
};
