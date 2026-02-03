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
  EuiTableBody,
  EuiTableFooter,
  EuiTableFooterCell,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableRow,
  EuiTableRowCell,
} from './index';

import { EuiTable, EuiTableProps } from './table';

const meta: Meta<EuiTableProps> = {
  title: 'Tabular Content/EuiTable/EuiTable',
  component: EuiTable,
  args: {
    responsiveBreakpoint: 'm',
    tableLayout: 'fixed',
    compressed: false, // TODO: Where is this prop even used, and why isn't this documented?
    hasBackground: true,
  },
};

export default meta;
type Story = StoryObj<EuiTableProps>;

export const Playground: Story = {
  argTypes: {
    responsiveBreakpoint: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl', true, false],
    },
  },
  render: ({ ...args }) => (
    <EuiTable {...args}>
      <EuiTableHeader>
        <EuiTableHeaderCell>Column 1</EuiTableHeaderCell>
        <EuiTableHeaderCell>Column 2</EuiTableHeaderCell>
        <EuiTableHeaderCell>
          Long text that will truncate, because header cells default to that
        </EuiTableHeaderCell>
      </EuiTableHeader>
      <EuiTableBody>
        {Array.from({ length: 20 }, (_, i) => (
          <EuiTableRow key={i}>
            {Array.from({ length: 3 }, (_, j) => (
              <EuiTableRowCell key={`${i}_${j}`}>
                {j === 2 ? (
                  'Long text that will change width when table layout is set to auto'
                ) : (
                  <>
                    Row {i + 1}, Cell {j + 1}
                  </>
                )}
              </EuiTableRowCell>
            ))}
          </EuiTableRow>
        ))}
      </EuiTableBody>
      <EuiTableFooter>
        <EuiTableFooterCell>Total: 20</EuiTableFooterCell>
        <EuiTableFooterCell>Total: 20</EuiTableFooterCell>
        <EuiTableFooterCell>
          Long text that will truncate, because footer cells default to that
        </EuiTableFooterCell>
      </EuiTableFooter>
    </EuiTable>
  ),
};

export const WithoutBackground: Story = {
  ...Playground,
  tags: ['vrt-only'],
  args: {
    ...Playground.args,
    hasBackground: false,
  },
};
