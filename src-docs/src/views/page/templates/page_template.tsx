import React, { ReactNode, useState } from 'react';

import { EuiPageTemplate } from '../../../../../src';

export default ({
  button = <></>,
  content = <></>,
  sideBar,
  tabs,
}: {
  button?: ReactNode;
  content?: ReactNode;
  sideBar?: ReactNode;
  tabs?: Boolean;
}) => {
  const [showBottomBar, setshowBottomBar] = useState(false);

  return (
    <EuiPageTemplate
      pageSideBar={sideBar}
      bottomBar={showBottomBar ? 'Bottom bar' : undefined}
      pageHeader={{
        iconType: 'logoElastic',
        pageTitle: 'Page title',
        rightSideItems: [button],
        tabs: tabs
          ? [
              { label: 'Tab 1', isSelected: true },
              {
                label: 'Tab 2',
                onClick: () => setshowBottomBar((showing) => !showing),
              },
            ]
          : undefined,
      }}
    >
      {content}
    </EuiPageTemplate>
  );
};
