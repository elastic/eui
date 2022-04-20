import React, { ReactElement } from 'react';

import {
  EuiPage,
  EuiPageProps,
  EuiPageSection,
  EuiPageSideBar,
  EuiPageBody,
} from '../../../../../src';

export default ({
  content = <></>,
  sideBar,
  ...rest
}: EuiPageProps & {
  content: ReactElement;
  sideBar?: ReactElement;
}) => (
  <EuiPage paddingSize="none" {...rest}>
    {sideBar && <EuiPageSideBar paddingSize="l">{sideBar}</EuiPageSideBar>}
    <EuiPageBody paddingSize="none" panelled={!!sideBar}>
      <EuiPageSection>{content}</EuiPageSection>
    </EuiPageBody>
  </EuiPage>
);
