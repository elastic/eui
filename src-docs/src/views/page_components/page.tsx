import React, { ReactElement } from 'react';

import {
  EuiPage,
  EuiPageProps,
  EuiPageSection,
  EuiPageSidebar,
  EuiPageBody,
} from '../../../../src';

export default ({
  content = <></>,
  sideBar,
  ...rest
}: Omit<EuiPageProps, 'content'> & {
  content: ReactElement;
  sideBar?: ReactElement;
}) => (
  <EuiPage paddingSize="none" {...rest}>
    {sideBar && <EuiPageSidebar paddingSize="l">{sideBar}</EuiPageSidebar>}
    <EuiPageBody paddingSize="none" panelled={!!sideBar}>
      <EuiPageSection>{content}</EuiPageSection>
    </EuiPageBody>
  </EuiPage>
);
