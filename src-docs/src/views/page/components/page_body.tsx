import React, { ReactElement } from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageSideBar,
  EuiPageBody,
  EuiPageBodyProps,
} from '../../../../../src';

export default ({
  content = <></>,
  sideBar,
  ...rest
}: EuiPageBodyProps & {
  content: ReactElement;
  sideBar?: ReactElement;
}) => (
  <EuiPage>
    {sideBar && <EuiPageSideBar paddingSize="l">{sideBar}</EuiPageSideBar>}
    <EuiPageBody paddingSize="l" panelled={!!sideBar} {...rest}>
      <EuiPageContent panelled={false}>{content}</EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
