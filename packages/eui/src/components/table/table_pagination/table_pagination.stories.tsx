/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  enableFunctionToggleControls,
  moveStorybookControlsToCategory,
} from '../../../../.storybook/utils';
import {
  EuiTablePagination,
  EuiTablePaginationProps,
} from './table_pagination';
import { euiTablePaginationDefaults } from './table_pagination_defaults';

const meta: Meta<EuiTablePaginationProps> = {
  title: 'Tabular Content/EuiTable/EuiTablePagination',
  component: EuiTablePagination,
  argTypes: {
    pageCount: {
      type: 'number',
      description:
        'The total number of pages. Pass `0` if total count is unknown.',
    },
    activePage: {
      type: 'number',
      description:
        'The current page using a zero based index. So if you set the activePage to 1, it will activate the second page. Pass `-1` for forcing to last page.',
    },
    compressed: {
      description:
        'If true, will only show next/prev arrows and simplified number set.',
    },
    responsive: {
      // @ts-ignore - add non resolved type
      type: 'false | EuiBreakpointSize[]',
      description:
        'Automatically reduces to the `compressed` version on smaller screens. Remove completely with `false` or provide your own list of responsive breakpoints.',
    },
  },
  args: {
    itemsPerPage: euiTablePaginationDefaults.itemsPerPage,
    itemsPerPageOptions: euiTablePaginationDefaults.itemsPerPageOptions,
    showPerPageOptions: euiTablePaginationDefaults.showPerPageOptions,
    // set up for easier testing/QA
    pageCount: undefined,
    activePage: undefined,
    compressed: false,
    responsive: false,
  },
};
enableFunctionToggleControls(meta, ['onChangePage', 'onChangeItemsPerPage']);
moveStorybookControlsToCategory(
  meta,
  ['pageCount', 'activePage', 'compressed', 'responsive'],
  'EuiPagination props'
);

export default meta;
type Story = StoryObj<EuiTablePaginationProps>;

export const Playground: Story = {
  args: {
    pageCount: 3,
    responsive: ['xs', 's'],
  },
};
