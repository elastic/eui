import React, { ReactElement } from 'react';

import { EuiPageTemplateProps, EuiPageTemplate } from '../../../../../src';

export default ({
  content = <></>,
  sideNav,
  pageHeader,
  bottomBar,
}: {
  content: ReactElement;
  sideNav?: ReactElement;
  pageHeader?: EuiPageTemplateProps['pageHeader'];
  bottomBar?: ReactElement;
}) => (
  <EuiPageTemplate
    pageSideBar={sideNav}
    pageHeader={pageHeader}
    bottomBar={bottomBar}
  >
    {content}
  </EuiPageTemplate>
);
