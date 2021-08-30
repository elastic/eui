import React from 'react';

import { EuiPageTemplate, EuiEmptyPrompt } from '../../../../src/components';

export default ({ button = <></>, content, sideNav }) => {
  return (
    <EuiPageTemplate
      template="centeredBody"
      pageContentProps={{ paddingSize: 'none' }}
      pageSideBar={sideNav}
    >
      <EuiEmptyPrompt
        title={<span>No spice</span>}
        body={content}
        actions={button}
      />
    </EuiPageTemplate>
  );
};
