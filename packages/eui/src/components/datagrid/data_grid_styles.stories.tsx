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
  EuiDataGridStylePropsComponent,
} from './data_grid.stories.utils';
import type { EuiDataGridStyle } from './data_grid_types';

const meta: Meta = {
  title: 'Tabular Content/EuiDataGrid/Grid Styles',
  component: EuiDataGridStylePropsComponent,
};

export default meta;
type Story = StoryObj<EuiDataGridStyle>;

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
    <StatefulDataGrid
      {...defaultStorybookArgs}
      gridStyle={gridStyle}
      renderFooterCellValue={({ columnId }) =>
        columnId === 'account' ? '5 accounts' : null
      }
      height={400}
    />
  ),
};
enableFunctionToggleControls(Playground, ['onChange']);
