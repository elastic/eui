/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiIcon } from '../icon';

import { EuiTreeView } from './tree_view';
import type { EuiTreeViewItemProps } from './tree_view_item';

const meta: Meta<EuiTreeViewItemProps> = {
  title: 'EuiTreeView.Item',
  component: EuiTreeView.Item,
  args: {
    // Component defaults
    display: 'default',
    hasArrow: false,
    isActive: false,
    isExpanded: false,
  },
};

export default meta;
type Story = StoryObj<EuiTreeViewItemProps>;

export const Playground: Story = {
  args: {
    id: 'id',
    label: 'Hello world',
    icon: <EuiIcon type="folderOpen" />,
    children: '',
  },
};
