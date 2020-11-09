import React, { useRef, useState } from 'react';
import {
  EuiResizableContainer,
  EuiPanel,
  EuiTitle,
  EuiSpacer,
  EuiButtonGroup,
  EuiButtonIcon,
  EuiFlexGroup,
} from '../../../../src/components';

const toggleButtons = [
  {
    id: '1',
    label: 'Toggle Panel 1',
  },
  {
    id: '2',
    label: 'Toggle Panel 2',
  },
  {
    id: '3',
    label: 'Toggle Panel 3',
  },
];

export default () => {
  const collapseFn = useRef(() => {});

  const [toggleIdToSelectedMap, setToggleIdToSelectedMap] = useState({});

  const onChange = (optionId) => {
    const newToggleIdToSelectedMap = {
      ...toggleIdToSelectedMap,
      ...{
        [optionId]: !toggleIdToSelectedMap[optionId],
      },
    };
    setToggleIdToSelectedMap(newToggleIdToSelectedMap);
    collapseFn.current(`panel${optionId}`, optionId === '3' ? 'right' : 'left');
  };

  return (
    <>
      <div>
        <EuiButtonGroup
          legend="Collapsible panels"
          options={toggleButtons}
          idToSelectedMap={toggleIdToSelectedMap}
          onChange={onChange}
          color="primary"
          type="multi"
        />
      </div>
      <EuiSpacer />
      <EuiResizableContainer style={{ height: '600px' }}>
        {(EuiResizablePanel, EuiResizableButton, { togglePanel }) => {
          collapseFn.current = (id, direction = 'left') =>
            togglePanel(id, { direction });
          return (
            <>
              <EuiResizablePanel id="panel1" initialSize={30} minSize="10%">
                <EuiPanel paddingSize="l" style={{ height: '100%' }}>
                  <EuiTitle>
                    <p>Panel 1</p>
                  </EuiTitle>
                </EuiPanel>
              </EuiResizablePanel>

              <EuiResizableButton />

              <EuiResizablePanel id="panel2" initialSize={35} minSize="50px">
                <EuiPanel paddingSize="l" style={{ height: '100%' }}>
                  <EuiTitle>
                    <p>Panel 2</p>
                  </EuiTitle>
                </EuiPanel>
              </EuiResizablePanel>

              <EuiResizableButton />

              <EuiResizablePanel
                id="panel3"
                initialSize={35}
                minSize="10%"
                collapsedButton={
                  <EuiButtonIcon
                    color="text"
                    aria-label={'Toggle panel 3'}
                    iconType="menuLeft"
                    onClick={() => onChange(3)}
                  />
                }>
                <EuiPanel paddingSize="l" style={{ height: '100%' }}>
                  <EuiFlexGroup justifyContent="spaceBetween">
                    <EuiTitle>
                      <p>Panel 3</p>
                    </EuiTitle>
                    <EuiButtonIcon
                      color="text"
                      aria-label={'Toggle panel 3'}
                      iconType="menuRight"
                      onClick={() => onChange(3)}
                    />
                  </EuiFlexGroup>
                </EuiPanel>
              </EuiResizablePanel>
            </>
          );
        }}
      </EuiResizableContainer>
    </>
  );
};
