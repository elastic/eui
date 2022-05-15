import React, { ReactElement } from 'react';

import { EuiPageTemplate, EuiPageTemplateProps } from '../../../../../src';

export default ({
  content = <></>,
  sidebar,
  header,
  restrictWidth,
}: {
  content: ReactElement;
  sidebar?: ReactElement;
  header?: EuiPageTemplateProps['pageHeader'];
  restrictWidth?: EuiPageTemplateProps['restrictWidth'];
}) => (
  <EuiPageTemplate
    restrictWidth={restrictWidth}
    pageSideBar={sidebar}
    pageHeader={
      header && {
        ...header,
        description: `Restricting the width to ${restrictWidth}.`,
      }
    }
  >
    {content}
  </EuiPageTemplate>
);
