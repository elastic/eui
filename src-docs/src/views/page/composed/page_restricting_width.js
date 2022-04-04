import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
} from '../../../../../src';

export default ({ pageHeader, content, sideNav }) => {
  return (
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
          <EuiPageContentBody restrictWidth={'75%'}>
            {content}
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
