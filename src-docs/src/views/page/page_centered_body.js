import React from 'react';

import {
  EuiPage,
  EuiEmptyPrompt,
  EuiPageSideBar,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
} from '../../../../src/components';

export default ({ button = <></>, content, sideNav }) => {
  return (
    <EuiPage paddingSize="none">
      {sideNav && (
        <EuiPageSideBar paddingSize="l" sticky>
          {sideNav}
        </EuiPageSideBar>
      )}

      <EuiPageBody panelled={Boolean(sideNav)}>
        <EuiPageContent template={sideNav ? 'centeredContent' : 'centeredBody'}>
          <EuiPageContentBody
            template={sideNav ? 'centeredContent' : 'centeredBody'}
          >
            <EuiEmptyPrompt
              color={sideNav ? 'subdued' : 'transparent'}
              title={<span>No spice</span>}
              body={content}
              actions={button}
            />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
