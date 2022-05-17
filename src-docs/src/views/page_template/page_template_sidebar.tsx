import React, { ReactElement } from 'react';
import { _EuiPageSidebarProps } from '../../../../src/components/page_template/sidebar';

import {
  EuiText,
  EuiPageTemplate,
  EuiPageTemplateProps,
  EuiPageHeaderProps,
} from '../../../../src';

export default ({
  button = <></>,
  content = <></>,
  sidebar,
  header,
  panelled,
  bottomBorder = true,
  sidebarSticky,
  grow,
}: {
  button: ReactElement;
  content: ReactElement;
  sidebar?: ReactElement;
  header?: EuiPageHeaderProps;
  panelled?: EuiPageTemplateProps['panelled'];
  bottomBorder?: EuiPageTemplateProps['bottomBorder'];
  // For fullscreen only
  sidebarSticky?: _EuiPageSidebarProps['sticky'];
  grow?: EuiPageTemplateProps['grow'];
}) => {
  return (
    <EuiPageTemplate
      panelled={panelled}
      bottomBorder={bottomBorder}
      grow={grow}
    >
      {sidebar && (
        <EuiPageTemplate.Sidebar sticky={sidebarSticky}>
          {sidebar}
        </EuiPageTemplate.Sidebar>
      )}
      {header && (
        <EuiPageTemplate.Header {...header} rightSideItems={[button]} />
      )}
      <EuiPageTemplate.Section bottomBorder={bottomBorder}>
        <EuiText textAlign="center">
          <strong>
            Stack EuiPageTemplate sections and headers to create your custom
            content order.
          </strong>
        </EuiText>
      </EuiPageTemplate.Section>
      <EuiPageTemplate.Section>{content}</EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};
