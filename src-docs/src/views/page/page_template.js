import React from 'react';

import { EuiPageTemplate } from '../../../../src/components';

export default ({ button = <></>, content, sideNav }) => (
  <EuiPageTemplate
    pageSideBar={sideNav}
    pageHeader={{
      iconType: 'logoElastic',
      pageTitle: 'Page title',
      rightSideItems: [button],
      tabs: [{ label: 'Tab 1', isSelected: true }, { label: 'Tab 2' }],
    }}>
    {content}
  </EuiPageTemplate>
);
