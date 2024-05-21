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
  LEFT_ALIGNMENT,
  CENTER_ALIGNMENT,
  RIGHT_ALIGNMENT,
} from '../../services';
import { EuiButtonIcon } from '../button';
import { EuiTable, EuiTableBody, EuiTableRow } from './index';
import { EuiTableRowCell } from './table_row_cell';

type EuiTableRowCellProps = typeof EuiTableRowCell;

const meta: Meta<EuiTableRowCellProps> = {
  title: 'Tabular Content/EuiTable/EuiTableRow/EuiTableRowCell',
  component: EuiTableRowCell,
  decorators: [
    (Story, { args }) => (
      <EuiTable>
        <EuiTableBody>
          <EuiTableRow hasActions={args.hasActions}>
            <EuiTableRowCell>Cell 1</EuiTableRowCell>
            <Story {...args} />
          </EuiTableRow>
        </EuiTableBody>
      </EuiTable>
    ),
  ],
  argTypes: {
    align: {
      control: 'radio',
      options: [LEFT_ALIGNMENT, CENTER_ALIGNMENT, RIGHT_ALIGNMENT],
    },
    width: {
      control: 'text',
    },
  },
  args: {
    align: LEFT_ALIGNMENT,
    hasActions: false,
    isExpander: false,
    setScopeRow: false,
    textOnly: true,
    truncateText: false,
    valign: 'middle',
    // set up for easier testing/QA
    mobileOptions: {
      textOnly: true,
      show: true,
      only: false,
      enlarge: false,
      width: '50%',
      render: null,
      header: null,
    },
    width: '',
  },
};

export default meta;
type Story = StoryObj<EuiTableRowCellProps>;

export const Playground: Story = {
  args: {
    children: 'row cell content',
  },
};

export const Expander: Story = {
  parameters: {
    controls: {
      include: ['isExpander', 'children', 'width', 'align'],
    },
  },
  args: {
    isExpander: true,
    width: '32px',
    align: 'center',
    children: <EuiButtonIcon iconType="arrowDown" />,
  },
};

export const Actions: Story = {
  parameters: {
    controls: {
      include: ['hasActions', 'children', 'width', 'align'],
    },
  },
  args: {
    hasActions: true,
    width: '32px',
    align: 'center',
    children: <EuiButtonIcon iconType="copy" />,
  },
};
