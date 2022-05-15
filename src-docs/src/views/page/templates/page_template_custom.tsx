import React, { ReactElement } from 'react';

import {
  EuiText,
  EuiPageT,
  EuiPageTemplateProps,
  EuiPageHeaderProps,
  EuiEmptyPrompt,
} from '../../../../../src';

export default ({
  content = <></>,
  sidebar,
  emptyPrompt = true,
  header,
  panelled,
  restrictWidth,
  bottomBar,
  bottomBorder,
}: {
  content: ReactElement;
  sidebar?: ReactElement;
  emptyPrompt?: boolean;
  bottomBar?: ReactElement;
  header?: EuiPageHeaderProps;
  panelled?: EuiPageTemplateProps['panelled'];
  restrictWidth?: EuiPageTemplateProps['restrictWidth'];
  bottomBorder?: EuiPageTemplateProps['bottomBorder'];
}) => {
  return (
    <EuiPageT.Outer
      panelled={panelled}
      restrictWidth={restrictWidth}
      bottomBorder={bottomBorder}
    >
      {sidebar && <EuiPageT.Sidebar>{sidebar}</EuiPageT.Sidebar>}
      <EuiPageT.Section color="subdued" bottomBorder="extended">
        <EuiText textAlign="center">
          <strong>
            Stack EuiPageT sections and headers to create your custom content
            order.
          </strong>
        </EuiText>
      </EuiPageT.Section>
      {header && <EuiPageT.Header {...header} />}
      {/* <div>WRENCH</div>
      <div>WRENCH</div>
      <div>WRENCH</div> */}
      {emptyPrompt ? (
        <EuiPageT.Section
          color={header ? 'plain' : 'transparent'}
          alignment={'center'}
        >
          <EuiEmptyPrompt
            title={<span>No spice</span>}
            body={content}
            color={header || sidebar ? 'subdued' : 'plain'}
          />
        </EuiPageT.Section>
      ) : (
        <EuiPageT.Section>{content}</EuiPageT.Section>
      )}
      {bottomBar && <EuiPageT.BottomBar>{bottomBar}</EuiPageT.BottomBar>}
    </EuiPageT.Outer>
  );
};
