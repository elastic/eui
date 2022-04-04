import React from 'react';

import { EuiPageTemplate } from '../../../../../src';

export default ({ pageHeader, content, sideNav, template }) => {
  return (
    <EuiPageTemplate
      template={template}
      pageSideBar={sideNav}
      pageHeader={pageHeader}
    >
      {content}
    </EuiPageTemplate>
  );
};
