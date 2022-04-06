import React, { ReactElement } from 'react';

import { EuiPageTemplate, EuiPageTemplateProps } from '../../../../../src';

export default ({
  content = <></>,
  sideNav,
  pageHeader,
}: {
  content: ReactElement;
  sideNav?: ReactElement;
  pageHeader?: EuiPageTemplateProps['pageHeader'];
}) => (
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
