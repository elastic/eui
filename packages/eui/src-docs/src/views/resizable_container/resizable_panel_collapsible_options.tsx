import React, { useState } from 'react';
import {
  EuiResizableContainer,
  EuiListGroup,
  EuiListGroupItem,
  EuiPanel,
  EuiTitle,
  EuiSpacer,
  EuiText,
  EuiPage,
} from '../../../../src/components';
import { faker } from '@faker-js/faker';

export default () => {
  const items = [
    {
      id: 1,
      label: 'First item',
      text: <p>{faker.lorem.paragraphs()}</p>,
    },
    {
      id: 2,
      label: 'Second item',
      text: <p>{faker.lorem.paragraphs()}</p>,
    },
    {
      id: 3,
      label: 'Third item',
      text: <p>{faker.lorem.paragraphs()}</p>,
    },
    {
      id: 4,
      label: 'Forth item',
      text: <p>{faker.lorem.paragraphs()}</p>,
    },
  ];

  const [itemSelected, setItemSelected] = useState(items[0]);
  const itemElements = items.map((item, index) => (
    <EuiListGroupItem
      key={index}
      onClick={() => setItemSelected(item)}
      label={item.label}
      size="s"
    />
  ));
  return (
    <EuiPage paddingSize="none">
      <EuiResizableContainer style={{ height: '320px' }}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              mode={[
                'collapsible',
                {
                  className: 'panel-toggle',
                  'data-test-subj': 'panel-1-toggle',
                  position: 'top',
                },
              ]}
              initialSize={20}
              minSize="10%"
            >
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>

            <EuiResizableButton alignIndicator="start" />

            <EuiResizablePanel
              mode="main"
              initialSize={60}
              minSize="20%"
              tabIndex={0}
            >
              <EuiPanel paddingSize="l" style={{ minHeight: '100%' }}>
                <EuiTitle>
                  <p>{itemSelected.label}</p>
                </EuiTitle>
                <EuiSpacer />
                <EuiText>{itemSelected.text}</EuiText>
              </EuiPanel>
            </EuiResizablePanel>

            <EuiResizableButton alignIndicator="end" />

            <EuiResizablePanel
              mode={[
                'collapsible',
                {
                  className: 'panel-toggle',
                  'data-test-subj': 'panel-3-toggle',
                  position: 'bottom',
                },
              ]}
              initialSize={20}
              minSize="10%"
            >
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    </EuiPage>
  );
};
