import React, { ReactElement } from 'react';
import { _EuiPageSidebarProps } from '../../../../src/components/page_template/sidebar';

import {
  EuiText,
  EuiPageTemplate,
  EuiPageTemplateProps,
  EuiPageHeaderProps,
  EuiSpacer,
} from '../../../../src';

export default ({
  button = <></>,
  content = <></>,
  sidebar,
  emptyPrompt,
  header,
  panelled,
  restrictWidth,
  bottomBar,
  bottomBorder,
  sidebarSticky,
  grow,
}: {
  button: ReactElement;
  content: ReactElement;
  sidebar?: ReactElement;
  emptyPrompt?: ReactElement;
  bottomBar?: ReactElement;
  header?: EuiPageHeaderProps;
  panelled?: EuiPageTemplateProps['panelled'];
  restrictWidth?: EuiPageTemplateProps['restrictWidth'];
  bottomBorder?: EuiPageTemplateProps['bottomBorder'];
  sidebarSticky?: _EuiPageSidebarProps['sticky'];
  grow?: EuiPageTemplateProps['grow'];
}) => {
  return (
    <EuiPageTemplate.Outer
      panelled={panelled}
      restrictWidth={restrictWidth}
      bottomBorder={bottomBorder}
      grow={grow}
    >
      {sidebar && (
        <EuiPageTemplate.Sidebar sticky={sidebarSticky}>
          {sidebar}
        </EuiPageTemplate.Sidebar>
      )}
      <EuiPageTemplate.Section color="subdued" bottomBorder="extended">
        <EuiText textAlign="center">
          <strong>
            Stack EuiPageTemplate sections and headers to create your custom
            content order.
          </strong>
        </EuiText>
      </EuiPageTemplate.Section>
      {header && (
        <EuiPageTemplate.Header {...header} rightSideItems={[button]} />
      )}
      <>
        <div>WRENCH</div>
        <div>WRENCH</div>
      </>
      <EuiSpacer />
      <div>WRENCH</div>
      {emptyPrompt ? (
        <EuiPageTemplate.EmptyPrompt
          title={<span>No spice</span>}
          footer={header ? undefined : button}
        >
          {emptyPrompt}
        </EuiPageTemplate.EmptyPrompt>
      ) : (
        <EuiPageTemplate.Section>{content}</EuiPageTemplate.Section>
      )}
      {bottomBar && (
        <EuiPageTemplate.BottomBar>{bottomBar}</EuiPageTemplate.BottomBar>
      )}
    </EuiPageTemplate.Outer>
  );
};
