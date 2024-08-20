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
import {
  LEFT_ALIGNMENT,
  CENTER_ALIGNMENT,
  RIGHT_ALIGNMENT,
} from '../../services';
import { EuiTable, EuiTableFooter } from './index';
import {
  EuiTableFooterCell,
  EuiTableFooterCellProps,
} from './table_footer_cell';

const meta: Meta<EuiTableFooterCellProps> = {
  title: 'Tabular Content/EuiTable/EuiTableFooter/EuiTableFooterCell',
  component: EuiTableFooterCell,
  decorators: [
    (Story, { args }) => (
      <EuiTable responsiveBreakpoint={false}>
        <EuiTableFooter>
          <Story {...args} />
        </EuiTableFooter>
      </EuiTable>
    ),
  ],
  argTypes: {
    align: {
      control: 'radio',
      options: [LEFT_ALIGNMENT, CENTER_ALIGNMENT, RIGHT_ALIGNMENT],
    },
  },
  args: {
    align: LEFT_ALIGNMENT,
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiTableFooterCellProps>;

export const Playground: Story = {
  args: {
    children: 'Footer cell content',
  },
};
