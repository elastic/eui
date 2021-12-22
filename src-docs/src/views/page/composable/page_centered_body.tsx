import React, { ReactNode } from 'react';

import {
  EuiPage,
  EuiEmptyPrompt,
  EuiPageSideBar,
  EuiPageBody,
  EuiPageContent,
} from '../../../../../src/components';

export default ({
  button = <></>,
  content = <></>,
  sideNav,
}: {
  button?: ReactNode;
  content?: ReactNode;
  sideNav?: ReactNode;
}) => {
  return (
    <EuiPage>
      {sideNav && (
        <EuiPageSideBar paddingSize="l" sticky>
          {sideNav}
        </EuiPageSideBar>
      )}

      <EuiPageBody panelled={Boolean(sideNav)}>
        <EuiPageContent panelled={false} alignment={'center'}>
          <EuiEmptyPrompt
            color={sideNav ? 'subdued' : 'plain'}
            title={<span>No spice</span>}
            body={content}
            actions={button}
          />
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
