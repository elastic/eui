import React from 'react';

import { EuiPageTemplate } from '../../../../src/components';

export default ({ button, content, sideNav }) => {
  return (
    <EuiPageTemplate
      pageSideBar={sideNav}
      restrictWidth="75%"
      pageHeader={{
        iconType: 'logoElastic',
        pageTitle: 'Page title',
        rightSideItems: [button],
        description: 'Simulating a very narrow restricted width of 75%.',
      }}>
      {content}
    </EuiPageTemplate>
  );
};
