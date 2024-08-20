/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../.storybook/utils';
import { EuiTable, EuiTableHeaderCell } from './index';
import { EuiTableHeader, EuiTableHeaderProps } from './table_header';

const meta: Meta<EuiTableHeaderProps> = {
  title: 'Tabular Content/EuiTable/EuiTableHeader/EuiTableHeader',
  component: EuiTableHeader,
  decorators: [
    (Story, { args }) => (
      <EuiTable responsiveBreakpoint={false}>
        <Story {...args} />
      </EuiTable>
    ),
  ],
  args: {
    wrapWithTableRow: true,
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiTableHeaderProps>;

export const Playground: Story = {
  args: {
    children: (
      <>
        <EuiTableHeaderCell>Column 1</EuiTableHeaderCell>
        <EuiTableHeaderCell>Column 2</EuiTableHeaderCell>
        <EuiTableHeaderCell>
          Long text that will truncate, because header cells default to that
        </EuiTableHeaderCell>
      </>
    ),
  },
};
