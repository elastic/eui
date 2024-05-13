import React, { FunctionComponent } from 'react';
import {
  EuiDataGrid,
  EuiDataGridPaginationProps as _EuiDataGridPaginationProps,
} from '../../../../../src/components';

import { DataGridPropsTable } from '../_props_table';
import { gridSnippets } from '../_snippets';

const gridLinks = {
  rowHeightsOptions:
    '/tabular-content/data-grid-style-display#row-heights-options',
  gridStyle: '/tabular-content/data-grid-style-display#grid-style',
  inMemory: '/tabular-content/data-grid-advanced#data-grid-in-memory',
  leadingControlColumns:
    '/tabular-content/data-grid-schema-columns#control-columns',
  trailingControlColumns:
    '/tabular-content/data-grid-schema-columns#control-columns',
  renderCellPopover:
    '/tabular-content/data-grid-cells-popovers#completely-customizing-cell-popover-rendering',
  renderFooterCellValue: '/tabular-content/data-grid-schema-columns#footer-row',
  schemaDetectors: '/tabular-content/data-grid-schema-columns#schemas',
  toolbarVisibility: '/tabular-content/data-grid-toolbar#toolbar-visibility',
  ref: '/tabular-content/data-grid-advanced#ref-methods',
  renderCustomGridBody:
    '/tabular-content/data-grid-advanced#custom-body-renderer',
  cellContext: '/tabular-content/data-grid-cells-popovers#cell-context',
};

export const DataGridTopProps = () => {
  return (
    <DataGridPropsTable
      component={EuiDataGrid}
      exclude={[
        'className',
        'css',
        'data-test-subj',
        'aria-label',
        'width',
        'height',
        'minSizeForControls',
      ]}
      snippets={gridSnippets}
      links={gridLinks}
    />
  );
};

// Loading `EuiDataGridPaginationProps` via !prop-loader doesn't correctly inherit @defaults
export const EuiDataGridPaginationProps: FunctionComponent<
  _EuiDataGridPaginationProps
> = () => <div />;
