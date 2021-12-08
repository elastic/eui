import React, { useState, Fragment, useCallback, useMemo } from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiButtonGroup,
  EuiSpacer,
  EuiFormRow,
  EuiPopover,
  EuiButton,
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiCallOut,
} from '../../../../src/components/';

const columns = [
  {
    id: 'avatar',
    initialWidth: 40,
  },
  {
    id: 'name',
  },
  {
    id: 'email',
  },
  {
    id: 'city',
  },
  {
    id: 'country',
  },
  {
    id: 'account',
  },
];

const data = [];

for (let i = 1; i < 6; i++) {
  data.push({
    avatar: (
      <EuiAvatar
        size="s"
        name={fake('{{name.lastName}}, {{name.firstName}}')}
      />
    ),
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    email: fake('{{internet.email}}'),
    city: fake('{{address.city}}'),
    country: fake('{{address.country}}'),
    account: fake('{{finance.account}}'),
  });
}

const footerCellValues = {
  avatar: '5 accounts',
};

const renderFooterCellValue = ({ columnId }) =>
  footerCellValues[columnId] || null;

const DataGrid = () => {
  const borderOptions = [
    {
      id: 'all',
      label: 'All',
    },
    {
      id: 'horizontal',
      label: 'Horizontal only',
    },
    {
      id: 'none',
      label: 'None',
    },
  ];

  const fontSizeOptions = [
    {
      id: 's',
      label: 'Small',
    },
    {
      id: 'm',
      label: 'Medium',
    },
    {
      id: 'l',
      label: 'Large',
    },
  ];

  const cellPaddingOptions = [
    {
      id: 's',
      label: 'Small',
    },
    {
      id: 'm',
      label: 'Medium',
    },
    {
      id: 'l',
      label: 'Large',
    },
  ];

  const stripeOptions = [
    {
      id: 'true',
      label: 'Stripes on',
    },
    {
      id: 'false',
      label: 'Stripes off',
    },
  ];

  const rowHoverOptions = [
    {
      id: 'none',
      label: 'None',
    },
    {
      id: 'highlight',
      label: 'Highlight',
    },
  ];

  const headerOptions = [
    {
      id: 'shade',
      label: 'Shade',
    },
    {
      id: 'underline',
      label: 'Underline',
    },
  ];

  const footerOptions = [
    {
      id: 'shade',
      label: 'Shade',
    },
    {
      id: 'overline',
      label: 'Overline',
    },
    {
      id: 'striped',
      label: 'Striped',
    },
  ];

  const showColumnSelectorOptions = [
    {
      id: 'true',
      label: 'True',
    },
    {
      id: 'false',
      label: 'False',
    },
  ];
  const allowHideColumnsOptions = [
    {
      id: 'true',
      label: 'True',
    },
    {
      id: 'false',
      label: 'False',
    },
  ];
  const allowOrderingColumnsOptions = [
    {
      id: 'true',
      label: 'True',
    },
    {
      id: 'false',
      label: 'False',
    },
  ];

  const showSortSelectorOptions = [
    {
      id: 'true',
      label: 'True',
    },
    {
      id: 'false',
      label: 'False',
    },
  ];

  const showDisplaySelectorOptions = [
    {
      id: 'true',
      label: 'True',
    },
    {
      id: 'false',
      label: 'False',
    },
  ];

  const allowDensityOptions = [
    {
      id: 'true',
      label: 'True',
    },
    {
      id: 'false',
      label: 'False',
    },
  ];
  const allowRowHeightOptions = [
    {
      id: 'true',
      label: 'True',
    },
    {
      id: 'false',
      label: 'False',
    },
  ];

  const showFullScreenSelectorOptions = [
    {
      id: 'true',
      label: 'True',
    },
    {
      id: 'false',
      label: 'False',
    },
  ];

  const showToolbarOptions = [
    {
      id: 'true',
      label: 'True',
    },
    {
      id: 'false',
      label: 'False',
    },
  ];

  const toolbarPropTypeIsBooleanOptions = [
    {
      id: 'true',
      label: 'Boolean',
    },
    {
      id: 'false',
      label: 'Object',
    },
  ];
  const [borderSelected, setBorderSelected] = useState('none');
  const [fontSizeSelected, setFontSizeSelected] = useState('s');
  const [cellPaddingSelected, setCellPaddingSelected] = useState('s');
  const [stripesSelected, setStripesSelected] = useState(true);
  const [rowHoverSelected, setRowHoverSelected] = useState('none');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isToolbarPopoverOpen, setIsToolbarPopoverOpen] = useState(false);
  const [headerSelected, setHeaderSelected] = useState('underline');
  const [footerSelected, setFooterSelected] = useState('overline');
  const [showSortSelector, setShowSortSelector] = useState(true);
  const [showDisplaySelector, setShowDisplaySelector] = useState(true);
  const [allowDensity, setAllowDensity] = useState(true);
  const [allowRowHeight, setAllowRowHeight] = useState(true);
  const [showColumnSelector, setShowColumnSelector] = useState(true);
  const [allowHideColumns, setAllowHideColumns] = useState(true);
  const [allowOrderingColumns, setAllowOrderingColumns] = useState(true);
  const [showFullScreenSelector, setShowFullScreenSelector] = useState(true);
  const [showToolbar, setShowToolbar] = useState(true);
  const [toolbarPropTypeIsBoolean, setToolbarPropTypeIsBoolean] = useState(
    true
  );
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const onBorderChange = (optionId) => {
    setBorderSelected(optionId);
  };

  const onFontSizeChange = (optionId) => {
    setFontSizeSelected(optionId);
  };

  const onCellPaddingChange = (optionId) => {
    setCellPaddingSelected(optionId);
  };

  const onStripesChange = (optionId) => {
    setStripesSelected(optionId === 'true');
  };

  const onRowHoverChange = (optionId) => {
    setRowHoverSelected(optionId);
  };

  const onHeaderChange = (optionId) => {
    setHeaderSelected(optionId);
  };

  const onFooterChange = (optionId) => {
    setFooterSelected(optionId);
  };

  const onShowColumnSelectorChange = (optionId) => {
    setShowColumnSelector(optionId === 'true');
  };
  const onAllowHideColumnsChange = (optionId) => {
    setAllowHideColumns(optionId === 'true');
  };
  const onAllowOrderingColumnsChange = (optionId) => {
    setAllowOrderingColumns(optionId === 'true');
  };

  const onShowSortSelectorChange = (optionId) => {
    setShowSortSelector(optionId === 'true');
  };

  const onShowDisplaySelectorChange = (optionId) => {
    setShowDisplaySelector(optionId === 'true');
  };
  const onAllowDensityChange = (optionId) => {
    setAllowDensity(optionId === 'true');
  };
  const onAllowRowHeightChange = (optionId) => {
    setAllowRowHeight(optionId === 'true');
  };

  const onShowFullScreenSelectorChange = (optionId) => {
    setShowFullScreenSelector(optionId === 'true');
  };

  const onShowToolbarChange = (optionId) => {
    setShowToolbar(optionId === 'true');
  };

  const onToolbarPropTypeIsBooleanChange = (optionId) => {
    setToolbarPropTypeIsBoolean(optionId === 'true');
  };

  const onPopoverButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const onToolbarPopoverButtonClick = () => {
    setIsToolbarPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const closeToolbarPopover = () => {
    setIsToolbarPopoverOpen(false);
  };

  const setPageIndex = useCallback(
    (pageIndex) => {
      setPagination({ ...pagination, pageIndex });
    },
    [pagination, setPagination]
  );

  const setPageSize = useCallback(
    (pageSize) => {
      setPagination({ ...pagination, pageSize, pageIndex: 0 });
    },
    [pagination, setPagination]
  );

  const handleVisibleColumns = (visibleColumns) =>
    setVisibleColumns(visibleColumns);

  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    (sortingColumns) => setSortingColumns(sortingColumns),
    [setSortingColumns]
  );

  const styleButton = (
    <EuiButton
      iconType="gear"
      iconSide="right"
      size="s"
      onClick={onPopoverButtonClick}
    >
      gridStyle options
    </EuiButton>
  );

  const toolbarButton = (
    <EuiButton
      iconType="gear"
      iconSide="right"
      size="s"
      onClick={onToolbarPopoverButtonClick}
    >
      toolbarVisibility options
    </EuiButton>
  );

  const toggleColumnSelector = useMemo(() => {
    if (
      showColumnSelector === true &&
      (allowHideColumns === false || allowOrderingColumns === false)
    ) {
      return {
        allowHide: allowHideColumns,
        allowReorder: allowOrderingColumns,
      };
    } else {
      return showColumnSelector;
    }
  }, [showColumnSelector, allowHideColumns, allowOrderingColumns]);

  const toggleDisplaySelector = useMemo(() => {
    if (
      showDisplaySelector === true &&
      (allowDensity === false || allowRowHeight === false)
    ) {
      return { allowDensity, allowRowHeight };
    } else {
      return showDisplaySelector;
    }
  }, [showDisplaySelector, allowDensity, allowRowHeight]);

  const toolbarVisibilityOptions = {
    showColumnSelector: toggleColumnSelector,
    showDisplaySelector: toggleDisplaySelector,
    showSortSelector: showSortSelector,
    showFullScreenSelector: showFullScreenSelector,
  };

  let toolbarConfig;

  if (toolbarPropTypeIsBoolean) {
    toolbarConfig = showToolbar;
  } else {
    toolbarConfig = toolbarVisibilityOptions;
  }

  return (
    <div>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem grow={false}>
          <EuiPopover
            id="styleButton"
            button={styleButton}
            isOpen={isPopoverOpen}
            anchorPosition="rightUp"
            closePopover={closePopover}
          >
            <div style={{ width: 380 }}>
              <EuiFormRow label="Border" display="columnCompressed">
                <EuiButtonGroup
                  isFullWidth
                  buttonSize="compressed"
                  legend="Border"
                  options={borderOptions}
                  idSelected={borderSelected}
                  onChange={onBorderChange}
                />
              </EuiFormRow>

              <EuiFormRow label="Cell padding" display="columnCompressed">
                <EuiButtonGroup
                  isFullWidth
                  buttonSize="compressed"
                  legend="Cell padding"
                  options={cellPaddingOptions}
                  idSelected={cellPaddingSelected}
                  onChange={onCellPaddingChange}
                />
              </EuiFormRow>

              <EuiFormRow label="Font size" display="columnCompressed">
                <EuiButtonGroup
                  isFullWidth
                  buttonSize="compressed"
                  legend="Font size"
                  options={fontSizeOptions}
                  idSelected={fontSizeSelected}
                  onChange={onFontSizeChange}
                />
              </EuiFormRow>

              <EuiFormRow label="Stripes" display="columnCompressed">
                <EuiButtonGroup
                  isFullWidth
                  buttonSize="compressed"
                  legend="Stripes"
                  options={stripeOptions}
                  idSelected={stripesSelected.toString()}
                  onChange={onStripesChange}
                />
              </EuiFormRow>

              <EuiFormRow label="Hover row" display="columnCompressed">
                <EuiButtonGroup
                  isFullWidth
                  buttonSize="compressed"
                  legend="Hover row"
                  options={rowHoverOptions}
                  idSelected={rowHoverSelected}
                  onChange={onRowHoverChange}
                />
              </EuiFormRow>

              <EuiFormRow label="Header" display="columnCompressed">
                <EuiButtonGroup
                  isFullWidth
                  buttonSize="compressed"
                  legend="Header"
                  options={headerOptions}
                  idSelected={headerSelected}
                  onChange={onHeaderChange}
                />
              </EuiFormRow>

              <EuiFormRow label="Footer" display="columnCompressed">
                <EuiButtonGroup
                  isFullWidth
                  buttonSize="compressed"
                  legend="Footer"
                  options={footerOptions}
                  idSelected={footerSelected}
                  onChange={onFooterChange}
                />
              </EuiFormRow>
            </div>
          </EuiPopover>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiPopover
            id="toolbarVisibility"
            button={toolbarButton}
            isOpen={isToolbarPopoverOpen}
            anchorPosition="rightUp"
            closePopover={closeToolbarPopover}
          >
            <div style={{ width: 400 }}>
              <EuiFormRow
                display="columnCompressed"
                label="toolbarVisibility prop"
              >
                <EuiButtonGroup
                  isFullWidth
                  buttonSize="compressed"
                  legend="toolbarVisibility type"
                  options={toolbarPropTypeIsBooleanOptions}
                  idSelected={toolbarPropTypeIsBoolean.toString()}
                  onChange={onToolbarPropTypeIsBooleanChange}
                />
              </EuiFormRow>
              {toolbarPropTypeIsBoolean === false ? (
                <Fragment>
                  <EuiFormRow
                    display="columnCompressed"
                    label="Show column selector"
                  >
                    <EuiButtonGroup
                      isFullWidth
                      buttonSize="compressed"
                      legend="Column options"
                      options={showColumnSelectorOptions}
                      idSelected={toggleColumnSelector ? 'true' : 'false'}
                      onChange={onShowColumnSelectorChange}
                    />
                  </EuiFormRow>
                  {toggleColumnSelector && (
                    <>
                      <EuiFormRow
                        display="columnCompressed"
                        label="Allow hiding columns"
                        style={{ marginLeft: 32 }}
                      >
                        <EuiButtonGroup
                          isFullWidth
                          buttonSize="compressed"
                          legend="Column hiding options"
                          options={allowHideColumnsOptions}
                          idSelected={allowHideColumns.toString()}
                          onChange={onAllowHideColumnsChange}
                        />
                      </EuiFormRow>
                      <EuiFormRow
                        display="columnCompressed"
                        label="Allow ordering columns"
                        style={{ marginLeft: 32 }}
                      >
                        <EuiButtonGroup
                          isFullWidth
                          buttonSize="compressed"
                          legend="Column ordering options"
                          options={allowOrderingColumnsOptions}
                          idSelected={allowOrderingColumns.toString()}
                          onChange={onAllowOrderingColumnsChange}
                        />
                      </EuiFormRow>
                    </>
                  )}

                  <EuiFormRow
                    display="columnCompressed"
                    label="Show sort selector"
                  >
                    <EuiButtonGroup
                      isFullWidth
                      buttonSize="compressed"
                      legend="Sort options"
                      options={showSortSelectorOptions}
                      idSelected={showSortSelector.toString()}
                      onChange={onShowSortSelectorChange}
                    />
                  </EuiFormRow>

                  <EuiFormRow
                    display="columnCompressed"
                    label="Show display selector"
                  >
                    <EuiButtonGroup
                      isFullWidth
                      buttonSize="compressed"
                      legend="Display options"
                      options={showDisplaySelectorOptions}
                      idSelected={toggleDisplaySelector ? 'true' : 'false'}
                      onChange={onShowDisplaySelectorChange}
                    />
                  </EuiFormRow>
                  {toggleDisplaySelector && (
                    <>
                      <EuiFormRow
                        display="columnCompressed"
                        label="Allow density"
                        style={{ marginLeft: 32 }}
                      >
                        <EuiButtonGroup
                          isFullWidth
                          buttonSize="compressed"
                          legend="Density options"
                          options={allowDensityOptions}
                          idSelected={allowDensity.toString()}
                          onChange={onAllowDensityChange}
                        />
                      </EuiFormRow>
                      <EuiFormRow
                        display="columnCompressed"
                        label="Allow row height"
                        style={{ marginLeft: 32 }}
                      >
                        <EuiButtonGroup
                          isFullWidth
                          buttonSize="compressed"
                          legend="Row height options"
                          options={allowRowHeightOptions}
                          idSelected={allowRowHeight.toString()}
                          onChange={onAllowRowHeightChange}
                        />
                      </EuiFormRow>
                    </>
                  )}

                  <EuiFormRow
                    display="columnCompressed"
                    label="Show full screen selector"
                  >
                    <EuiButtonGroup
                      isFullWidth
                      buttonSize="compressed"
                      legend="Full screen options"
                      options={showFullScreenSelectorOptions}
                      idSelected={showFullScreenSelector.toString()}
                      onChange={onShowFullScreenSelectorChange}
                    />
                  </EuiFormRow>
                </Fragment>
              ) : (
                <EuiFormRow display="columnCompressed" label="Show toolbar">
                  <EuiButtonGroup
                    isFullWidth
                    buttonSize="compressed"
                    legend="toolbarVisibility flag"
                    options={showToolbarOptions}
                    idSelected={showToolbar.toString()}
                    onChange={onShowToolbarChange}
                  />
                </EuiFormRow>
              )}
            </div>
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>

      {footerSelected === 'striped' ? (
        <>
          <EuiSpacer />

          <EuiCallOut
            size="s"
            title="A striped footer will be shaded depending on whether it is an even or an odd row considering the rest of the rows in the datagrid. Needs to be used with stripes={true}."
          />
        </>
      ) : null}

      <EuiSpacer />

      <EuiDataGrid
        aria-label="Top EUI contributors"
        columns={columns}
        columnVisibility={{
          visibleColumns: visibleColumns,
          setVisibleColumns: handleVisibleColumns,
        }}
        sorting={{ columns: sortingColumns, onSort }}
        rowCount={data.length}
        gridStyle={{
          border: borderSelected,
          fontSize: fontSizeSelected,
          cellPadding: cellPaddingSelected,
          stripes: stripesSelected,
          rowHover: rowHoverSelected,
          header: headerSelected,
          footer: footerSelected,
        }}
        toolbarVisibility={toolbarConfig}
        renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
        renderFooterCellValue={renderFooterCellValue}
        pagination={{
          ...pagination,
          pageSizeOptions: [5, 10, 25],
          onChangeItemsPerPage: setPageSize,
          onChangePage: setPageIndex,
        }}
      />
    </div>
  );
};
export default DataGrid;
