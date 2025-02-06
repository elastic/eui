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
} from '../../../.storybook/utils';
import { LEFT_ALIGNMENT } from '../../services';
import { EuiTable, EuiTableHeader } from './index';
import { HEADER_CELL_SCOPE } from './table_header_cell_shared';
import {
  EuiTableHeaderCell,
  EuiTableHeaderCellProps,
} from './table_header_cell';

const meta: Meta<EuiTableHeaderCellProps> = {
  title: 'Tabular Content/EuiTable/EuiTableHeader/EuiTableHeaderCell',
  component: EuiTableHeaderCell,
  decorators: [
    (Story, { args }) => (
      <EuiTable responsiveBreakpoint={false}>
        <EuiTableHeader>
          <Story {...args} />
        </EuiTableHeader>
      </EuiTable>
    ),
  ],
  argTypes: {
    scope: {
      control: 'radio',
      options: [undefined, ...HEADER_CELL_SCOPE],
    },
    width: { control: 'text' },
  },
  args: {
    align: LEFT_ALIGNMENT,
    // set up for easier testing/QA
    width: '',
    isSortAscending: false,
    isSorted: false,
    mobileOptions: {
      show: true,
      only: false,
    },
    description: '',
  },
};
hideStorybookControls(meta, ['aria-label']);
enableFunctionToggleControls(meta, ['onSort']);

export default meta;
type Story = StoryObj<EuiTableHeaderCellProps>;

export const Playground: Story = {
  args: {
    children: 'Header cell content',
    // @ts-ignore - overwrite meta default to align with base behavior
    onSort: false,
  },
};

export const Tooltip: Story = {
  parameters: {
    controls: {
      include: ['tooltipProps'],
    },
  },
  args: {
    children: 'Header cell content',
    // @ts-ignore - overwrite meta default to align with base behavior
    onSort: false,
    tooltipProps: {
      content: 'tooltip content',
    },
  },
};
