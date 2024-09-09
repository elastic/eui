/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { EuiButtonIcon } from '../button';
import { EuiToolTip } from '../tool_tip';

import {
  StatefulDataGrid,
  defaultStorybookArgs,
  raw_data,
} from './data_grid.stories.utils';
import type {
  EuiDataGridColumnCellActionProps,
  EuiDataGridProps,
} from './data_grid_types';
import { EuiDataGrid } from './data_grid';

const meta: Meta<EuiDataGridProps> = {
  title: 'Tabular Content/EuiDataGrid',
  component: EuiDataGrid,
  parameters: {
    codeSnippet: {
      // TODO: enable once render functions are supported
      skip: true,
    },
  },
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<EuiDataGridProps>;

export const Playground: Story = {
  args: defaultStorybookArgs,
  render: (args: EuiDataGridProps) => <StatefulDataGrid {...args} />,
};
enableFunctionToggleControls<EuiDataGridProps>(Playground, ['onColumnResize']);

export const Virtualization: Story = {
  parameters: {
    controls: { include: ['width', 'height', 'virtualizationOptions'] },
  },
  args: {
    ...defaultStorybookArgs,
    width: '300px',
    height: '300px',
  },
  render: (args: EuiDataGridProps) => <StatefulDataGrid {...args} />,
};

const CustomHeaderCell = ({ title }: { title: string }) => (
  <>
    <span>{title}</span>
    <EuiToolTip content="tooltip content">
      <EuiButtonIcon
        iconType="questionInCircle"
        aria-label="Additional information"
        color="primary"
      />
    </EuiToolTip>
  </>
);

export const CustomHeaderContent: Story = {
  parameters: {
    controls: {
      include: ['columns', 'rowCount'],
    },
  },
  args: {
    ...defaultStorybookArgs,
    columns: [
      {
        id: 'name',
        displayAsText: 'Name',
        display: <CustomHeaderCell title="Name" />,
        defaultSortDirection: 'asc' as const,
        cellActions: [
          ({ rowIndex, Component }: EuiDataGridColumnCellActionProps) => {
            const data = raw_data;
            const value = data[rowIndex].name.raw;
            return (
              <Component
                onClick={() => alert(`Hi ${value}`)}
                iconType="heart"
                aria-label={`Say hi to ${value}!`}
              >
                Say hi
              </Component>
            );
          },
        ],
      },
      {
        id: 'email',
        display: <CustomHeaderCell title="Email" />,
        initialWidth: 130,
        cellActions: [
          ({ rowIndex, Component }: EuiDataGridColumnCellActionProps) => {
            const data = raw_data;
            const value = data[rowIndex].email.raw;
            return (
              <Component
                onClick={() => alert(value)}
                iconType="email"
                aria-label={`Send email to ${value}`}
              >
                Send email
              </Component>
            );
          },
        ],
      },
      ...[...defaultStorybookArgs.columns].slice(2),
    ],
  },
  render: (args: EuiDataGridProps) => <StatefulDataGrid {...args} />,
};
