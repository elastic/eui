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

import { EuiTable, EuiTableHeader, EuiTableHeaderCell } from './index';
import { EuiTableHeaderCellCheckbox } from './table_header_cell_checkbox';
import { EuiCheckbox } from '../form';

type EuiTableHeaderCellCheckboxProps = typeof EuiTableHeaderCellCheckbox;

const meta: Meta<EuiTableHeaderCellCheckboxProps> = {
  title: 'Tabular Content/EuiTable/EuiTableHeader/EuiTableHeaderCellCheckbox',
  component: EuiTableHeaderCellCheckbox,
  decorators: [
    (Story, { args }) => (
      <EuiTable responsiveBreakpoint={false}>
        <EuiTableHeader>
          <Story {...args} />
          <EuiTableHeaderCell>Header Cell 1</EuiTableHeaderCell>
          <EuiTableHeaderCell>Header Cell 2</EuiTableHeaderCell>
          <EuiTableHeaderCell>Header Cell 3</EuiTableHeaderCell>
        </EuiTableHeader>
      </EuiTable>
    ),
  ],
  argTypes: {
    width: { control: 'text' },
  },
  args: {
    scope: 'col',
    // set up for easier testing/QA
    width: '',
  },
};

export default meta;
type Story = StoryObj<EuiTableHeaderCellCheckboxProps>;

export const Playground: Story = {
  args: {
    children: (
      <EuiCheckbox
        id={'selectAllCheckbox'}
        aria-label="Select all"
        title="Select all"
        onChange={(e) => action('onChange')(e)}
      />
    ),
  },
};
