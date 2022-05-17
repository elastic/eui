import React, { ReactElement } from 'react';
import { _EuiPageSidebarProps } from '../../../../src/components/page_template/sidebar';

import {
  EuiPageTemplate,
  EuiPageTemplateProps,
  EuiPageHeaderProps,
} from '../../../../src';

export default ({
  button = <></>,
  content = <></>,
  sidebar,
  header,
  restrictWidth,
  bottomBar,
  sidebarSticky,
  grow,
}: {
  button: ReactElement;
  content: ReactElement;
  sidebar?: ReactElement;
  bottomBar?: ReactElement;
  header?: EuiPageHeaderProps;
  restrictWidth?: EuiPageTemplateProps['restrictWidth'];
  sidebarSticky?: _EuiPageSidebarProps['sticky'];
  grow?: EuiPageTemplateProps['grow'];
}) => {
  return (
    <EuiPageTemplate.Outer restrictWidth={restrictWidth} grow={grow}>
      {sidebar && (
        <EuiPageTemplate.Sidebar sticky={sidebarSticky}>
          {sidebar}
        </EuiPageTemplate.Sidebar>
      )}
      {header && (
        <EuiPageTemplate.Header {...header} rightSideItems={[button]} />
      )}
      <EuiPageTemplate.Section grow>{content}</EuiPageTemplate.Section>
      {bottomBar && (
        <EuiPageTemplate.BottomBar>{bottomBar}</EuiPageTemplate.BottomBar>
      )}
    </EuiPageTemplate.Outer>
  );
};
