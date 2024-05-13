import React, { useState } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexItem,
  EuiFlexGroup,
  EuiMutationObserver,
  EuiPanel,
  EuiSpacer,
} from '../../../../src/components';

export const MutationObserver = () => {
  const [lastMutation, setLastMutation] = useState('no changes detected');
  const [buttonColor, setButtonColor] = useState('primary');
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const toggleButtonColor = () => {
    setButtonColor(buttonColor === 'primary' ? 'warning' : 'primary');
  };

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  const onMutation = ([{ type }]) => {
    setLastMutation(
      type === 'attributes' ? 'button class name changed' : 'DOM tree changed'
    );
  };

  return (
    <div>
      <p>{lastMutation}</p>

      <EuiSpacer />

      <EuiMutationObserver
        observerOptions={{ subtree: true, attributes: true, childList: true }}
        onMutation={onMutation}
      >
        {(mutationRef) => (
          <div ref={mutationRef}>
            <EuiButton
              color={buttonColor}
              fill={true}
              onClick={toggleButtonColor}
            >
              Toggle button color
            </EuiButton>

            <EuiSpacer />

            <EuiFlexGroup>
              <EuiFlexItem grow={false}>
                <EuiPanel grow={false}>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <EuiSpacer size="s" />
                  <EuiButtonEmpty onClick={addItem}>add item</EuiButtonEmpty>
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        )}
      </EuiMutationObserver>
    </div>
  );
};
