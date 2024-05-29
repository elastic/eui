/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  enableFunctionToggleControls,
  hideStorybookControls,
} from '../../../../.storybook/utils';
import { EuiTable } from '../index';
import { EuiTableHeaderMobile } from './table_header_mobile';
import {
  EuiTableSortMobileItem,
  EuiTableSortMobileItemProps,
} from './table_sort_mobile_item';

const meta: Meta<EuiTableSortMobileItemProps> = {
  title: 'Tabular Content/EuiTable/Mobile subcomponents/EuiTableSortMobileItem',
  component: EuiTableSortMobileItem,
  decorators: [
    (Story, { args }) => (
      <EuiTable>
        <EuiTableHeaderMobile responsiveBreakpoint={true}>
          <Story {...args} />
        </EuiTableHeaderMobile>
      </EuiTable>
    ),
  ],
  argTypes: {
    children: {
      // @ts-ignore - add not resolved type
      type: 'ReactNode',
      control: 'text',
    },
  },
  args: {
    // set up for easier testing/QA
    isSorted: false,
    isSortAscending: false,
  },
};
hideStorybookControls(meta, ['aria-label']);
enableFunctionToggleControls(meta, ['onSort']);

export default meta;
type Story = StoryObj<EuiTableSortMobileItemProps>;

export const Playground: Story = {
  args: {
    children: 'sort item',
  },
};
