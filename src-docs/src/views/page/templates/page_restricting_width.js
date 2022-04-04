import React from 'react';

import { EuiPageTemplate } from '../../../../../src';

export default ({ pageHeader, content, sideNav }) => {
  return (
    <EuiPageTemplate
      pageSideBar={sideNav}
      restrictWidth="75%"
      pageHeader={{
        ...pageHeader,
        description: 'Restricting the width to 75%.',
      }}
    >
      {content}
    </EuiPageTemplate>
  );
};
