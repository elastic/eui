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
import { EuiButton } from '../button';
import { EuiSearchBar, EuiSearchBarProps } from './search_bar';

const tags = [
  { name: 'marketing', color: 'danger' },
  { name: 'finance', color: 'success' },
  { name: 'eng', color: 'success' },
  { name: 'sales', color: 'warning' },
  { name: 'ga', color: 'success' },
];

const meta: Meta<EuiSearchBarProps> = {
  title: 'Forms/EuiSearchBar/EuiSearchBar',
  component: EuiSearchBar,
  argTypes: {
    toolsLeft: {
      control: 'boolean',
      description: 'Toogle the control to display an example for left tools',
      mapping: {
        true: <EuiButton>Left tools button</EuiButton>,
        false: undefined,
      },
    },
    toolsRight: {
      control: 'boolean',
      description: 'Toogle the control to display an example for right tools',
      mapping: {
        true: <EuiButton>Right tools button</EuiButton>,
        false: undefined,
      },
    },
  },
};
enableFunctionToggleControls(meta, ['onChange']);

export default meta;
type Story = StoryObj<EuiSearchBarProps>;

export const Playground: Story = {
  args: {
    // setting up props for easier testing/QA
    dateFormat: {},
    defaultQuery: '',
    query: '',
    box: {
      placeholder: 'Enter a search term or query...',
      incremental: false,
      schema: {
        strict: true,
        fields: {
          type: {
            type: 'string',
          },
          active: {
            type: 'boolean',
          },
          status: {
            type: 'string',
          },
          followers: {
            type: 'number',
          },
          comments: {
            type: 'number',
          },
          stars: {
            type: 'number',
          },
          owner: {
            type: 'string',
          },
          tag: {
            type: 'string',
            validate: (value: string) => {
              if (value !== '' && !tags.some((tag) => tag.name === value)) {
                throw new Error(
                  `unknown tag (possible values: ${tags
                    .map((tag) => tag.name)
                    .join(',')})`
                );
              }
            },
          },
        },
      },
    },
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
                  view: tag.name,
                }))
              );
            }, 2000);
          }),
        autoSortOptions: true,
      },
    ],
    // casting to any to allow for easier teasting/QA via toggle switch
    toolsLeft: false as any,
    toolsRight: false as any,
  },
};
