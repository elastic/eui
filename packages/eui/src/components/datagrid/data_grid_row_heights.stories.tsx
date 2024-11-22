/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { enableFunctionToggleControls } from '../../../.storybook/utils';

import {
  StatefulDataGrid,
  defaultStorybookArgs,
  EuiDataGridRowHeightsPropsComponent,
} from './data_grid.stories.utils';
import type { EuiDataGridRowHeightsOptions } from './data_grid_types';

const meta: Meta<EuiDataGridRowHeightsOptions> = {
  title: 'Tabular Content/EuiDataGrid/rowHeightsOptions (prop)',
  component: EuiDataGridRowHeightsPropsComponent,
  parameters: {
    codeSnippet: {
      snippet: `<EuiDataGrid rowHeightOptions={{{STORY_ARGS}}} />`,
    },
  },
};
enableFunctionToggleControls(meta, ['onChange']);

export default meta;
type Story = StoryObj<EuiDataGridRowHeightsOptions>;

const storyArgs = {
  ...defaultStorybookArgs,
  width: 800, // make it easier to test wrapping text
  rowCount: 5, // make VRT screenshots smaller
};

export const Auto: Story = {
  args: {
    defaultHeight: 'auto',
  },
  render: (rowHeightsOptions) => (
    <StatefulDataGrid
      {...storyArgs}
      rowHeightsOptions={rowHeightsOptions}
      height={419} // Required by webkit browsers to not render with 0 height. TODO: Investigate why, this is likely a bug
    />
  ),
};

export const LineCount: Story = {
  args: {
    defaultHeight: { lineCount: 2 },
  },
  render: (rowHeightsOptions) => (
    <StatefulDataGrid
      {...storyArgs}
      rowHeightsOptions={rowHeightsOptions}
      // Visual regression test for https://github.com/elastic/eui/issues/7780
      // Last two rows of the 'Location' column should *not* have any
      // barely visible text below the ... line-clamp truncation
      gridStyle={{ fontSize: 'm', cellPadding: 'l' }}
    />
  ),
};

// Visual regression test for https://github.com/elastic/eui/issues/7780#issuecomment-2183179080
// lineCount: 1 should fall back to default/undefined height, and
// overflowing content should *not* be cut off by 'padding'
export const LineCount1: Story = {
  tags: ['vrt-only'],
  render: () => (
    <StatefulDataGrid
      {...storyArgs}
      rowHeightsOptions={{ defaultHeight: { lineCount: 1 } }}
      gridStyle={{ fontSize: 's', cellPadding: 's' }}
    />
  ),
};

import { faker } from '@faker-js/faker';
faker.seed(42);
const loremData = Array.from({ length: 5 }).map((_, i) =>
  faker.lorem.lines(i % 2 === 0 ? 1 : 20)
);

export const AutoBelowLineCount: Story = {
  args: {
    autoBelowLineCount: true,
    defaultHeight: { lineCount: 3 },
  },
  render: (rowHeightsOptions) => (
    <StatefulDataGrid
      {...storyArgs}
      rowHeightsOptions={rowHeightsOptions}
      renderCellValue={({ rowIndex }) => loremData[rowIndex]}
      columns={[{ id: 'name' }, { id: 'location' }]}
    />
  ),
};

export const StaticHeight: Story = {
  args: {
    defaultHeight: { height: 48 },
  },
  render: (rowHeightsOptions) => (
    <StatefulDataGrid {...storyArgs} rowHeightsOptions={rowHeightsOptions} />
  ),
};

export const CustomRowHeights: Story = {
  parameters: { controls: { include: ['rowHeights'] } },
  args: {
    rowHeights: {
      1: 'auto',
      2: 48,
      3: {
        height: 56,
      },
      4: {
        lineCount: 2,
      },
    },
    onChange: undefined,
  },
  render: (rowHeightsOptions) => (
    <StatefulDataGrid {...storyArgs} rowHeightsOptions={rowHeightsOptions} />
  ),
};

export const CustomLineHeight: Story = {
  parameters: { controls: { include: ['lineHeight'] } },
  args: {
    lineHeight: '40px',
    onChange: undefined,
  },
  render: (rowHeightsOptions) => (
    <StatefulDataGrid {...storyArgs} rowHeightsOptions={rowHeightsOptions} />
  ),
};

// Visual regression test for https://github.com/elastic/eui/issues/7897
// Control column checkboxes & buttons should vertically align with the first
// line of text for both single and multiple lines of text
export const CustomLineHeightControlColumn: Story = {
  tags: ['vrt-only'],
  render: () => (
    <StatefulDataGrid
      {...storyArgs}
      rowHeightsOptions={{ lineHeight: '3', defaultHeight: { lineCount: 2 } }}
    />
  ),
};
