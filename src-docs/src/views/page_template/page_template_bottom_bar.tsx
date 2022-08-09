import React, { ReactElement } from 'react';

import {
  EuiPageTemplate,
  EuiPageTemplateProps,
  EuiPageHeaderProps,
  EuiPageSidebarProps,
} from '../../../../src';

export default ({
  button = <></>,
  content = <></>,
  sidebar,
  header,
  restrictWidth,
  bottomBar,
  sidebarSticky,
  offset,
  grow,
}: {
  button: ReactElement;
  content: ReactElement;
  sidebar?: ReactElement;
  bottomBar?: ReactElement;
  header?: EuiPageHeaderProps;
  restrictWidth?: EuiPageTemplateProps['restrictWidth'];
  // For fullscreen only
  sidebarSticky?: EuiPageSidebarProps['sticky'];
  offset?: EuiPageTemplateProps['offset'];
  grow?: EuiPageTemplateProps['grow'];
}) => {
  return (
    <EuiPageTemplate restrictWidth={restrictWidth} offset={offset} grow={grow}>
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
        <EuiPageTemplate.BottomBar paddingSize="s">
          {bottomBar}
        </EuiPageTemplate.BottomBar>
      )}
    </EuiPageTemplate>
  );
};
