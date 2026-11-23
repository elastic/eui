/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useRef,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj, ReactRenderer } from '@storybook/react-vite';
import type { StoryContext } from 'storybook/internal/csf';
import { expect, fireEvent, waitFor } from 'storybook/test';
import { action } from 'storybook/actions';

import { within } from '../../../.storybook/test';
import { enableFunctionToggleControls } from '../../../.storybook/utils';
import {
  playDecorator,
  VRT_SELECTORS,
  VRT_VARIANT_ATTRIBUTE,
} from '../../../.storybook/vrt';

import { EuiAccordion } from '../accordion';
import { EuiButtonIcon } from '../button';
import { EuiFieldNumber, EuiFormRow } from '../form';
import { EuiSpacer } from '../spacer';
import { EuiIconTip, EuiToolTip } from '../tool_tip';

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
    vrt: { selector: VRT_SELECTORS.portal },
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

const CustomHeaderCell = ({
  title,
  tooltipAnchorType = 'button',
}: {
  title: string;
  tooltipAnchorType?: 'button' | 'icon';
}) => (
  <>
    <span>{title}</span>
    {tooltipAnchorType === 'icon' ? (
      <EuiIconTip
        type="question"
        content="tooltip content"
        anchorProps={{
          css: ({ euiTheme }) => css`
            margin-inline-start: ${euiTheme.size.s};
          `,
        }}
      />
    ) : (
      <EuiToolTip content="tooltip content">
        <EuiButtonIcon
          iconType="question"
          aria-label="Additional information"
          color="text"
        />
      </EuiToolTip>
    )}
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
        display: <CustomHeaderCell title="Email" tooltipAnchorType="icon" />,
        initialWidth: 130,
        cellActions: [
          ({ rowIndex, Component }: EuiDataGridColumnCellActionProps) => {
            const data = raw_data;
            const value = data[rowIndex].email.raw;
            return (
              <Component
                onClick={() => alert(value)}
                iconType="mail"
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
  play: async ({ canvasElement }: StoryContext<ReactRenderer>) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      expect(
        canvas.getByTestSubject('dataGridHeaderCell-name')
      ).toBeInTheDocument();
    });

    await fireEvent.focus(canvas.getByTestSubject('dataGridHeaderCell-name'));
  },
};

const FractionalWidthContainer = ({
  initialWidth,
  children,
}: PropsWithChildren<{ initialWidth: number }>) => {
  const [width, setWidth] = useState(initialWidth);

  return (
    <>
      <EuiFormRow label="Container width (px)">
        <EuiFieldNumber
          value={width}
          step={0.1}
          onChange={(event) => setWidth(Number(event.target.value))}
        />
      </EuiFormRow>
      <EuiSpacer />
      <div style={{ width }}>{children}</div>
    </>
  );
};

const renderPlainCellValue: EuiDataGridProps['renderCellValue'] = ({
  rowIndex,
  columnId,
}) => `${columnId} ${rowIndex}`;

/**
 * A single unsized column fills the whole grid width. Scrollbars must not
 * flicker or hang the tab at any fractional width, including while the
 * accordion animates open. Needs always-visible (non-overlay) scrollbars.
 */
export const SingleColumnInAccordion: Story = {
  parameters: {
    controls: { include: [] },
    vrt: { skip: true },
  },
  render: () => (
    <FractionalWidthContainer initialWidth={500.6}>
      <EuiAccordion id="singleColumnInAccordion" buttonContent="Query results">
        <EuiDataGrid
          aria-label="Single column data grid"
          columns={[{ id: 'count' }]}
          columnVisibility={{
            visibleColumns: ['count'],
            setVisibleColumns: () => {},
          }}
          rowCount={1}
          renderCellValue={renderPlainCellValue}
          toolbarVisibility={false}
        />
      </EuiAccordion>
    </FractionalWidthContainer>
  ),
};

/**
 * Unsized columns plus a row number control column inside a fixed-height
 * panel. Scrollbars must not flicker at any fractional width.
 * Needs always-visible (non-overlay) scrollbars.
 */
export const UnsizedColumnsInFixedHeightPanel: Story = {
  parameters: {
    controls: { include: [] },
    vrt: { skip: true },
  },
  render: () => (
    <FractionalWidthContainer initialWidth={500.6}>
      <div style={{ height: 160 }}>
        <EuiDataGrid
          aria-label="Unsized columns data grid"
          columns={[
            { id: 'customer_gender' },
            { id: 'day_of_week_i' },
            { id: 'total_quantity' },
          ]}
          columnVisibility={{
            visibleColumns: [
              'customer_gender',
              'day_of_week_i',
              'total_quantity',
            ],
            setVisibleColumns: () => {},
          }}
          leadingControlColumns={[
            {
              id: 'rowNumber',
              width: 40,
              headerCellRender: () => null,
              rowCellRender: ({ rowIndex }) => rowIndex + 1,
            },
          ]}
          rowCount={3}
          renderCellValue={renderPlainCellValue}
          toolbarVisibility={false}
        />
      </div>
    </FractionalWidthContainer>
  ),
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
  play: playDecorator(async ({ canvasElement }) => {
    await within(canvasElement).waitForEuiPopoverVisible();
  }),
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
  play: async ({ canvasElement }: StoryContext<ReactRenderer>) => {
    const canvas = within(canvasElement);
    await canvas.waitForAndClick('dataGridHeaderCellActionButton-account');
    await canvas.waitForEuiPopoverVisible();
  },
};

export const VisibleColumns: Story = {
  tags: ['vrt-only'],
  args: {
    ...defaultStorybookArgs,
    columnVisibility: {
      // `visibleColumns` has a different order than `columns` - `visibleColumns` determines the order
      visibleColumns: ['date', 'name', 'email', 'location'],
      setVisibleColumns: action('setVisibleColumns'),
    },
    // `columns` contains duplicates - only the first occurrence is used
    columns: [
      { id: 'name', displayAsText: 'Name' },
      { id: 'email', displayAsText: 'Email' },
      { id: 'location', displayAsText: 'Location' },
      { id: 'name', displayAsText: 'Name (duplicate)' },
      { id: 'email', displayAsText: 'Email (duplicate)' },
      { id: 'account', displayAsText: 'Account' },
      { id: 'date', displayAsText: 'Date' },
    ],
  },
  render: (args: EuiDataGridProps) => <StatefulDataGrid {...args} />,
  play: playDecorator(async ({ canvasElement }) => {
    // Column selector is hidden below 479px
    if (
      canvasElement.ownerDocument.documentElement.getAttribute(
        VRT_VARIANT_ATTRIBUTE
      ) === 'mobile'
    ) {
      return;
    }

    const canvas = within(canvasElement);
    await canvas.waitForAndClick('dataGridColumnSelectorButton');
    await canvas.waitForEuiPopoverVisible();
  }),
};

export const HeaderVisibility: Story = {
  tags: ['vrt-only'],
  parameters: {
    controls: { include: ['toolbarVisibility', 'headerVisibility'] },
  },
  args: {
    ...defaultStorybookArgs,
    rowCount: 5,
    headerVisibility: false,
    toolbarVisibility: false,
  },
  render: (args: EuiDataGridProps) => <StatefulDataGrid {...args} />,
};
