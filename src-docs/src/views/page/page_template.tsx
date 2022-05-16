import React, { ReactElement } from 'react';
import { _EuiPageSidebarProps } from '../../../../src/components/page_template/sidebar';

import {
  EuiText,
  EuiPageT,
  EuiPageTemplateProps,
  EuiPageHeaderProps,
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
    <EuiPageT.Outer
      panelled={panelled}
      restrictWidth={restrictWidth}
      bottomBorder={bottomBorder}
      grow={grow}
    >
      {sidebar && (
        <EuiPageT.Sidebar sticky={sidebarSticky}>{sidebar}</EuiPageT.Sidebar>
      )}
      <EuiPageT.Section color="subdued" bottomBorder="extended">
        <EuiText textAlign="center">
          <strong>
            Stack EuiPageT sections and headers to create your custom content
            order.
          </strong>
        </EuiText>
      </EuiPageT.Section>
      {header && <EuiPageT.Header {...header} rightSideItems={[button]} />}
      {/* <div>WRENCH</div>
      <div>WRENCH</div>
      <div>WRENCH</div> */}
      {emptyPrompt ? (
        <EuiPageT.EmptyPrompt
          title={<span>No spice</span>}
          footer={header ? undefined : button}
        >
          {emptyPrompt}
        </EuiPageT.EmptyPrompt>
      ) : (
        <EuiPageT.Section>{content}</EuiPageT.Section>
      )}
      {bottomBar && <EuiPageT.BottomBar>{bottomBar}</EuiPageT.BottomBar>}
    </EuiPageT.Outer>
  );
};
