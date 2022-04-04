import React from 'react';

import { EuiPageTemplate } from '../../../../../src';

export default ({ pageHeader, content, sideNav, bottomBar }) => {
  return (
    <EuiPageTemplate
      pageSideBar={sideNav}
      pageHeader={pageHeader}
      bottomBar={bottomBar}
    >
      {content}
    </EuiPageTemplate>
  );
};
