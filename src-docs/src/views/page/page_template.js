import React, { useState } from 'react';

import { EuiPageTemplate } from '../../../../src/components';

export default ({ button = <></>, content, sideNav }) => {
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
