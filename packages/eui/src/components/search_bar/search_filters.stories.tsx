/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { EuiHealth } from '../health';
import {
  EuiSearchBarFilters,
  EuiSearchBarFiltersProps,
} from './search_filters';
import { Query } from './query';

const tags = [
  { name: 'marketing', color: 'danger' },
  { name: 'finance', color: 'success' },
  { name: 'eng', color: 'success' },
  { name: 'sales', color: 'warning' },
  { name: 'ga', color: 'success' },
];

const meta: Meta<EuiSearchBarFiltersProps> = {
  title: 'Forms/EuiSearchBar/EuiSearchBarFilters',
  component: EuiSearchBarFilters,
};
enableFunctionToggleControls(meta, ['onChange']);

export default meta;
type Story = StoryObj<EuiSearchBarFiltersProps>;

export const Playground: Story = {
  args: {
    filters: [
      {
        type: 'field_value_toggle_group',
        field: 'status',
        items: [
          {
            value: 'open',
            name: 'Open',
          },
          {
            value: 'closed',
            name: 'Closed',
          },
        ],
      },
      {
        type: 'is',
        field: 'active',
        name: 'Active',
        negatedName: 'Inactive',
      },
      {
        type: 'field_value_toggle',
        name: 'Mine',
        field: 'owner',
        value: 'dewey',
      },
      {
        type: 'field_value_toggle',
        name: 'Popular',
        field: 'followers',
        value: 5,
        operator: 'gt',
      },
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        multiSelect: 'or',
        operator: 'exact',
        cache: 10000, // will cache the loaded tags for 10 sec
        options: () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(
                tags.map((tag) => ({
                  value: tag.name,
                  view: <EuiHealth color={tag.color}>{tag.name}</EuiHealth>,
                }))
              );
            }, 2000);
          }),
        autoSortOptions: true,
      },
    ],
    // setting up props for easier testing/QA
    query: Query.parse(''),
  },
};
