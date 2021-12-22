import React, { ReactNode } from 'react';

import { EuiPageTemplate, EuiEmptyPrompt } from '../../../../../src';

export default ({
  button = <></>,
  content = <></>,
  sideNav,
}: {
  button?: ReactNode;
  content?: ReactNode;
  sideNav?: ReactNode;
}) => (
  <EuiPageTemplate
    template="emptyContent"
    pageSideBar={sideNav}
    pageHeader={{
      iconType: 'logoElastic',
      pageTitle: 'Page title',
      rightSideItems: [button],
    }}
  >
    <EuiEmptyPrompt
      color="subdued"
      title={<span>No spice</span>}
      body={content}
    />
  </EuiPageTemplate>
);
