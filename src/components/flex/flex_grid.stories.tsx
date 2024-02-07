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
import { EuiFlexGrid, EuiFlexGridProps } from './flex_grid';

const meta: Meta<EuiFlexGridProps> = {
  title: 'EuiFlexGrid',
  component: EuiFlexGrid,
  argTypes: {
    component: { control: 'text' },
  },
  args: {
    // Component defaults
    component: 'div',
    alignItems: 'stretch',
    direction: 'row',
    columns: 1,
    gutterSize: 'l',
    responsive: true,
  },
};

export default meta;
type Story = StoryObj<EuiFlexGridProps>;

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
