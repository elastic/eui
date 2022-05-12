import React, { useRef, useState } from 'react';
import {
  EuiResizableContainer,
  EuiPanel,
  EuiTitle,
  EuiSpacer,
  EuiButtonGroup,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
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
];

export default () => {
  const collapseFn = useRef(() => {});

  const [toggleIdToSelectedMap, setToggleIdToSelectedMap] = useState({});

  const onCollapse = (optionId) => {
    const newToggleIdToSelectedMap = {
      ...toggleIdToSelectedMap,
      [optionId]: !toggleIdToSelectedMap[optionId],
    };
    setToggleIdToSelectedMap(newToggleIdToSelectedMap);
  };

  const onChange = (optionId) => {
    onCollapse(optionId);
    collapseFn.current(`panel${optionId}`, optionId === '3' ? 'right' : 'left');
  };

  return (
    <>
      <div className="eui-textCenter">
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
      <EuiResizableContainer
        onToggleCollapsed={onCollapse}
        style={{ height: '250px' }}
      >
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
                mode={['custom', { position: 'top' }]}
                id="panel3"
                initialSize={35}
                minSize="10%"
              >
                <EuiPanel paddingSize="l" style={{ height: '100%' }}>
                  <EuiFlexGroup
                    justifyContent="spaceBetween"
                    alignItems="center"
                  >
                    <EuiFlexItem>
                      <EuiTitle>
                        <p>Panel 3</p>
                      </EuiTitle>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <EuiButtonIcon
                        color="text"
                        aria-label={'Toggle panel 3'}
                        iconType="menuRight"
                        onClick={() => onChange(3)}
                      />
                    </EuiFlexItem>
                  </EuiFlexGroup>
                  <EuiSpacer />
                  <EuiText size="s">
                    <p>
                      This panel provides its own button for triggering
                      collapsibility but relies on the default collapsed button
                      to uncollapse.
                    </p>
                  </EuiText>
                </EuiPanel>
              </EuiResizablePanel>
            </>
          );
        }}
      </EuiResizableContainer>
    </>
  );
};
