import React from 'react';

import { EuiPageTemplate } from '../../../../src/components';

export default ({ button = <></>, content, sideNav, bottomBar }) => {
  return (
    <EuiPageTemplate
      pageSideBar={sideNav}
      pageHeader={{
        iconType: 'logoElastic',
        pageTitle: 'Page title',
        rightSideItems: [button],
      }}
      bottomBar={bottomBar}>
      {content}
    </EuiPageTemplate>
  );
};
