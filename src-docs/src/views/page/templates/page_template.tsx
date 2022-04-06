import React, { ReactElement } from 'react';

import { EuiPageTemplate, EuiPageTemplateProps } from '../../../../../src';

export default ({
  template,
  content = <></>,
  sideNav,
  pageHeader,
}: {
  template: EuiPageTemplateProps['template'];
  content: ReactElement;
  sideNav?: ReactElement;
  pageHeader?: EuiPageTemplateProps['pageHeader'];
}) => (
  <EuiPageTemplate
    template={template}
    pageSideBar={sideNav}
    pageHeader={pageHeader}
  >
    {content}
  </EuiPageTemplate>
);
