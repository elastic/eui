import React from 'react';
import { EuiLink, EuiDataGrid } from '../../../../../src/components';

import { DataGridPropsTable } from '../_props_table';

const gridSnippets = {
  inMemory: `// Will try to autodectect schemas and do sorting and pagination in memory.
inMemory={{ level: 'sorting' }}`,
  rowCount: 'rowCount={200}',
  columns: `columns={[
  {
    id: 'A', // required
    initialWidth: 150, // starting width of 150px
    isResizable: false, // prevents the user from resizing width
    actions: false, // no column header actions are displayed
    isExpandable: false, // doesn't allow clicking in to see the content in a popup
    actions: { showMoveLeft: false, showMoveRight: false }, // doesn't show move actions in column header
    schema: 'franchise', // custom schema later defined under schemaDetectors
    cellActions: [ // provides one additional cell action that triggers an alert once clicked
      {
        label: 'test',
        iconType: 'heart',
        callback: ()=> alert('test')
      }
    ]
  }
]}`,
  columnVisibility: `columnVisibility={{
  visibleColumns: ['A', 'C'],
  setVisibleColumns: () => {},
}}`,
  leadingControlColumns: `leadingControlColumns={[
  {
    id: 'selection',
    width: 31,
    headerCellRender: () => <span>Select a Row</span>,
    rowCellRender: () => <div><EuiCheckbox ... /></div>,
  },
]}`,
  trailingControlColumns: `trailingControlColumns={[
  {
    id: 'actions',
    width: 40,
    headerCellRender: () => null,
    rowCellRender: MyGridActionsComponent,
  },
]}`,
  renderCellValue: 'renderCellValue={({ rowIndex, columnId }) => {}}',
  renderCellPopover: `renderCellPopover={({ children, cellActions }) => (
  <>
    <EuiPopoverTitle>I'm a custom popover!</EuiPopoverTitle>
    {children}
    {cellActions}
  </>
)}`,
  renderFooterCellValue:
    'renderFooterCellValue={({ rowIndex, columnId }) => {}}',
  pagination: `pagination={{
  pageIndex: 1,
  pageSize: 100,
  pageSizeOptions: [50, 100, 200],
  onChangePage: () => {},
  onChangeItemsPerPage: () => {},
}}`,
  sorting: `sorting={{
  columns: [{ id: 'C', direction: 'asc' }],
  onSort: () => {},
}}`,
  toolbarVisibility: `toolbarVisibility={{
  showColumnSelector: false,
  showDisplaySelector: false,
  showSortSelector: false,
  showFullScreenSelector: false,
  additionalControls: {
    left: <EuiButtonEmpty size="xs" />,
    right: <EuiButtonIcon size="xs" />,
  },
}}`,
  gridStyle: `gridStyle={{
  border: 'all',
  fontSize: 'm',
  cellPadding: 'm',
  stripes: true,
  rowHover: 'highlight',
  header: 'shade',
}}`,
  rowHeightsOptions: `rowHeightsOptions={{
  defaultHeight: 34,
  rowHeights: {
    0: auto
  },
  lineHeight: '1em',
}}`,
  schemaDetectors: (
    <EuiLink href="/#/tabular-content/data-grid-data#schemas">
      See Data Grid Schemas for full details.
    </EuiLink>
  ),
  onColumnResize: 'onColumnResize={({columnId, width}) => {}}',
};

const gridLinks = {
  rowHeightsOptions:
    '/#/tabular-content/data-grid-style-display#row-heights-options',
  gridStyle: '/#/tabular-content/data-grid-style-display#grid-style',
  inMemory: '/#/tabular-content/data-grid-in-memory',
  leadingControlColumns:
    '/#/tabular-content/data-grid-columns-cells#control-columns',
  trailingControlColumns:
    '/#/tabular-content/data-grid-columns-cells#control-columns',
  renderCellPopover:
    '/#/tabular-content/data-grid-data#completely-customizing-cell-popover-rendering',
  renderFooterCellValue: '/#/tabular-content/data-grid-data#footer-row',
  schemaDetectors: '/#/tabular-content/data-grid-data#schemas',
  toolbarVisibility: '/#/tabular-content/data-grid-toolbar#toolbar-visibility',
};

export const DataGridTopProps = () => {
  return (
    <DataGridPropsTable
      component={EuiDataGrid}
      exclude={[
        'className',
        'data-test-subj',
        'aria-label',
        'width',
        'height',
        'minSizeForControls',
        'ref',
      ]}
      snippets={gridSnippets}
      links={gridLinks}
    />
  );
};
