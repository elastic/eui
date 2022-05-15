import React, { ReactElement } from 'react';

import { EuiPageTemplate, EuiPageTemplateProps } from '../../../../../src';

export default ({
  content = <></>,
  sidebar,
  header,
  panelled,
}: {
  content: ReactElement;
  sidebar?: EuiPageTemplateProps['pageSideBar'];
  header?: EuiPageTemplateProps['pageHeader'];
  panelled?: EuiPageTemplateProps['panelled'];
}) => (
  <EuiPageTemplate
    pageSideBar={sidebar}
    pageHeader={header}
    panelled={panelled}
  >
    {content}
  </EuiPageTemplate>
);
