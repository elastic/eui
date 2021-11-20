import React, { FunctionComponent, ReactNode } from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../../src/services';
import {
  EuiDataGrid,
  EuiLink,
  EuiCodeBlock,
  EuiBasicTable,
  EuiBasicTableProps,
  EuiSpacer,
} from '../../../../../src/components';

import { getPropsFromComponent } from '../../../services/props/get_props';
import { getDescription } from '../../../services/props/get_description';

const gridSnippets = {
  inMemory: `// Will try to autodectect schemas and do sorting and pagination in memory.
inMemory={{ level: 'sorting' }}`,
  rowCount: 'rowCount={200}',
  columns: `// Required.
  columns={[
    // The first column defines a starting width of 150px, prevents the user from resizing it and no actions are displayed
    { id: 'A', initialWidth: 150, isResizable: false, actions: false },
    // The second column won't allow clicking in to see the content in a popup and doesn't show move actions in column header cell
    { id: 'B', isExpandable: false, actions: { showMoveLeft: false, showMoveRight: false } },
    // The third column refrences a custom schema and provides one additional cell action, that triggers an alert once clicked
    { id: 'C', schema: 'franchise', cellActions: [{ label: 'test', iconType: 'heart', callback: ()=> alert('test') }]}
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
  renderCellValue: `// The following outputs the row and column position.
// Often used in combination with useEffect() to dynamically change the render.
renderCellValue={({ rowIndex, columnId }) =>
 \`\${rowIndex}, \${columnId}\`
}`,
  pagination: `pagination={{
  pageIndex: 1,
  pageSize: 100,
  pageSizeOptions: [50, 100, 200],
  onChangePage: () => {},
  onChangeItemsPerPage: () => {},
}}`,
  sorting: `// Optional, but required when inMemory is set. Provides the sort and gives a callback for when it changes in the grid.
sorting={{
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
  schemaDetectors: `// The following schema 'franchise' essentially acts like a boolean, looking for Star Wars or Star Trek in a column.
schemaDetectors={[
  {
    type: 'franchise',
    // Try to detect if column data is this schema. A value of 1 is the highest possible. A (mean_average - standard_deviation) of .5 will be good enough for the autodetector to assign.
    detector(value) {
      return value.toLowerCase() === 'star wars' ||
        value.toLowerCase() === 'star trek'
        ? 1
        : 0;
    },
    // How we should sort data matching this schema. Again, a value of 1 is the highest value.
    comparator(a, b, direction) {
      const aValue = a.toLowerCase() === 'star wars';
      const bValue = b.toLowerCase() === 'star wars';
      if (aValue < bValue) return direction === 'asc' ? 1 : -1;
      if (aValue > bValue) return direction === 'asc' ? -1 : 1;
      return 0;
    },
    // Text for what the ASC sort does.
    sortTextAsc: 'Star Wars-Star Trek',
    // Text for what the DESC sort does.
    sortTextDesc: 'Star Trek-Star Wars',
    // EuiIcon or Prop to signify this schema.
    icon: 'star',
    // The color to use for the icon prop.
    color: '#000000',
  },
]}`,
  popoverContents: `popoverContents={{
      numeric: ({ children, cellContentsElement }) => {
        // \`children\` is the datagrid's \`renderCellValue\` as a ReactElement and should be used when you are only wrapping the contents
        // \`cellContentsElement\` is the cell's existing DOM element and can be used to extract the text value for processing, as below

        // want to process the already-rendered cell value
        const stringContents = cellContentsElement.textContent;

        // extract the groups-of-three digits that are right-aligned
        return stringContents.replace(/((\\d{3})+)$/, match =>
          // then replace each group of xyz digits with ,xyz
          match.replace(/(\\d{3})/g, ',$1')
        );
      },
    }}
  />
`,
};

const gridLinks = {
  rowHeightsOptions: '/#/tabular-content/data-grid-row-heights-options',
  gridStyle: '/#/tabular-content/data-grid-styling-and-control',
};

interface BasicItem {
  id: string;
  prop: string;
  type?: any;
  sample?: any;
  link?: any;
}

export const DataGridPropsTable: FunctionComponent<{}> = ({}) => {
  const { euiTheme } = useEuiTheme();
  const gridProps = getPropsFromComponent(EuiDataGrid);
  const gridPropsToExclude = [
    'className',
    'data-test-subj',
    'aria-label',
    'width',
    'height',
  ];
  const gridPropsKeys = Object.keys(gridProps)
    .filter((i) => !gridPropsToExclude.includes(i))
    .sort();

  const items: BasicItem[] = gridPropsKeys.map((prop) => {
    return {
      id: prop,
      prop: prop,
      type: gridProps[prop],
      // @ts-ignore TODO
      sample: gridSnippets[prop],
      // @ts-ignore TODO
      link: gridLinks[prop],
    };
  });

  const renderPropDescription = (item: BasicItem) => {
    const description = getDescription(item.type || item, { color: 'subdued' });

    if (description) {
      return (
        <>
          <EuiSpacer size="s" />
          {description}
        </>
      );
    }
  };

  const renderProp = (item: BasicItem) => {
    if (item.link) {
      return (
        <EuiLink href={item.link}>
          <strong>{item.prop}</strong>
        </EuiLink>
      );
    } else {
      return <strong>{item.prop}</strong>;
    }
  };

  const renderSample = (sample: BasicItem['sample']) => {
    if (sample) {
      return (
        <div style={{ flexGrow: 1 }}>
          <EuiSpacer />
          <EuiCodeBlock paddingSize="s" language="tsx" isCopyable>
            {sample}
          </EuiCodeBlock>
        </div>
      );
    }
  };

  const columns: EuiBasicTableProps<BasicItem>['columns'] = [
    {
      field: 'prop',
      name: 'Prop',
      width: '34%',
      valign: 'top',
      textOnly: false,
      render: (prop: ReactNode, item) => (
        <div>
          {renderProp(item)}
          {renderPropDescription(item)}
          {/* {renderSample(item.sample)} */}
        </div>
      ),
      mobileOptions: {
        header: false, // Won't show inline header in mobile view
        width: '100%', // Applies a specific width
      },
    },
  ];

  columns.push({
    field: 'sample',
    name: 'Sample snippet',
    align: 'left',
    valign: 'top',
    render: (sample: ReactNode) => renderSample(sample),
    mobileOptions: {
      header: false, // Won't show inline header in mobile view
      width: '100%', // Applies a specific width
    },
  });

  return (
    <EuiBasicTable
      css={css`
        margin-bottom: ${euiTheme.size.xxxl};
      `}
      items={items}
      columns={columns}
    />
  );
};
