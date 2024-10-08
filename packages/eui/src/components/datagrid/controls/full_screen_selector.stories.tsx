/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { fireEvent, waitFor, within } from '@storybook/test';
import type { Meta, StoryObj, ReactRenderer } from '@storybook/react';
import type { PlayFunctionContext } from '@storybook/csf';
import { LOKI_SELECTORS } from '../../../../.storybook/loki';

import { EuiHeader } from '../../header';
import { EuiPageTemplate } from '../../page_template';
import { EuiFlyout } from '../../flyout';
import { EuiDataGrid } from '../data_grid';
import { EuiDataGridProps } from '../data_grid_types';

const meta: Meta<EuiDataGridProps> = {
  title: 'Tabular Content/EuiDataGrid/FullscreenVRT',
  component: EuiDataGrid,
};

export default meta;
type Story = StoryObj<EuiDataGridProps>;

const dataGridProps: EuiDataGridProps = {
  'aria-label': 'Test',
  columns: [{ id: 'Test' }],
  rowCount: 100,
  pagination: {
    pageIndex: 0,
    pageSize: 50,
    pageSizeOptions: [1],
    onChangePage: () => {},
    onChangeItemsPerPage: () => {},
  },
  renderCellValue: () => 'Test',
  columnVisibility: {
    visibleColumns: ['Test'],
    setVisibleColumns: () => {},
  },
};

export const FullScreenWithHeader: Story = {
  tags: ['vrt-only'],
  parameters: {
    loki: { chromeSelector: LOKI_SELECTORS.portal },
  },
  render: () => (
    <>
      <EuiHeader position="fixed" />
      <EuiPageTemplate grow={false} minHeight={0}>
        <EuiDataGrid {...dataGridProps} />
      </EuiPageTemplate>
    </>
  ),
  play: async ({ canvasElement }: PlayFunctionContext<ReactRenderer>) => {
    const canvas = within(canvasElement);
    await waitFor(() => canvas.getByLabelText('Enter fullscreen'));
    await fireEvent.click(canvas.getByLabelText('Enter fullscreen'));
  },
};

export const FullScreenWithFlyout: Story = {
  ...FullScreenWithHeader,
  tags: ['vrt-only'],
  render: function Render() {
    const [openFlyout, setOpenFlyout] = useState(true);
    return (
      <>
        <EuiHeader position="fixed" />
        <EuiPageTemplate grow={false} minHeight={0}>
          <EuiDataGrid
            {...dataGridProps}
            renderCellValue={() => (
              <button
                type="button"
                onClick={() => setOpenFlyout((isOpen) => !isOpen)}
              >
                Toggle flyout
              </button>
            )}
          />
        </EuiPageTemplate>
        {openFlyout && (
          <EuiFlyout onClose={() => setOpenFlyout(false)}>
            Flyout should not be below header in full screen mode
          </EuiFlyout>
        )}
      </>
    );
  },
};
