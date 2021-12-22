import React, { ReactElement } from 'react';

import {
  EuiPage,
  EuiPageProps,
  EuiPageContent,
  EuiPageSideBar,
  EuiPageBody,
} from '../../../../../src';

export default ({
  content = <></>,
  sideBar = <></>,
  ...rest
}: EuiPageProps & {
  content: ReactElement;
  sideBar: ReactElement;
}) => (
  <EuiPage {...rest}>
    <EuiPageSideBar paddingSize="l">{sideBar}</EuiPageSideBar>
    <EuiPageBody panelled>
      <EuiPageContent panelled={false}>{content}</EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
