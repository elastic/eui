import React, { ReactNode, useState } from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
  EuiBottomBar,
} from '../../../../../src';

export default ({
  button = <></>,
  content,
  sideBar,
}: {
  button?: ReactNode;
  content?: ReactNode;
  sideBar?: ReactNode;
}) => {
  const [showBottomBar, setshowBottomBar] = useState(false);

  const bottomBarNode = showBottomBar ? (
    <EuiBottomBar paddingSize="none" position="sticky">
      {/* Wrapping the contents with EuiPageContentBody allows us to match the restrictWidth to keep the contents aligned */}
      <EuiPageContentBody paddingSize={'l'} restrictWidth>
        BottomBar
      </EuiPageContentBody>
    </EuiBottomBar>
  ) : undefined;

  return (
    <EuiPage paddingSize="none">
      {sideBar && (
        <EuiPageSideBar paddingSize="l" sticky>
          {sideBar}
        </EuiPageSideBar>
      )}

      <EuiPageBody panelled={Boolean(sideBar)}>
        <EuiPageHeader
          restrictWidth
          bottomBorder={sideBar ? true : 'extended'}
          iconType="logoElastic"
          pageTitle="Page title"
          rightSideItems={[button]}
          tabs={[
            { label: 'Tab 1', isSelected: true },
            {
              label: 'Tab 2',
              onClick: () => setshowBottomBar((showing) => !showing),
            },
          ]}
        />
        <EuiPageContent restrictWidth>{content}</EuiPageContent>
        {bottomBarNode}
      </EuiPageBody>
    </EuiPage>
  );
};
