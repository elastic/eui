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
import { EuiToken } from '../token';

import { EuiTreeView, EuiTreeViewProps } from './tree_view';

const meta: Meta<EuiTreeViewProps> = {
  title: 'Navigation/EuiTreeView/EuiTreeView',
  component: EuiTreeView,
  argTypes: {
    'aria-label': {
      type: {
        name: 'string',
        required: true,
      },
      description:
        'Passing either an `aria-label` or an `aria-labelledby` is required for accessibility.',
    },
    'aria-labelledby': {
      type: { name: 'string', required: true },
      description:
        'Passing either an `aria-label` or an `aria-labelledby` is required for accessibility.',
    },
  },
  args: {
    // Component defaults
    display: 'default',
    expandByDefault: false,
    showExpansionArrows: false,
  },
};

export default meta;
type Story = StoryObj<EuiTreeViewProps>;

export const Playground: Story = {
  args: {
    'aria-label': 'Directory of items',
    items: [
      {
        label: 'Item One',
        id: 'item_one',
        icon: <EuiIcon type="folderClosed" />,
        iconWhenExpanded: <EuiIcon type="folderOpen" />,
        isExpanded: true,
        children: [
          {
            label: 'Item A',
            id: 'item_a',
            icon: <EuiIcon type="document" />,
          },
          {
            label: 'Item B',
            id: 'item_b',
            useEmptyIcon: true,
            children: [
              {
                label: 'A Cloud',
                id: 'item_cloud',
                icon: <EuiToken iconType="tokenConstant" />,
              },
              {
                label: "I'm a Bug",
                id: 'item_bug',
                icon: <EuiToken iconType="tokenEnum" />,
                css: ({ euiTheme }) => `color: ${euiTheme.colors.textDanger}`,
              },
            ],
          },
          {
            label: 'Item C',
            id: 'item_c',
            children: [
              {
                label: 'Another Cloud',
                id: 'item_cloud2',
                icon: <EuiToken iconType="tokenConstant" />,
              },
              {
                label:
                  'This one is a really long string that we will check truncates correctly',
                id: 'item_bug2',
                useEmptyIcon: true,
                callback: () => '',
              },
            ],
          },
        ],
      },
      {
        label: 'Item Two',
        id: 'item_two',
      },
    ],
  },
};
