/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { _EuiButtonColor } from '../../../global_styling/mixins';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiSpacer } from '../../spacer';
import { EuiButton, EuiButtonEmpty } from '../../button';
import { EuiPanel } from '../../panel';
import {
  EuiMutationObserver,
  EuiMutationObserverProps,
} from './mutation_observer';

const meta: Meta<EuiMutationObserverProps> = {
  title: 'Utilities/EuiMutationObserver',
  component: EuiMutationObserver,
  parameters: {
    codeSnippet: {
      // TODO: enable once render functions are supported
      skip: true,
    },
  },
};

export default meta;
type Story = StoryObj<EuiMutationObserverProps>;

const StatefulPlayground = ({
  onMutation,
  ...rest
}: EuiMutationObserverProps) => {
  const [lastMutation, setLastMutation] = useState('no changes detected');
  const [buttonColor, setButtonColor] = useState<_EuiButtonColor>('primary');
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const toggleButtonColor = () => {
    setButtonColor(buttonColor === 'primary' ? 'warning' : 'primary');
  };

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  const handleOnMutation = (
    mutationRecords: MutationRecord[],
    mutationObserver: MutationObserver
  ) => {
    const [{ type }] = mutationRecords;
    setLastMutation(
      type === 'attributes' ? 'button class name changed' : 'DOM tree changed'
    );
    onMutation(mutationRecords, mutationObserver);
  };

  return (
    <>
      <p>{lastMutation}</p>

      <EuiSpacer />

      <EuiMutationObserver
        observerOptions={{ subtree: true, attributes: true, childList: true }}
        onMutation={handleOnMutation}
        {...rest}
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
    </>
  );
};

export const Playground: Story = {
  render: (args) => <StatefulPlayground {...args} />,
};
