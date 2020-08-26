import React, { useState } from 'react';
import {
  EuiText,
  EuiResizableContainer,
  EuiListGroup,
  EuiListGroupItem,
  EuiPanel,
  EuiTitle,
  EuiSpacer,
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

  return (
    <EuiResizableContainer style={{ minHeight: '320px' }}>
      {(EuiResizablePanel, EuiResizableButton) => (
        <>
          <EuiResizablePanel
            toggling={{
              notCollapsedIcon: 'menuRight',
              collapsedIcon: 'menuLeft',
            }}
            initialSize={20}
            minSize="10%">
            <EuiListGroup flush={true}>
              <EuiListGroupItem
                onClick={() => setItemSelected(items[0])}
                label={items[0].label}
              />

              <EuiListGroupItem
                onClick={() => setItemSelected(items[1])}
                label={items[1].label}
              />

              <EuiListGroupItem
                onClick={() => setItemSelected(items[2])}
                label={items[2].label}
              />

              <EuiListGroupItem
                onClick={() => setItemSelected(items[3])}
                label={items[3].label}
              />
            </EuiListGroup>
          </EuiResizablePanel>

          <EuiResizableButton />

          <EuiResizablePanel initialSize={80} minSize="200px">
            <EuiPanel paddingSize="l" style={{ height: '280px' }}>
              <EuiTitle>
                <p>{itemSelected.label}</p>
              </EuiTitle>
              <EuiSpacer />
              <EuiText>{itemSelected.text}</EuiText>
            </EuiPanel>
          </EuiResizablePanel>
        </>
      )}
    </EuiResizableContainer>
  );
};
