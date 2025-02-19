import React, { useState, useCallback, useMemo } from 'react';
import { css } from '@emotion/react';
import {
  EuiDataGrid,
  EuiAvatar,
  EuiDataGridStyle,
  useEuiTheme,
} from '@elastic/eui';
import { faker } from '@faker-js/faker';

import {
  ConfigurationDemoWithSnippet,
  objectConfigToSnippet,
} from './_grid_configuration_wrapper';

const data = Array.from({ length: 5 }).map((_) => ({
  avatar: (
    <EuiAvatar
      size="s"
      name={`${faker.person.lastName()}, ${faker.person.firstName()}`}
    />
  ),
  name: `${faker.person.lastName()}, ${faker.person.firstName()} ${faker.person.suffix()}`,
  account: faker.finance.accountNumber(),
}));

const footerCellValues = {
  account: '5 accounts',
};

const renderFooterCellValue = ({ columnId }) =>
  footerCellValues[columnId] || null;

const columns = [
  { id: 'avatar', initialWidth: 40 },
  { id: 'name' },
  { id: 'account', schema: 'numeric' },
];

const borderOptions = [
  { id: 'all', label: 'All' },
  { id: 'horizontal', label: 'Horizontal only' },
  { id: 'none', label: 'None' },
];

const fontSizeOptions = [
  { id: 's', label: 'Small' },
  { id: 'm', label: 'Medium' },
  { id: 'l', label: 'Large' },
];

const cellPaddingOptions = [
  { id: 's', label: 'Small' },
  { id: 'm', label: 'Medium' },
  { id: 'l', label: 'Large' },
];

const stripeOptions = [
  { id: 'true', label: 'True' },
  { id: 'false', label: 'False' },
];

const rowHoverOptions = [
  { id: 'none', label: 'None' },
  { id: 'highlight', label: 'Highlight' },
];

const headerOptions = [
  { id: 'shade', label: 'Shade' },
  { id: 'underline', label: 'Underline' },
];

export default () => {
  const { euiTheme } = useEuiTheme();
  const [borderSelected, setBorderSelected] = useState('none');
  const [fontSizeSelected, setFontSizeSelected] = useState('m');
  const [cellPaddingSelected, setCellPaddingSelected] = useState('m');
  const [stripesSelected, setStripesSelected] = useState('true');
  const [rowHoverSelected, setRowHoverSelected] = useState('highlight');
  const [headerSelected, setHeaderSelected] = useState('underline');
  const [footerSelected, setFooterSelected] = useState('overline');

  const [gridStyle, snippet] = useMemo(() => {
    const gridStyle = {
      border: borderSelected,
      fontSize: fontSizeSelected,
      cellPadding: cellPaddingSelected,
      stripes: stripesSelected === 'true',
      rowHover: rowHoverSelected,
      header: headerSelected,
      footer: footerSelected,
    } as EuiDataGridStyle;

    const snippet = `const gridStyle = ${objectConfigToSnippet(gridStyle)};
    <EuiDataGrid {...rest} gridStyle={gridStyle} />`;

    return [gridStyle, snippet];
  }, [
    borderSelected,
    fontSizeSelected,
    cellPaddingSelected,
    stripesSelected,
    rowHoverSelected,
    headerSelected,
    footerSelected,
  ]);

  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );
  const handleVisibleColumns = (visibleColumns) =>
    setVisibleColumns(visibleColumns);

  const [pagination, setPagination] = useState({ pageIndex: 0 });
  const setPageIndex = useCallback((pageIndex) => {
    setPagination((pagination) => ({ ...pagination, pageIndex }));
  }, []);
  const setPageSize = useCallback((pageSize) => {
    setPagination((pagination) => ({
      ...pagination,
      pageSize,
      pageIndex: 0,
    }));
  }, []);

  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    (sortingColumns) => setSortingColumns(sortingColumns),
    [setSortingColumns]
  );

  return (
    <ConfigurationDemoWithSnippet
      snippet={snippet}
      configuration={[
        {
          label: 'Border',
          options: borderOptions,
          idSelected: borderSelected,
          onChange: setBorderSelected,
        },
        {
          label: 'Stripes',
          options: stripeOptions,
          idSelected: stripesSelected,
          onChange: setStripesSelected,
        },
        {
          label: 'Hover row',
          options: rowHoverOptions,
          idSelected: rowHoverSelected,
          onChange: setRowHoverSelected,
        },
        {
          label: 'Header',
          options: headerOptions,
          idSelected: headerSelected,
          onChange: setHeaderSelected,
        },
        {
          label: 'Cell padding',
          options: cellPaddingOptions,
          idSelected: cellPaddingSelected,
          onChange: setCellPaddingSelected,
        },
        {
          label: 'Font size',
          options: fontSizeOptions,
          idSelected: fontSizeSelected,
          onChange: setFontSizeSelected,
        },
        {
          label: 'Footer',
          options: [
            { id: 'shade', label: 'Shade' },
            { id: 'overline', label: 'Overline' },
            {
              id: 'striped',
              label: 'Striped',
              isDisabled: stripesSelected === 'false',
              toolTipContent:
                'A striped footer will be shaded depending on whether it is an even or an odd row considering the rest of the rows in the datagrid. Needs to be used with stripes={true}.',
              toolTipProps: { position: 'bottom' },
            },
          ],
          idSelected: footerSelected,
          onChange: setFooterSelected,
        },
      ]}
      wrapperProps={{
        css: css`
          .configurationAndDemo {
            display: flex;
            flex-wrap: wrap;
            gap: ${euiTheme.size.base};
          }

          .configuration {
            flex: 0 0 350px;

            .euiFormRow__labelWrapper {
              flex-basis: 10ch !important;
            }

            .euiFormRow__fieldWrapper {
              flex-grow: 1;
            }

            @media (max-width: ${euiTheme.breakpoint.s}px) {
              flex: 1 1 100%;

              .euiFormRow {
                max-inline-size: 100%;
                inline-size: 100%;
              }
            }
          }

          .demo {
            flex: 1 0 auto;
            min-inline-size: 0;
          }
        `,
      }}
    >
      <EuiDataGrid
        aria-label="Data grid with custom gridStyle set"
        columns={columns}
        columnVisibility={{
          visibleColumns: visibleColumns,
          setVisibleColumns: handleVisibleColumns,
        }}
        sorting={{ columns: sortingColumns, onSort }}
        pagination={{
          ...pagination,
          onChangeItemsPerPage: setPageSize,
          onChangePage: setPageIndex,
        }}
        renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
        renderFooterCellValue={renderFooterCellValue}
        rowCount={data.length}
        height="auto"
        gridStyle={gridStyle}
      />
    </ConfigurationDemoWithSnippet>
  );
};
