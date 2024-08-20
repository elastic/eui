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
import { EuiTable, EuiTableFooterCell } from './index';
import { EuiTableFooter } from './table_footer';

type EuiTableFooterProps = typeof EuiTableFooter;

const meta: Meta<EuiTableFooterProps> = {
  title: 'Tabular Content/EuiTable/EuiTableFooter/EuiTableFooter',
  component: EuiTableFooter,
  decorators: [
    (Story, { args }) => (
      <EuiTable responsiveBreakpoint={false}>
        <Story {...args} />
      </EuiTable>
    ),
  ],
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiTableFooterProps>;

export const Playground: Story = {
  args: {
    children: (
      <>
        <EuiTableFooterCell>Cell 1</EuiTableFooterCell>
        <EuiTableFooterCell>Cell 2</EuiTableFooterCell>
        <EuiTableFooterCell>
          Long text that will truncate, because footer cells default to that
        </EuiTableFooterCell>
      </>
    ),
  },
};
