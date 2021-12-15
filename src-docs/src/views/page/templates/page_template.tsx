import React, { ReactNode, useState } from 'react';

import { EuiPageTemplate } from '../../../../../src';

export default ({
  button = <></>,
  content,
  sideNav,
}: {
  button?: ReactNode;
  content?: ReactNode;
  sideNav?: ReactNode;
}) => {
  const [showBottomBar, setshowBottomBar] = useState(false);

  return (
    <EuiPageTemplate
      pageSideBar={sideNav}
      bottomBar={showBottomBar ? 'Bottom bar' : undefined}
      pageHeader={{
        iconType: 'logoElastic',
        pageTitle: 'Page title',
        rightSideItems: [button],
        tabs: [
          { label: 'Tab 1', isSelected: true },
          {
            label: 'Tab 2',
            onClick: () => setshowBottomBar((showing) => !showing),
          },
        ],
      }}
    >
      {content}
    </EuiPageTemplate>
  );
};
