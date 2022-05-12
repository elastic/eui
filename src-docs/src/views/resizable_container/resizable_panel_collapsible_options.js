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
import { fake } from 'faker';

const texts = [];

for (let i = 0; i < 4; i++) {
  texts.push(<p>{fake('{{lorem.paragraph}}')}</p>);
}

export default () => {
  const items = [
    {
      id: 1,
      label: 'First item',
      text: texts[0],
    },
    {
      id: 2,
      label: 'Second item',
      text: texts[1],
    },
    {
      id: 3,
      label: 'Third item',
      text: texts[2],
    },
    {
      id: 4,
      label: 'Forth item',
      text: texts[3],
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

            <EuiResizableButton />

            <EuiResizablePanel mode="main" initialSize={60} minSize="20%">
              <EuiPanel paddingSize="l" style={{ minHeight: '100%' }}>
                <EuiTitle>
                  <p>{itemSelected.label}</p>
                </EuiTitle>
                <EuiSpacer />
                <EuiText>{itemSelected.text}</EuiText>
              </EuiPanel>
            </EuiResizablePanel>

            <EuiResizableButton />

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
