import React, { ReactElement } from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
  EuiPageHeaderProps,
} from '../../../../../src';

export default ({
  content = <></>,
  sideNav,
  pageHeader,
}: {
  content: ReactElement;
  sideNav?: ReactElement;
  pageHeader?: EuiPageHeaderProps;
}) => (
  <EuiPage paddingSize="none">
    <EuiPageSideBar paddingSize="l" sticky>
      {sideNav}
    </EuiPageSideBar>

    <EuiPageBody panelled>
      <EuiPageHeader
        {...pageHeader}
        restrictWidth={'75%'}
        description="Restricting the width to 75%."
        paddingSize="l"
        bottomBorder
      />

      <EuiPageContent
        hasBorder={false}
        hasShadow={false}
        paddingSize="l"
        color="transparent"
        borderRadius="none"
      >
        <EuiPageContentBody restrictWidth={'75%'}>{content}</EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
