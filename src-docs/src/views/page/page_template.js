import React, { useState } from 'react';

import { EuiPageTemplate } from '../../../../src/components';

export default ({ button = <></>, content, sideNav }) => {
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Tab 1');

  return (
    <EuiPageTemplate
      pageSideBar={sideNav}
      bottomBar={showBottomBar ? 'Bottom bar' : undefined}
      pageHeader={{
        iconType: 'logoElastic',
        // pageTitle: 'Page title',
        rightSideItems: [button],
        tabs: [
          {
            label: 'Tab 1',
            isSelected: selectedTab === 'Tab 1',
            onClick: () => setSelectedTab('Tab 1'),
          },
          {
            label: 'Tab 2',
            isSelected: selectedTab === 'Tab 2',
            onClick: () => {
              setShowBottomBar((showing) => !showing);
              setSelectedTab('Tab 2');
            },
          },
        ],
      }}
    >
      {content}
    </EuiPageTemplate>
  );
};
