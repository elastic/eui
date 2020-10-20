import React, { useState, useRef } from 'react';
import {
  EuiText,
  EuiResizableContainer,
  EuiListGroup,
  EuiListGroupItem,
  EuiPanel,
  EuiTitle,
  EuiSpacer,
  EuiButton,
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
    />
  ));

  const collapseFn = useRef(() => {});

  return (
    <>
      <EuiResizableContainer style={{ minHeight: '320px' }}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel mode="main" initialSize={80} minSize="50px">
              <EuiPanel paddingSize="l" style={{ minHeight: '280px' }}>
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
      <EuiSpacer />
      <EuiResizableContainer style={{ minHeight: '320px' }}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel mode="main" initialSize={80} minSize="50px">
              <EuiPanel paddingSize="l" style={{ minHeight: '280px' }}>
                <EuiTitle>
                  <p>{itemSelected.label}</p>
                </EuiTitle>
                <EuiSpacer />
                <EuiText>{itemSelected.text}</EuiText>
              </EuiPanel>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
      <EuiSpacer />
      <EuiResizableContainer style={{ minHeight: '320px' }}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel mode="main" initialSize={60} minSize="50px">
              <EuiPanel paddingSize="l" style={{ minHeight: '280px' }}>
                <EuiTitle>
                  <p>{itemSelected.label}</p>
                </EuiTitle>
                <EuiSpacer />
                <EuiText>{itemSelected.text}</EuiText>
              </EuiPanel>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
      <EuiSpacer />
      <EuiResizableContainer style={{ minHeight: '320px' }}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel
              mode="collapsible"
              initialSize={30}
              minSize="50px">
              <EuiPanel paddingSize="l" style={{ minHeight: '280px' }}>
                <EuiTitle>
                  <p>{itemSelected.label}</p>
                </EuiTitle>
                <EuiSpacer />
                <EuiText>{itemSelected.text}</EuiText>
              </EuiPanel>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel mode="main" initialSize={30} minSize="50px">
              <EuiPanel paddingSize="l" style={{ minHeight: '280px' }}>
                <EuiTitle>
                  <p>Main panel</p>
                </EuiTitle>
                <EuiTitle>
                  <p>{itemSelected.label}</p>
                </EuiTitle>
                <EuiSpacer />
                <EuiText>{itemSelected.text}</EuiText>
              </EuiPanel>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
      <EuiSpacer />
      <EuiResizableContainer style={{ minHeight: '320px' }}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel mode="main" initialSize={30} minSize="50px">
              <EuiPanel paddingSize="l" style={{ minHeight: '280px' }}>
                <EuiTitle>
                  <p>Main panel</p>
                </EuiTitle>
                <EuiTitle>
                  <p>{itemSelected.label}</p>
                </EuiTitle>
                <EuiSpacer />
                <EuiText>{itemSelected.text}</EuiText>
              </EuiPanel>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel initialSize={30} minSize="50px">
              <EuiPanel paddingSize="l" style={{ minHeight: '280px' }}>
                <EuiTitle>
                  <p>Default panel</p>
                </EuiTitle>
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
      <EuiSpacer />
      <EuiResizableContainer style={{ minHeight: '320px' }}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel initialSize={30} minSize="50px">
              <EuiPanel paddingSize="l" style={{ minHeight: '280px' }}>
                <EuiTitle>
                  <p>Default panel</p>
                </EuiTitle>
                <EuiTitle>
                  <p>{itemSelected.label}</p>
                </EuiTitle>
                <EuiSpacer />
                <EuiText>{itemSelected.text}</EuiText>
              </EuiPanel>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel mode="main" initialSize={30} minSize="50px">
              <EuiPanel paddingSize="l" style={{ minHeight: '280px' }}>
                <EuiTitle>
                  <p>Main panel</p>
                </EuiTitle>
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
      <EuiSpacer />
      <EuiResizableContainer style={{ height: '600px' }}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel mode="main" initialSize={60} minSize="50px">
              <EuiPanel paddingSize="l" style={{ height: '100%' }}>
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
      <EuiSpacer />
      <EuiResizableContainer direction="vertical" style={{ height: '600px' }}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel mode="main" initialSize={80} minSize="50px">
              <EuiPanel paddingSize="l" style={{ height: '100%' }}>
                <EuiTitle>
                  <p>{itemSelected.label}</p>
                </EuiTitle>
                <EuiSpacer />
                <EuiText>{itemSelected.text}</EuiText>
              </EuiPanel>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
      <EuiSpacer />
      <EuiResizableContainer direction="vertical" style={{ height: '600px' }}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel mode="main" initialSize={60} minSize="50px">
              <EuiPanel paddingSize="l" style={{ height: '100%' }}>
                <EuiTitle>
                  <p>{itemSelected.label}</p>
                </EuiTitle>
                <EuiSpacer />
                <EuiText>{itemSelected.text}</EuiText>
              </EuiPanel>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel
              mode="collapsible"
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>{itemElements}</EuiListGroup>
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>

      <EuiSpacer size="xl" />

      <div>
        <EuiButton onClick={() => collapseFn.current('1')}>
          Toggle Panel 1
        </EuiButton>
        <EuiButton onClick={() => collapseFn.current('2')}>
          Toggle Panel 2
        </EuiButton>
        <EuiButton onClick={() => collapseFn.current('3', 'right')}>
          Toggle Panel 3
        </EuiButton>
      </div>
      <EuiSpacer />
      <EuiResizableContainer style={{ height: '600px' }}>
        {(EuiResizablePanel, EuiResizableButton, actions) => {
          collapseFn.current = (id, direction = 'left') =>
            actions.togglePanel(id, { direction });
          return (
            <>
              <EuiResizablePanel id="1" initialSize={30} minSize="10%">
                <EuiPanel paddingSize="l" style={{ height: '100%' }}>
                  <EuiTitle>
                    <p>Panel 1</p>
                  </EuiTitle>
                </EuiPanel>
              </EuiResizablePanel>

              <EuiResizableButton />

              <EuiResizablePanel id="2" initialSize={35} minSize="50px">
                <EuiPanel paddingSize="l" style={{ height: '100%' }}>
                  <EuiTitle>
                    <p>Panel 2</p>
                  </EuiTitle>
                </EuiPanel>
              </EuiResizablePanel>

              <EuiResizableButton />

              <EuiResizablePanel id="3" initialSize={35} minSize="10%">
                <EuiPanel paddingSize="l" style={{ height: '100%' }}>
                  <EuiTitle>
                    <p>Panel 3</p>
                  </EuiTitle>
                </EuiPanel>
              </EuiResizablePanel>
            </>
          );
        }}
      </EuiResizableContainer>
    </>
  );
};
