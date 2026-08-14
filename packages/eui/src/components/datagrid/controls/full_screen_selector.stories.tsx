/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { expect, fireEvent, waitFor, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { playDecorator, VRT_SELECTORS } from '../../../../.storybook/vrt';

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
    vrt: { selector: VRT_SELECTORS.portal },
  },
  render: () => (
    <>
      <EuiHeader position="fixed" />
      <EuiPageTemplate grow={false} minHeight={0}>
        <EuiDataGrid {...dataGridProps} />
      </EuiPageTemplate>
    </>
  ),
  play: playDecorator(async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => canvas.getByLabelText('Enter fullscreen'));
    await fireEvent.click(canvas.getByLabelText('Enter fullscreen'));
    await waitFor(() => {
      expect(canvas.getByLabelText('Exit fullscreen')).toBeVisible();
      expect(canvas.getByRole('grid').getBoundingClientRect().width).toBe(
        window.innerWidth
      );
    });
  }),
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
          <EuiFlyout
            aria-label="Example flyout"
            onClose={() => setOpenFlyout(false)}
          >
            Flyout should not be below header in full screen mode
          </EuiFlyout>
        )}
      </>
    );
  },
};
