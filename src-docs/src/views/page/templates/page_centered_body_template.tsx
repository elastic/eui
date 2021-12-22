import React, { ReactNode } from 'react';

import { EuiPageTemplate, EuiEmptyPrompt } from '../../../../../src/components';

export default ({
  button = <></>,
  content = <></>,
  sideNav,
}: {
  button?: ReactNode;
  content?: ReactNode;
  sideNav?: ReactNode;
}) => {
  return (
    <EuiPageTemplate
      template="emptyPage"
      pageSideBar={sideNav}
      pageHeader={{
        iconType: 'logoElastic',
        pageTitle: 'Page title',
        rightSideItems: [button],
      }}
    >
      <EuiEmptyPrompt
        color={sideNav ? 'subdued' : 'plain'}
        title={<span>No spice</span>}
        body={content}
        actions={button}
      />
    </EuiPageTemplate>
  );
};
