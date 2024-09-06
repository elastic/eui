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
  title: 'Tabular Content/EuiDataGrid/Row Heights',
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
      2: 'auto',
      3: 48,
      4: {
        height: 56,
      },
      5: {
        lineCount: 2,
      },
    },
  },
  render: (rowHeightsOptions) => (
    <StatefulDataGrid {...storyArgs} rowHeightsOptions={rowHeightsOptions} />
  ),
};

export const CustomLineHeight: Story = {
  parameters: { controls: { include: ['lineHeight'] } },
  args: {
    lineHeight: '40px',
  },
  render: (rowHeightsOptions) => (
    <StatefulDataGrid {...storyArgs} rowHeightsOptions={rowHeightsOptions} />
  ),
};
