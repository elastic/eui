import React, { useState, useMemo } from 'react';

import {
  EuiButtonGroup,
  EuiSpacer,
  EuiFormRow,
  EuiPopover,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiCallOut,
  EuiPopoverTitle,
  EuiFormLabel,
} from '../../../../../src/components';

import DataGridStyle from './styling_grid';

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

const showToolbarOptions = [
  {
    id: 'true',
    label: 'True',
  },
  {
    id: 'false',
    label: 'False',
  },
  {
    id: 'object',
    label: 'Object',
  },
];

const toolbarBooleanOptions = [
  {
    id: 'true',
    label: 'True',
  },
  {
    id: 'false',
    label: 'False',
  },
];

const DataGrid = () => {
  const [borderSelected, setBorderSelected] = useState('none');
  const [fontSizeSelected, setFontSizeSelected] = useState('s');
  const [cellPaddingSelected, setCellPaddingSelected] = useState('s');
  const [stripesSelected, setStripesSelected] = useState(true);
  const [rowHoverSelected, setRowHoverSelected] = useState('highlight');
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
  const [toolbarType, setToolbarType] = useState('true');

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
    setToolbarType(optionId);
  };

  const onPopoverButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const onToolbarPopoverButtonClick = () => {
    setIsToolbarPopoverOpen((isOpen) => !isOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const closeToolbarPopover = () => {
    setIsToolbarPopoverOpen(false);
  };

  const styleButton = (
    <EuiButton
      iconType="gear"
      iconSide="right"
      size="s"
      onClick={onPopoverButtonClick}
    >
      Style options
    </EuiButton>
  );

  const toolbarButton = (
    <EuiButton
      iconType="gear"
      iconSide="right"
      size="s"
      onClick={onToolbarPopoverButtonClick}
    >
      Toolbar options
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

  const createItem = (name, buttonProps = {}) => {
    return (
      <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
        <EuiFlexItem>
          <EuiFormLabel>{name}</EuiFormLabel>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonGroup
            buttonSize="compressed"
            legend={name}
            options={toolbarBooleanOptions}
            {...buttonProps}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  };

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
            <div style={{ width: 300 }}>
              <EuiPopoverTitle
                style={
                  toolbarType !== 'object'
                    ? {
                        border: 'none',
                        marginBottom: -16,
                      }
                    : undefined
                }
              >
                <EuiFormRow display="rowCompressed" label="toolbarVisibility">
                  <EuiButtonGroup
                    isFullWidth
                    buttonSize="compressed"
                    legend="toolbarVisibility type"
                    options={showToolbarOptions}
                    idSelected={toolbarType}
                    onChange={onShowToolbarChange}
                  />
                </EuiFormRow>
              </EuiPopoverTitle>
              {toolbarType === 'object' && (
                <ul>
                  <li>
                    {createItem('Show column selector', {
                      idSelected: toggleColumnSelector.toString(),
                      onChange: onShowColumnSelectorChange,
                    })}
                  </li>
                  {toggleColumnSelector && (
                    <ul style={{ marginLeft: 32 }}>
                      <li>
                        {createItem('Allow hiding', {
                          idSelected: allowOrderingColumns.toString(),
                          onChange: onAllowOrderingColumnsChange,
                        })}
                      </li>
                      <li>
                        {createItem('Allow ordering', {
                          idSelected: allowHideColumns.toString(),
                          onChange: onAllowHideColumnsChange,
                        })}
                      </li>
                    </ul>
                  )}

                  <li>
                    {createItem('Show sort selector', {
                      idSelected: showSortSelector.toString(),
                      onChange: onShowSortSelectorChange,
                    })}
                  </li>

                  <li>
                    {createItem('Show display selector', {
                      idSelected: toggleDisplaySelector ? 'true' : 'false',
                      onChange: onShowDisplaySelectorChange,
                    })}
                  </li>
                  {toggleDisplaySelector && (
                    <ul style={{ marginLeft: 32 }}>
                      <li>
                        {createItem('Show density', {
                          idSelected: allowDensity.toString(),
                          onChange: onAllowDensityChange,
                        })}
                      </li>
                      <li>
                        {createItem('Show row height', {
                          idSelected: allowRowHeight.toString(),
                          onChange: onAllowRowHeightChange,
                        })}
                      </li>
                    </ul>
                  )}

                  <li>
                    {createItem('Show full screen', {
                      idSelected: showFullScreenSelector.toString(),
                      onChange: onShowFullScreenSelectorChange,
                    })}
                  </li>
                </ul>
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

      <DataGridStyle
        border={borderSelected}
        fontSize={fontSizeSelected}
        cellPadding={cellPaddingSelected}
        stripes={stripesSelected}
        rowHover={rowHoverSelected}
        header={headerSelected}
        footer={footerSelected}
        toolbarType={toolbarType}
        showColumnSelector={showColumnSelector}
        showSortSelector={showSortSelector}
        showDisplaySelector={showDisplaySelector}
        showFullScreenSelector={showFullScreenSelector}
        allowDensity={allowDensity}
        allowRowHeight={allowRowHeight}
        allowHideColumns={allowHideColumns}
        allowOrderingColumns={allowOrderingColumns}
      />
    </div>
  );
};
export default DataGrid;
