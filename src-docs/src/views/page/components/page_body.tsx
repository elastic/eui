import React, { ReactElement } from 'react';

import {
  EuiPage,
  EuiPageSection,
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
    <EuiPageBody panelled={!!sideBar} {...rest}>
      <EuiPageSection>{content}</EuiPageSection>
    </EuiPageBody>
  </EuiPage>
);
