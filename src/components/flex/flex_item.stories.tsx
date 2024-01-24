/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiFlexGroup } from './flex_group';
import { EuiFlexItem, EuiFlexItemProps } from './flex_item';

const meta: Meta<EuiFlexItemProps> = {
  title: 'EuiFlexItem',
  component: EuiFlexItem,
  argTypes: {
    grow: {
      options: [false, true, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, null],
      control: 'select',
    },
    component: { control: 'text' },
  },
  args: {
    // Component defaults
    grow: true,
    component: 'div',
  },
};

export default meta;
type Story = StoryObj<EuiFlexItemProps>;

export const Playground: Story = {
  args: {
    children: 'Flex item',
  },
  render: ({ ...args }) => (
    <EuiFlexGroup responsive={false}>
      <EuiFlexItem
        css={{ backgroundColor: 'rgba(0, 119, 204, 0.1)' }}
        {...args}
      />
    </EuiFlexGroup>
  ),
};
