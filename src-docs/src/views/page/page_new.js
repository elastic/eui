import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiSpacer,
  EuiResizableContainer,
  EuiPageBody,
  EuiBottomBar,
} from '../../../../src/components';

export default ({ button = <></>, content, sideNav }) => (
  <EuiResizableContainer style={{ flexGrow: 1 }}>
    {(EuiResizablePanel, EuiResizableButton) => (
      <EuiPage paddingSize="none">
        <EuiResizablePanel
          mode={[
            'collapsible',
            {
              position: 'top',
            },
          ]}
          scrollable={false}
          initialSize={17}
          // TODO: Fix: miSize isn't respected on page load
          minSize={'240px'}
          // TODO: Allow for maxSize
          // Also TODO: Allow all Size follows take a percentage or string value
          maxSize="300px"
          paddingSize="none">
          <EuiPageSideBar style={{ minWidth: 0 }} sticky>
            {sideNav}
          </EuiPageSideBar>
        </EuiResizablePanel>

        <EuiResizableButton className="kbnPage__resizer" />

        <EuiResizablePanel
          scrollable={false}
          mode="main"
          initialSize={83}
          minSize="600px"
          color="plain"
          paddingSize="none"
          hasShadow>
          <EuiPageBody paddingSize="l">
            <EuiPageHeader
              restrictWidth
              iconType="logoElastic"
              pageTitle="Page title"
              rightSideItems={[button]}
              bottomBorder={true}
              tabs={[{ label: 'Tab 1', isSelected: true }, { label: 'Tab 2' }]}
            />
            <EuiSpacer size="l" />
            <EuiPageContent
              hasBorder={false}
              hasShadow={false}
              paddingSize="none"
              color="transparent"
              borderRadius="none">
              <EuiPageContentBody restrictWidth>{content}</EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
          <EuiBottomBar paddingSize="l" position="sticky">
            {/* Wrapping the contents with EuiPageContentBody allows us to match the restrictWidth to keep the contents aligned */}
            <EuiPageContentBody paddingSize={'none'} restrictWidth>
              {'EuiBottomBar'}
            </EuiPageContentBody>
          </EuiBottomBar>
        </EuiResizablePanel>
      </EuiPage>
    )}
  </EuiResizableContainer>
);
