/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EuiTable } from '../index';
import { EuiTableHeaderMobile } from './table_header_mobile';
import {
  EuiTableSortMobile,
  EuiTableSortMobileProps,
} from './table_sort_mobile';

const meta: Meta<EuiTableSortMobileProps> = {
  title: 'Tabular Content/EuiTable/Mobile subcomponents/EuiTableSortMobile',
  component: EuiTableSortMobile,
  decorators: [
    (Story, { args }) => (
      <EuiTable>
        <EuiTableHeaderMobile responsiveBreakpoint={true}>
          <Story {...args} />
        </EuiTableHeaderMobile>
      </EuiTable>
    ),
  ],
  args: {
    anchorPosition: 'downRight',
  },
};

export default meta;
type Story = StoryObj<EuiTableSortMobileProps>;

export const Playground: Story = {
  args: {
    items: [
      {
        name: 'sort item 1',
        onSort: () => action('onSort')('sort item 1'),
        isSorted: true,
        isSortAscending: true,
      },
      {
        name: 'sort item 2',
        onSort: () => action('onSort')('sort item 2'),
        isSorted: false,
        isSortAscending: false,
      },
    ],
  },
};
