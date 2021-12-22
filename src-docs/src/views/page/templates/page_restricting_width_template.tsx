import React, { ReactNode } from 'react';

import { EuiPageTemplate } from '../../../../../src';

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
      pageSideBar={sideNav}
      restrictWidth="75%"
      pageHeader={{
        iconType: 'logoElastic',
        pageTitle: 'Page title',
        rightSideItems: [button],
        description: 'Restricting the width to 75%.',
      }}
    >
      {content}
    </EuiPageTemplate>
  );
};
