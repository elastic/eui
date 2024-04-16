/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { EuiBasicTable } from '../basic_table';
import { EuiButton } from '../button';
import { EuiCallOut } from '../call_out';
import { EuiHealth } from '../health';
import { EuiSpacer } from '../spacer';
import { EuiText } from '../text';
import {
  EuiSearchBarOnChangeArgs,
  EuiSearchBar,
  EuiSearchBarProps,
  QueryType,
} from './search_bar';

faker.seed(42);

const tags = [
  { name: 'marketing', color: 'danger' },
  { name: 'finance', color: 'success' },
  { name: 'eng', color: 'success' },
  { name: 'sales', color: 'warning' },
  { name: 'ga', color: 'success' },
];

const items = [...Array(5).keys()].map((id) => {
  return {
    id,
    status: faker.helpers.arrayElement(['open', 'closed']),
    type: faker.helpers.arrayElement(['dashboard', 'visualization', 'watch']),
    tag: faker.helpers.arrayElements(
      tags.map((tag) => tag.name),
      { min: 0, max: 3 }
    ),
    active: faker.datatype.boolean(),
    owner: faker.helpers.arrayElement(['dewey', 'wanda', 'carrie', 'gabic']),
    followers: faker.number.int({ min: 0, max: 20 }),
    comments: faker.number.int({ min: 0, max: 10 }),
    stars: faker.number.int({ min: 0, max: 5 }),
  };
});

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
    hint: {
      content: '',
      popoverProps: {},
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
                  view: <EuiHealth color={tag.color}>{tag.name}</EuiHealth>,
                }))
              );
            }, 2000);
          }),
      },
    ],
    // casting to any to allow for easier teasting/QA via toggle switch
    toolsLeft: false as any,
    toolsRight: false as any,
  },
  render: (args) => <StatefulSearchBar {...args} />,
};

const StatefulSearchBar = (args: EuiSearchBarProps) => {
  const { query, defaultQuery, box, hint } = args;

  const [_query, setQuery] = useState<QueryType>(
    query ?? defaultQuery ?? EuiSearchBar.Query.MATCH_ALL
  );
  const [error, setError] = useState<EuiSearchBarOnChangeArgs['error']>(null);
  const showHint = !!hint?.content;

  const onChange = ({ query, error }: EuiSearchBarOnChangeArgs) => {
    if (error) {
      setError(error);
    } else {
      setError(null);
      setQuery(query ?? EuiSearchBar.Query.MATCH_ALL);
    }
  };

  const handleOnClear = () => {
    setQuery(EuiSearchBar.Query.MATCH_ALL);
  };

  const renderSearch = () => {
    return (
      <EuiSearchBar
        {...args}
        defaultQuery={defaultQuery}
        box={{
          ...box,
          onClear: handleOnClear,
        }}
        onChange={onChange}
        hint={
          showHint
            ? {
                content: <span>{hint.content}</span>,
                popoverProps: hint.popoverProps ?? {},
              }
            : undefined
        }
      />
    );
  };

  const renderError = () => {
    if (!error) {
      return;
    }
    return (
      <>
        <EuiCallOut
          iconType="faceSad"
          color="danger"
          title={`Invalid search: ${error.message}`}
        />
        <EuiSpacer size="l" />
      </>
    );
  };

  const renderTable = () => {
    const columns = [
      {
        name: 'Type',
        field: 'type',
      },
      {
        name: 'Open',
        field: 'status',
        render: (status: string) => (status === 'open' ? 'Yes' : 'No'),
      },
      {
        name: 'Active',
        field: 'active',
      },
      {
        name: 'Tags',
        field: 'tag',
      },
      {
        name: 'Owner',
        field: 'owner',
      },
      {
        name: 'Stats',
        width: '150px',
        render: (item: (typeof items)[0]) => {
          return (
            <div>
              <div>{`${item.stars} Stars`}</div>
              <div>{`${item.followers} Followers`}</div>
              <div>{`${item.comments} Comments`}</div>
            </div>
          );
        },
      },
    ];

    const queriedItems = EuiSearchBar.Query.execute(_query, items, {
      defaultFields: ['owner', 'tag', 'type'],
    });

    return <EuiBasicTable items={queriedItems} columns={columns} />;
  };
  return (
    renderError() || (
      <>
        {renderSearch()}
        <EuiSpacer />
        <EuiText>
          <h2>Example data output</h2>
        </EuiText>
        <EuiSpacer />
        {renderTable()}
      </>
    )
  );
};
