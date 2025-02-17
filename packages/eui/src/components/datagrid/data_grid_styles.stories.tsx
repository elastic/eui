/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/css';
import { enableFunctionToggleControls } from '../../../.storybook/utils';

import {
  StatefulDataGrid,
  defaultStorybookArgs,
} from './data_grid.stories.utils';
import { EuiDataGridStyle as Component } from './data_grid_types.docgen';
import type { EuiDataGridStyle } from './data_grid_types';

const meta: Meta = {
  title: 'Tabular Content/EuiDataGrid/gridStyle (prop)',
  component: Component,
};

export default meta;
type Story = StoryObj<EuiDataGridStyle>;

const storyArgs = {
  ...defaultStorybookArgs,
  renderFooterCellValue: ({ columnId }: { columnId: string }) =>
    columnId === 'account' ? '5 accounts' : null,
  height: 400, // to more easily test sticky footers
};

export const Playground: Story = {
  parameters: {
    codeSnippet: {
      snippet: `<EuiDataGrid gridStyle={{{STORY_ARGS}}} />`,
    },
    controls: { sort: 'none' },
  },
  args: {
    fontSize: 'm',
    cellPadding: 'm',
    border: 'all',
    header: 'shade',
    footer: 'striped',
    stripes: true,
    stickyFooter: true,
    rowHover: 'highlight',
    rowClasses: {
      1: css`
        label: warning;
        background-color: rgba(255, 0, 0, 0.1);
      `,
    },
  },
  render: (gridStyle: EuiDataGridStyle) => (
    <StatefulDataGrid {...storyArgs} gridStyle={gridStyle} />
  ),
};
enableFunctionToggleControls(Playground, ['onChange']);

/**
 * VRT only
 */

export const HorizontalLines: Story = {
  tags: ['vrt-only'],
  args: {
    border: 'horizontal',
    header: 'shade',
    footer: 'shade',
  },
  render: (gridStyle) => (
    <StatefulDataGrid {...storyArgs} gridStyle={gridStyle} />
  ),
};

export const Minimal: Story = {
  tags: ['vrt-only'],
  args: {
    border: 'none',
    header: 'underline',
    footer: 'overline',
    rowHover: 'none',
    stickyFooter: false,
  },
  render: (gridStyle) => (
    <StatefulDataGrid {...storyArgs} gridStyle={gridStyle} height="auto" />
  ),
};

export const Compact: Story = {
  tags: ['vrt-only'],
  args: {
    fontSize: 's',
    cellPadding: 's',
  },
  render: (gridStyle) => (
    <StatefulDataGrid {...storyArgs} gridStyle={gridStyle} />
  ),
};

export const Expanded: Story = {
  tags: ['vrt-only'],
  args: {
    fontSize: 'l',
    cellPadding: 'l',
  },
  render: (gridStyle) => (
    <StatefulDataGrid {...storyArgs} gridStyle={gridStyle} />
  ),
};
