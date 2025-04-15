import React, { useState, useCallback, useMemo } from 'react';
import {
  EuiDataGrid,
  EuiAvatar,
  EuiFormRow,
  EuiRange,
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

const columns = [
  { id: 'avatar', initialWidth: 40 },
  { id: 'name' },
  { id: 'account', schema: 'numeric' },
];

const toolbarBooleanOptions = [
  { id: 'true', label: 'True' },
  { id: 'false', label: 'False' },
];
const toolbarBooleanOrObjectOptions = [
  { id: 'true', label: 'True' },
  { id: 'false', label: 'False' },
  { id: 'object', label: 'Object' },
];

export default () => {
  const { euiTheme } = useEuiTheme();
  const [showSortSelector, setShowSortSelector] = useState('true');
  const [showDisplaySelector, setShowDisplaySelector] = useState('true');
  const [allowDensity, setAllowDensity] = useState('true');
  const [allowRowHeight, setAllowRowHeight] = useState('true');
  const [allowResetButton, setAllowResetButton] = useState('true');
  const [additionalDisplaySettings, setAdditionalDisplaySettings] =
    useState('false');
  const [showColumnSelector, setShowColumnSelector] = useState('true');
  const [allowHideColumns, setAllowHideColumns] = useState('true');
  const [allowOrderingColumns, setAllowOrderingColumns] = useState('true');
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState('true');
  const [showFullScreenSelector, setShowFullScreenSelector] = useState('true');
  const [toolbarType, setToolbarType] = useState('true');

  const [configuration, toolbarVisibility, snippet] = useMemo(() => {
    const getConfiguration = () => {
      const toolbarVisibility = {
        label: 'Toolbar visibility',
        options: toolbarBooleanOrObjectOptions,
        idSelected: toolbarType,
        onChange: setToolbarType,
      };
      if (toolbarType !== 'object') return [toolbarVisibility];

      return [
        toolbarVisibility,
        {
          label: 'Show column selector',
          options: toolbarBooleanOrObjectOptions,
          idSelected: showColumnSelector,
          onChange: setShowColumnSelector,
          nestedConfig:
            showColumnSelector === 'object'
              ? [
                  {
                    label: 'Allow ordering',
                    options: toolbarBooleanOptions,
                    idSelected: allowOrderingColumns,
                    onChange: setAllowOrderingColumns,
                  },
                  {
                    label: 'Allow hiding',
                    options: toolbarBooleanOptions,
                    idSelected: allowHideColumns,
                    onChange: setAllowHideColumns,
                  },
                ]
              : undefined,
        },
        {
          label: 'Show sort selector',
          options: toolbarBooleanOptions,
          idSelected: showSortSelector,
          onChange: setShowSortSelector,
        },
        {
          label: 'Show display selector',
          options: toolbarBooleanOrObjectOptions,
          idSelected: showDisplaySelector,
          onChange: setShowDisplaySelector,
          nestedConfig:
            showDisplaySelector === 'object'
              ? [
                  {
                    label: 'Show density',
                    options: toolbarBooleanOptions,
                    idSelected: allowDensity,
                    onChange: setAllowDensity,
                  },
                  {
                    label: 'Show row height',
                    options: toolbarBooleanOptions,
                    idSelected: allowRowHeight,
                    onChange: setAllowRowHeight,
                  },
                  {
                    label: 'Show reset button',
                    options: toolbarBooleanOptions,
                    idSelected: allowResetButton,
                    onChange: setAllowResetButton,
                  },
                  {
                    label: 'Additional display settings',
                    options: toolbarBooleanOptions,
                    idSelected: additionalDisplaySettings,
                    onChange: setAdditionalDisplaySettings,
                  },
                ]
              : undefined,
        },
        {
          label: 'Show keyboard shortcuts',
          options: toolbarBooleanOptions,
          idSelected: showKeyboardShortcuts,
          onChange: setShowKeyboardShortcuts,
        },
        {
          label: 'Show fullscreen toggle',
          options: toolbarBooleanOptions,
          idSelected: showFullScreenSelector,
          onChange: setShowFullScreenSelector,
        },
      ];
    };

    const getToolbarVisibility = () => {
      if (toolbarType === 'true') return true;
      if (toolbarType === 'false') return false;
      return {
        showColumnSelector:
          showColumnSelector === 'object'
            ? {
                allowReorder: allowOrderingColumns === 'true',
                allowHide: allowHideColumns === 'true',
              }
            : showColumnSelector === 'true',
        showSortSelector: showSortSelector === 'true',
        showDisplaySelector:
          showDisplaySelector === 'object'
            ? {
                allowDensity: allowDensity === 'true',
                allowRowHeight: allowRowHeight === 'true',
                allowResetButton: allowResetButton === 'true',
                additionalDisplaySettings:
                  additionalDisplaySettings === 'true' ? (
                    <EuiFormRow
                      label="Random Sample Size"
                      display="columnCompressed"
                    >
                      <EuiRange
                        compressed
                        fullWidth
                        showInput
                        min={1}
                        max={100}
                        step={1}
                        value={10}
                        data-test-subj="randomSampleSize"
                      />
                    </EuiFormRow>
                  ) : undefined,
              }
            : showDisplaySelector === 'true',
        showKeyboardShortcuts: showKeyboardShortcuts === 'true',
        showFullScreenSelector: showFullScreenSelector === 'true',
      };
    };

    const getSnippet = () => {
      let snippet = toolbarType;

      if (toolbarType === 'object') {
        const objectConfig = getToolbarVisibility() as any;

        // Workaround for custom ReactNode
        if (
          showDisplaySelector === 'object' &&
          additionalDisplaySettings === 'true'
        ) {
          objectConfig.showDisplaySelector.additionalDisplaySettings = true;
        }

        snippet = objectConfigToSnippet(objectConfig).replace(
          'additionalDisplaySettings: true',
          'additionalDisplaySettings: <></>'
        );
      }

      return `const toolbarVisibility = ${snippet};

<EuiDataGrid {...rest} toolbarVisibility={toolbarVisibility} />`;
    };

    return [getConfiguration(), getToolbarVisibility(), getSnippet()];
  }, [
    toolbarType,
    showColumnSelector,
    allowOrderingColumns,
    allowHideColumns,
    showSortSelector,
    showDisplaySelector,
    allowDensity,
    allowRowHeight,
    allowResetButton,
    additionalDisplaySettings,
    showKeyboardShortcuts,
    showFullScreenSelector,
  ]);

  // Required data grid state
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
      configuration={configuration}
      wrapperProps={{
        css: {
          '.euiFormRow': { maxInlineSize: '100%' },
          '.configuration': { marginBlockEnd: euiTheme.size.base },
        },
      }}
    >
      <EuiDataGrid
        aria-label="Data grid with custom toolbarVisibility set"
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
        rowCount={data.length}
        height="auto"
        toolbarVisibility={toolbarVisibility}
      />
    </ConfigurationDemoWithSnippet>
  );
};
