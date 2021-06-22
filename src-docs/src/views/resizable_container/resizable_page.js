import React, { useState } from 'react';

import {
  EuiPageHeader,
  EuiPageSideBar,
  EuiResizableContainer,
  EuiPageContent,
  EuiPage,
  EuiPageContentBody,
  EuiPageBody,
  EuiSpacer,
  EuiImage,
} from '../../../../src/components';

import contentCenterSvg from '../../images/content_center.svg';
import contentSvg from '../../images/content.svg';
import sideNavSvg from '../../images/side_nav.svg';

export default () => {
  const [selectedTabId, setSelectedTabId] = useState('tab1');

  const onSelectedTabChanged = (id) => {
    setSelectedTabId(id);
  };

  const tabs = [
    {
      label: 'Tab 1',
      id: 'tab1',
      onClick: () => onSelectedTabChanged('tab1'),
      isSelected: 'tab1' === selectedTabId,
    },
    {
      label: 'Tab 2',
      id: 'tab2',
      onClick: () => onSelectedTabChanged('tab2'),
      isSelected: 'tab2' === selectedTabId,
    },
  ];

  const centeredContent = selectedTabId === 'tab2';
  const content = (
    <>
      <EuiImage
        size="fullWidth"
        alt="Fake paragraph"
        url={centeredContent ? contentCenterSvg : contentSvg}
      />
      {!centeredContent && (
        <>
          <EuiSpacer />
          <EuiImage
            size="fullWidth"
            alt="centeredContent paragraph"
            url={centeredContent ? contentCenterSvg : contentSvg}
          />
        </>
      )}
    </>
  );

  return (
    <EuiResizableContainer scrollable={false} style={{ flexGrow: 1 }}>
      {(EuiResizablePanel, EuiResizableButton) => (
        <EuiPage paddingSize="none">
          <EuiResizablePanel
            mode={[
              'collapsible',
              {
                position: 'top',
              },
            ]}
            scrollable={false} // Don't scroll because of sticky positioning
            initialSize={'240px'}
            minSize={'60px'}
            maxSize={50}
            paddingSize="none">
            <EuiPageSideBar paddingSize="l" sticky style={{ minWidth: 0 }}>
              <EuiImage
                size={'original'}
                alt="Fake side nav list"
                url={sideNavSvg}
              />
            </EuiPageSideBar>
          </EuiResizablePanel>

          <EuiResizableButton className="kbnPage__resizer" />

          <EuiResizablePanel
            color="plain"
            hasShadow
            mode="main"
            initialSize="grow"
            minSize="600px"
            style={{ display: 'flex', flexDirection: 'column' }}
            paddingSize="none">
            <EuiPageBody panelled hasShadow={false}>
              <EuiPageHeader
                restrictWidth
                iconType="logoElastic"
                pageTitle="Page title"
                rightSideItems={['button']}
                bottomBorder
                tabs={tabs}
              />
              <EuiPageContent
                hasBorder={false}
                hasShadow={false}
                borderRadius="m"
                paddingSize={centeredContent ? 'l' : 'none'}
                color={centeredContent ? 'subdued' : 'transparent'}
                verticalPosition={centeredContent ? 'center' : undefined}
                horizontalPosition={centeredContent ? 'center' : undefined}>
                <EuiPageContentBody restrictWidth>{content}</EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiResizablePanel>
        </EuiPage>
      )}
    </EuiResizableContainer>
  );
};
