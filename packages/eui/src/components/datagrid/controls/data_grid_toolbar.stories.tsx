/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { fireEvent } from '@storybook/test';
import type { Meta, StoryObj, ReactRenderer } from '@storybook/react';
import type { PlayFunctionContext } from '@storybook/csf';
import { within } from '../../../../.storybook/test';
import { LOKI_SELECTORS } from '../../../../.storybook/loki';

import { EuiButtonEmpty, EuiButtonIcon } from '../../button';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiToolTip } from '../../tool_tip';

import { EuiDataGrid } from '../data_grid';
import { EuiDataGridProps } from '../data_grid_types';

const meta: Meta<EuiDataGridProps> = {
  title: 'Tabular Content/EuiDataGrid/Toolbar Controls',
  component: EuiDataGrid,
};

export default meta;
type Story = StoryObj<EuiDataGridProps>;

export const AdditionalControls: Story = {
  parameters: {
    controls: { include: ['toolbarVisibility'] },
  },
  args: {
    toolbarVisibility: {
      additionalControls: {
        left: {
          prepend: (
            <EuiButtonEmpty size="xs" iconType="document" color="text">
              12 results
            </EuiButtonEmpty>
          ),
          append: (
            <EuiButtonEmpty size="xs" iconType="download" color="primary">
              Download
            </EuiButtonEmpty>
          ),
        },
        right: (
          <>
            <EuiToolTip title="Updated 3 min ago" content="Click to refresh">
              <EuiButtonIcon
                aria-label="Refresh grid data"
                size="xs"
                iconType="refresh"
              />
            </EuiToolTip>
            <EuiToolTip content="Inspect grid data">
              <EuiButtonIcon
                aria-label="Inspect grid data"
                size="xs"
                iconType="inspect"
              />
            </EuiToolTip>
          </>
        ),
      },
    },
  },
  render: (args: EuiDataGridProps) => <StatefulDataGrid {...args} />,
};

export const RenderCustomToolbar: Story = {
  parameters: {
    controls: { include: ['renderCustomToolbar'] },
  },
  args: {
    renderCustomToolbar: ({
      hasRoomForGridControls,
      columnControl,
      columnSortingControl,
      displayControl,
      fullScreenControl,
      keyboardShortcutsControl,
    }) => {
      return (
        <EuiFlexGroup
          responsive={false}
          gutterSize="s"
          justifyContent="spaceBetween"
          alignItems="center"
          css={({ euiTheme }) => ({
            backgroundColor: euiTheme.colors.emptyShade,
            padding: euiTheme.size.xs,
            border: euiTheme.border.thin,
          })}
        >
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty size="xs" iconType="brush" color="accent">
              Custom left side
            </EuiButtonEmpty>
          </EuiFlexItem>

          {hasRoomForGridControls && (
            <EuiFlexItem grow={false}>
              <EuiFlexGroup
                responsive={false}
                gutterSize="s"
                alignItems="center"
              >
                <EuiFlexItem grow={false}>{columnControl}</EuiFlexItem>
                <EuiFlexItem grow={false}>{columnSortingControl}</EuiFlexItem>
                <EuiFlexItem grow={false}>
                  {keyboardShortcutsControl}
                </EuiFlexItem>
                <EuiFlexItem grow={false}>{displayControl}</EuiFlexItem>
                <EuiFlexItem grow={false}>{fullScreenControl}</EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          )}
        </EuiFlexGroup>
      );
    },
  },
  render: (args: EuiDataGridProps) => <StatefulDataGrid {...args} />,
};

/**
 * VRT tests only
 */

export const ColumnSelector: Story = {
  tags: ['vrt-only'],
  parameters: {
    loki: { chromeSelector: LOKI_SELECTORS.portal },
  },
  render: () => <StatefulDataGrid minSizeForControls={1} />, // Column sorting is hidden on mobile otherwise
  play: async ({ canvasElement, step }: PlayFunctionContext<ReactRenderer>) => {
    const canvas = within(canvasElement);

    await step('Open column selector popover', async () => {
      await canvas.waitForAndClick('dataGridColumnSelectorButton');
      await canvas.waitForEuiPopoverVisible();
    });
    await step('Hide all columns', async () => {
      await fireEvent.click(
        canvas.getByTestSubject('dataGridColumnSelectorHideAllButton')
      );
    });
  },
};

export const ColumnSorting: Story = {
  tags: ['vrt-only'],
  parameters: {
    loki: { chromeSelector: LOKI_SELECTORS.portal },
  },
  render: () => <StatefulDataGrid minSizeForControls={1} />, // Column sorting is hidden on mobile otherwise
  play: async ({ canvasElement, step }: PlayFunctionContext<ReactRenderer>) => {
    const canvas = within(canvasElement);

    await step('Open column sorting and field selection popovers', async () => {
      await canvas.waitForAndClick('dataGridColumnSortingButton');
      await canvas.waitForEuiPopoverVisible();
      await canvas.waitForAndClick('dataGridColumnSortingSelectionButton');
    });
    await step('Sort descending', async () => {
      await canvas.waitForAndClick(
        'dataGridColumnSortingPopoverColumnSelection-Test'
      );
      await fireEvent.click(
        canvas.getByTestSubject('euiDataGridColumnSorting-sortColumn-Test-desc')
      );
      await canvas.waitForEuiPopoverVisible(); // Without an extra wait, the screenshot diff is flaky
    });
  },
};

export const KeyboardShortcuts: Story = {
  tags: ['vrt-only'],
  parameters: {
    loki: { chromeSelector: LOKI_SELECTORS.portal },
  },
  render: () => <StatefulDataGrid />,
  play: async ({ canvasElement }: PlayFunctionContext<ReactRenderer>) => {
    const canvas = within(canvasElement);
    await canvas.waitForAndClick('dataGridKeyboardShortcutsButton');
  },
};

export const DisplaySelector: Story = {
  tags: ['vrt-only'],
  parameters: {
    loki: { chromeSelector: LOKI_SELECTORS.portal },
  },
  render: () => <StatefulDataGrid />,
  play: async ({ canvasElement, step }: PlayFunctionContext<ReactRenderer>) => {
    const canvas = within(canvasElement);

    await step('Open display selector popover', async () => {
      await canvas.waitForAndClick('dataGridDisplaySelectorButton');
      await canvas.waitForEuiPopoverVisible();
    });
    await step('Toggle density and row height settings', async () => {
      await fireEvent.click(canvas.getByTestSubject('compact'));
      await fireEvent.click(canvas.getByTestSubject('lineCount'));
    });
  },
};

export const FullScreenToggle: Story = {
  tags: ['vrt-only'],
  parameters: {
    loki: { chromeSelector: LOKI_SELECTORS.portal },
  },
  render: () => <StatefulDataGrid />,
  play: async ({ canvasElement }: PlayFunctionContext<ReactRenderer>) => {
    const canvas = within(canvasElement);
    await canvas.waitForAndClick('dataGridFullScreenButton');
  },
};

const StatefulDataGrid = (
  props: Partial<Omit<EuiDataGridProps, 'aria-labelledby'>>
) => {
  const [visibleColumns, setVisibleColumns] = useState(['Test']);
  const [sortingColumns, setSortingColumns] = useState<any[]>([]);

  return (
    <EuiDataGrid
      aria-label="Test"
      renderCellValue={() => 'Test'}
      rowCount={2}
      columns={[{ id: 'Test' }]}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      sorting={{
        columns: sortingColumns,
        onSort: (sortingColumns) => {
          setSortingColumns(sortingColumns);
        },
      }}
      inMemory={{ level: 'sorting' }}
      {...props}
    />
  );
};
