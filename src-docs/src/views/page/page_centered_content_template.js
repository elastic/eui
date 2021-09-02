import React from 'react';

import { EuiPageTemplate, EuiEmptyPrompt } from '../../../../src/components';

export default ({ button = <></>, content, sideNav }) => (
  <EuiPageTemplate
    template="centeredContent"
    pageContentProps={{ paddingSize: 'none' }}
    pageSideBar={sideNav}
    pageHeader={{
      iconType: 'logoElastic',
      pageTitle: 'Page title',
      rightSideItems: [button],
    }}
  >
    <EuiEmptyPrompt title={<span>No spice</span>} body={content} />
  </EuiPageTemplate>
);
