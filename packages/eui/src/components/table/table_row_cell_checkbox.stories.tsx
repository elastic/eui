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

import { EuiCheckbox } from '../form';
import { EuiTable, EuiTableBody, EuiTableRow, EuiTableRowCell } from './index';
import { EuiTableRowCellCheckbox } from './table_row_cell_checkbox';

type EuiTableRowCellCheckboxProps = typeof EuiTableRowCellCheckbox;

const meta: Meta<EuiTableRowCellCheckboxProps> = {
  title: 'Tabular Content/EuiTable/EuiTableRow/EuiTableRowCellCheckbox',
  component: EuiTableRowCellCheckbox,
  decorators: [
    (Story, { args }) => (
      <EuiTable>
        <EuiTableBody>
          <EuiTableRow hasSelection={true}>
            <Story {...args} />
            <EuiTableRowCell>Cell 1</EuiTableRowCell>
          </EuiTableRow>
        </EuiTableBody>
      </EuiTable>
    ),
  ],
};

export default meta;
type Story = StoryObj<EuiTableRowCellCheckboxProps>;

export const Playground: Story = {
  args: {
    children: (
      <EuiCheckbox id="selectRow" onChange={(e) => action('onChange')(e)} />
    ),
  },
};
