import React, { useState } from 'react';
import {
  EuiText,
  EuiResizableContainer,
  EuiListGroup,
  EuiListGroupItem,
  EuiPanel,
} from '../../../../src/components';
import { fake } from 'faker';

const text = (
  <>
    <p>{fake('{{lorem.paragraphs}}')}</p>
  </>
);

const texts = [];

for (let i = 0; i < 4; i++) {
  texts.push(<p>{fake('{{lorem.paragraphs}}')}</p>);
}

console.log(texts);

export default () => {
  // const handleOnClick = () => {
  //   alert('Item was clicked');
  // };

  const [item, setItem] = useState('First');

  return (
    <EuiResizableContainer style={{ height: '320px' }}>
      {(EuiResizablePanel, EuiResizableButton) => (
        <>
          <EuiResizablePanel
            toggling={{
              // active: true,
              notCollapsedIcon: 'menuRight',
              collapsedIcon: 'menuLeft',
            }}
            initialSize={20}
            minSize="10%">
            <EuiListGroup flush={true}>
              <EuiListGroupItem
                isActive
                onClick={() => setItem('First')}
                label="First item"
              />

              <EuiListGroupItem
                onClick={() => setItem('Second')}
                label="Second item"
              />

              <EuiListGroupItem
                onClick={() => setItem('Third')}
                label="Third item"
              />

              <EuiListGroupItem
                onClick={() => setItem('Fourth')}
                label="Fourth item"
              />
            </EuiListGroup>
          </EuiResizablePanel>

          <EuiResizableButton />

          <EuiResizablePanel initialSize={80} minSize="200px">
            <EuiPanel paddingSize="l" style={{ height: '280px' }}>
              <EuiText>
                <p>{item} item</p>
              </EuiText>
              <EuiText>{text}</EuiText>
            </EuiPanel>
          </EuiResizablePanel>
        </>
      )}
    </EuiResizableContainer>
  );
};
