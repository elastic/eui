import React, { ReactElement } from 'react';
import { _EuiPageSidebarProps } from '../../../../src/components/page_template/sidebar';

import {
  EuiPageTemplate,
  EuiPageTemplateProps,
  EuiPageHeaderProps,
} from '../../../../src';

export default ({
  button = <></>,
  sidebar,
  emptyPrompt = <></>,
  header,
  panelled,
  sidebarSticky,
  grow,
}: {
  button: ReactElement;
  sidebar?: ReactElement;
  emptyPrompt: ReactElement;
  header?: EuiPageHeaderProps;
  panelled?: EuiPageTemplateProps['panelled'];
  sidebarSticky?: _EuiPageSidebarProps['sticky'];
  grow?: EuiPageTemplateProps['grow'];
}) => {
  return (
    <EuiPageTemplate panelled={panelled} grow={grow}>
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
