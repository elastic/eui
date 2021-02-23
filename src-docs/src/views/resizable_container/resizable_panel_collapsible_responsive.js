import React, { useState } from 'react';
import {
  EuiText,
  EuiResizableContainer,
  EuiListGroup,
  EuiListGroupItem,
  EuiPanel,
  EuiTitle,
  EuiSpacer,
  EuiPage,
} from '../../../../src/components';
import { useIsWithinBreakpoints } from '../../../../src/services';
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
      active: true,
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

  const isMobile = useIsWithinBreakpoints(['xs', 's']);
  const style = isMobile ? { height: '100%' } : { minHeight: '100%' };

  return (
    <EuiPage paddingSize="none">
      <EuiResizableContainer
        direction={isMobile ? 'vertical' : 'horizontal'}
        style={{ height: '400px' }}>
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
              <EuiPanel paddingSize="l" style={style}>
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
    </EuiPage>
  );
};
