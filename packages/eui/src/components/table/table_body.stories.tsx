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
  disableStorybookControls,
  hideStorybookControls,
} from '../../../.storybook/utils';
import { EuiTable, EuiTableRow, EuiTableRowCell } from './index';
import { EuiTableBody, EuiTableBodyProps } from './table_body';

const meta: Meta<EuiTableBodyProps> = {
  title: 'Tabular Content/EuiTable/EuiTableBody',
  component: EuiTableBody,
  decorators: [
    (Story, { args }) => (
      <EuiTable>
        <Story {...args} />
      </EuiTable>
    ),
  ],
};
disableStorybookControls(meta, ['bodyRef']);
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiTableBodyProps>;

export const Playground: Story = {
  args: {
    children: (
      <>
        <EuiTableRow>
          <EuiTableRowCell>Row 1, Cell 1</EuiTableRowCell>
          <EuiTableRowCell>Row 1, Cell 2</EuiTableRowCell>
          <EuiTableRowCell>Row 1, Cell 3</EuiTableRowCell>
        </EuiTableRow>
      </>
    ),
  },
};
