import React, { ReactElement } from 'react';

import {
  EuiPage,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
  EuiPageHeaderProps,
  EuiPageSection,
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
    {sideNav && (
      <EuiPageSideBar paddingSize="l" sticky>
        {sideNav}
      </EuiPageSideBar>
    )}

    <EuiPageBody panelled={!!sideNav}>
      <EuiPageHeader
        {...pageHeader}
        restrictWidth
        bottomBorder
        paddingSize="l"
      />

      <EuiPageSection
        color={sideNav ? 'transparent' : 'plain'}
        alignment="center"
      >
        {content}
      </EuiPageSection>
    </EuiPageBody>
  </EuiPage>
);
