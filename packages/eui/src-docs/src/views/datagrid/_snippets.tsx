import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable local/css-logical-properties */
export const gridSnippets = {
  inMemory: `// Will try to autodectect schemas and do sorting and pagination in memory.
inMemory={{ level: 'sorting' }}`,
  rowCount: 'rowCount={200}',
  columns: `columns={[
  {
    id: 'A', // required
    display: <>Column A <EuiIcon type="dot" /></>, // optional column header rendering
    displayAsText: 'Column A', // column header as plain text
    displayHeaderCellProps: { className: 'eui-textCenter' }, // optional column header cell props
    initialWidth: 150, // starting width of 150px
    isResizable: false, // prevents the user from resizing width
    isExpandable: false, // doesn't allow clicking in to see the content in a popup
    isSortable: false, // prevents the user from sorting the data grid by this column
    defaultSortDirection: 'asc', // sets the default sort direction
    schema: 'franchise', // custom schema later defined under schemaDetectors
    actions: false, // no column header actions are displayed
    actions: { showMoveLeft: false, showMoveRight: false }, // doesn't show move actions in column header
    cellActions: [ // provides one additional cell action that triggers an alert once clicked
      ({ Component }) => <Component iconType="heart" onClick={() => alert('test')}>Custom action</Component>,
    ],
    visibleCellActions: 2, // configures the number of cell action buttons immediately visible on a cell
  },
]}`,
  columnVisibility: `columnVisibility={{
  visibleColumns: ['A'],
  setVisibleColumns: () => {},
}}`,
  leadingControlColumns: `leadingControlColumns={[
  {
    id: 'selection',
    width: 31,
    headerCellRender: () => <span>Select a row</span>,
    headerCellProps: { className: 'eui-textCenter' },
    rowCellRender: () => <div><EuiCheckbox ... /></div>,
    footerCellRender: () => <span>Select a row</span>,
    footerCellProps: { className: 'eui-textCenter' },
  },
]}`,
  trailingControlColumns: `trailingControlColumns={[
  {
    id: 'actions',
    width: 40,
    headerCellRender: () => 'Actions',
    headerCellProps: { className: 'euiScreenReaderOnly' },
    rowCellRender: MyGridActionsComponent,
    footerCellRender: () => null,
    footerCellProps: { data-test-subj: 'emptyFooterCell' },
  },
]}`,
  renderCellValue: 'renderCellValue={({ rowIndex, columnId }) => {}}',
  cellContext: `cellContext={{
  // Will be passed to your \`renderCellValue\` function/component as a prop
  yourData,
}}
renderCellValue={({ rowIndex, columnId, yourData }) => {}}`,
  renderCellPopover: `renderCellPopover={({ children, cellActions }) => (
  <>
    <EuiPopoverTitle>I'm a custom popover!</EuiPopoverTitle>
    {children}
    {cellActions}
  </>
)}`,
  renderFooterCellValue:
    'renderFooterCellValue={({ rowIndex, columnId }) => {}}',
  renderCustomGridBody: `// Optional; advanced usage only. This render function is an escape hatch for consumers who need to opt out of virtualization or otherwise need total custom control over how data grid cells are rendered.

renderCustomGridBody={({ visibleColumns, visibleRowData, Cell }) => (
  <Cell colIndex={mappedFromVisibleColumns} visibleRowIndex={mappedFromVisibleRowData} />
)}`,
  pagination: `pagination={{
  pageIndex: 1,
  pageSize: 100, // If not specified, defaults to EuiTablePagination.itemsPerPage
  pageSizeOptions: [50, 100, 200], // If not specified, defaults to EuiTablePagination.itemsPerPageOptions
  onChangePage: () => {},
  onChangeItemsPerPage: () => {},
}}`,
  sorting: `sorting={{
  columns: [{ id: 'A', direction: 'asc' }],
  onSort: () => {},
}}`,
  toolbarVisibility: `toolbarVisibility={{
  showColumnSelector: false,
  showDisplaySelector: false,
  showSortSelector: false,
  showKeyboardShortcuts: false,
  showFullScreenSelector: false,
  additionalControls: {
    left: <EuiButtonEmpty size="xs" />,
    right: <EuiButtonIcon size="xs" />,
  },
}}`,
  gridStyle: `gridStyle={{
  border: 'none',
  stripes: true,
  rowHover: 'highlight',
  header: 'underline',
  // If showDisplaySelector.allowDensity={true} from toolbarVisibility, fontSize and cellPadding will be superceded by what the user decides.
  cellPadding: 'm',
  fontSize: 'm',
  footer: 'overline'
}}`,
  rowHeightsOptions: `rowHeightsOptions={{
  defaultHeight: {
    lineCount: 3 // default every row to 3 lines of text
  },
  lineHeight: '2em', // default every cell line-height to 2em
  rowHeights: {
    1: {
      lineCount: 5, // row at index 1 will show 5 lines
    },
    4: 200, // row at index 4 will adjust the height to 200px
    6: 'auto', // row at index 6 will automatically adjust the height
  },
  scrollAnchorRow: 'start', // compensate for layout shift when auto-sized rows are scrolled into view
}}`,
  ref: `// Optional. For advanced control of internal data grid state, passes back an object of imperative API methods
ref={dataGridRef}`,
  schemaDetectors: (
    <Link to="/tabular-content/data-grid-schema-columns#schemas">
      See Data Grid Schemas for full details.
    </Link>
  ),
  onColumnResize: 'onColumnResize={({columnId, width}) => {}}',
  virtualizationOptions: `// Optional. For advanced control of the underlying react-window virtualization grid.
virtualizationOptions={{
  className: 'virtualizedGridClass',
  style: {},
  direction: 'ltr',
  estimatedRowHeight: 50,
  overscanColumnCount: 1,
  overscanRowCount: 1,
  initialScrollLeft: 0,
  initialScrollTop: 0,
  onScroll: () => {},
  onItemsRendered: () => {},
  itemKey: () => {},
  outerElementType: 'div',
}}
// Properties not listed above are used by EuiDataGrid internals and cannot be overridden.
`,
};
