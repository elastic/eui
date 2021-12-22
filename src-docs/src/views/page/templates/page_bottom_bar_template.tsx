import React, { ReactNode } from 'react';

import { EuiPageTemplate } from '../../../../../src/components';

export default ({
  button = <></>,
  content = <></>,
  sideNav,
  bottomBar = <></>,
}: {
  button?: ReactNode;
  content?: ReactNode;
  sideNav?: ReactNode;
  bottomBar?: ReactNode;
}) => {
  return (
    <EuiPageTemplate
      pageSideBar={sideNav}
      pageHeader={{
        iconType: 'logoElastic',
        pageTitle: 'Page title',
        rightSideItems: [button],
      }}
      bottomBar={bottomBar}
    >
      {content}
    </EuiPageTemplate>
  );
};
