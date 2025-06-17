/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useRef, useEffect } from 'react';
import type { Meta, StoryObj, ReactRenderer } from '@storybook/react';
import type { PlayFunctionContext } from '@storybook/csf';
import { expect, fireEvent, waitFor } from '@storybook/test';
import { action } from '@storybook/addon-actions';
import { within } from '../../../.storybook/test';
import { enableFunctionToggleControls } from '../../../.storybook/utils';

import { EuiButtonIcon } from '../button';
import { EuiToolTip } from '../tool_tip';

import {
  StatefulDataGrid,
  defaultStorybookArgs,
  raw_data,
} from './data_grid.stories.utils';
import {
  EuiDataGridRefProps,
  type EuiDataGridColumnCellActionProps,
  type EuiDataGridProps,
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
enableFunctionToggleControls<EuiDataGridProps>(Playground, [
  'onColumnResize',
  'onFullScreenChange',
]);

export const Virtualization: Story = {
  parameters: {
    controls: { include: ['width', 'height', 'virtualizationOptions'] },
  },
  args: {
    ...defaultStorybookArgs,
    width: '300px',
    height: '300px',
    virtualizationOptions: {
      onScroll: action('onScroll'),
    },
  },
  render: (args: EuiDataGridProps) => <StatefulDataGrid {...args} />,
};

const CustomHeaderCell = ({ title }: { title: string }) => (
  <>
    <span>{title}</span>
    <EuiToolTip content="tooltip content">
      <EuiButtonIcon
        iconType="question"
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

export const DraggableColumns: Story = {
  parameters: {
    controls: { include: ['columns', 'columnVisibility'] },
  },
  args: {
    ...defaultStorybookArgs,
    columnVisibility: {
      ...defaultStorybookArgs.columnVisibility,
      canDragAndDropColumns: true,
    },
    columns: defaultStorybookArgs.columns.map((column) =>
      column.id === 'location'
        ? { ...column, display: <CustomHeaderCell title="Location" /> }
        : column
    ),
  },
  render: (args: EuiDataGridProps) => <StatefulDataGrid {...args} />,
  play: async ({ canvasElement }: PlayFunctionContext<ReactRenderer>) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      expect(
        canvas.getByTestSubject('dataGridHeaderCell-name')
      ).toBeInTheDocument();
    });

    await fireEvent.focus(canvas.getByTestSubject('dataGridHeaderCell-name'));
  },
};

/**
 * VRT only
 */

export const CellActions: Story = {
  tags: ['vrt-only'],
  args: defaultStorybookArgs,
  render: function Render() {
    const dataGridRef = useRef<EuiDataGridRefProps | null>(null);

    useEffect(() => {
      dataGridRef.current?.setFocusedCell({ rowIndex: 2, colIndex: 2 });
    }, []);

    return <EuiDataGrid {...defaultStorybookArgs} ref={dataGridRef} />;
  },
};

export const CellExpansionPopover: Story = {
  tags: ['vrt-only'],
  args: defaultStorybookArgs,
  render: function Render() {
    const dataGridRef = useRef<EuiDataGridRefProps | null>(null);

    useEffect(() => {
      dataGridRef.current?.openCellPopover({ rowIndex: 1, colIndex: 1 });
    }, []);

    return <EuiDataGrid {...defaultStorybookArgs} ref={dataGridRef} />;
  },
};

export const ColumnActions: Story = {
  tags: ['vrt-only'],
  args: defaultStorybookArgs,
  render: () => (
    <StatefulDataGrid
      {...defaultStorybookArgs}
      // Should correctly affect the actions button size
      gridStyle={{ fontSize: 's', cellPadding: 's' }}
    />
  ),
  play: async ({ canvasElement }: PlayFunctionContext<ReactRenderer>) => {
    const canvas = within(canvasElement);
    await canvas.waitForAndClick('dataGridHeaderCellActionButton-account');
    await canvas.waitForEuiPopoverVisible();
  },
};
