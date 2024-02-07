/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiFlexItem } from './flex_item';
import { EuiFlexGroup, EuiFlexGroupProps } from './flex_group';

const meta: Meta<EuiFlexGroupProps> = {
  title: 'EuiFlexGroup',
  component: EuiFlexGroup,
  argTypes: {
    justifyContent: { control: 'radio' },
  },
  args: {
    // Component defaults
    alignItems: 'stretch',
    justifyContent: 'flexStart',
    gutterSize: 'l',
    direction: 'row',
    component: 'div',
    responsive: true,
    wrap: false,
  },
};

export default meta;
type Story = StoryObj<EuiFlexGroupProps>;

const flexItem = (
  <EuiFlexItem
    css={{
      backgroundColor: 'rgba(0, 119, 204, 0.1)',
      ':first-child': { minHeight: '5em' },
    }}
  >
    Flex item
  </EuiFlexItem>
);

export const Playground: Story = {
  args: {
    children: [flexItem, flexItem, flexItem],
  },
};
