import React, { ReactElement } from 'react';

import {
  EuiPageTemplate,
  EuiPageTemplateProps,
  EuiPageHeaderProps,
  EuiPageSidebarProps,
} from '../../../../src';

export default ({
  button = <></>,
  sidebar,
  emptyPrompt = <></>,
  header,
  panelled,
  sidebarSticky,
  offset,
  grow,
}: {
  button: ReactElement;
  sidebar?: ReactElement;
  emptyPrompt: ReactElement;
  header?: EuiPageHeaderProps;
  panelled?: EuiPageTemplateProps['panelled'];
  // For fullscreen only
  sidebarSticky?: EuiPageSidebarProps['sticky'];
  offset?: EuiPageTemplateProps['offset'];
  grow?: EuiPageTemplateProps['grow'];
}) => {
  return (
    <EuiPageTemplate panelled={panelled} offset={offset} grow={grow}>
      {sidebar && (
        <EuiPageTemplate.Sidebar sticky={sidebarSticky}>
          {sidebar}
        </EuiPageTemplate.Sidebar>
      )}
      {header && (
        <EuiPageTemplate.Header {...header} rightSideItems={[button]} />
      )}
      <EuiPageTemplate.EmptyPrompt
        title={<span>No spice</span>}
        footer={header ? undefined : button}
      >
        {emptyPrompt}
      </EuiPageTemplate.EmptyPrompt>
    </EuiPageTemplate>
  );
};
