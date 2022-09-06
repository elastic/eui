import React, { useState } from 'react';

import { EuiPageTemplate_Deprecated as EuiPageTemplate } from '../../../../src';

export default () => {
  const [showBottomBar, setshowBottomBar] = useState(false);

  return (
    <EuiPageTemplate
      template="default"
      pageSideBar={'sideNav'}
      paddingSize="m"
      bottomBar={showBottomBar ? 'Bottom bar' : undefined}
      pageHeader={{
        iconType: 'logoElastic',
        pageTitle: 'Page title',
        rightSideItems: ['button'],
        tabs: [
          { label: 'Tab 1', isSelected: true },
          {
            label: 'Tab 2',
            onClick: () => setshowBottomBar((showing) => !showing),
          },
        ],
      }}
    >
      {'content'}
    </EuiPageTemplate>
  );
};
