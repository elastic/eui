import React, { ReactElement } from 'react';

import { EuiPageTemplateProps, EuiPageTemplate } from '../../../../../src';

export default ({
  content = <></>,
  sidebar,
  header,
  bottomBar,
}: {
  content: ReactElement;
  sidebar?: ReactElement;
  header?: EuiPageTemplateProps['pageHeader'];
  bottomBar?: ReactElement;
}) => (
  <EuiPageTemplate
    pageSideBar={sidebar}
    pageHeader={header}
    bottomBar={bottomBar}
  >
    {content}
  </EuiPageTemplate>
);
