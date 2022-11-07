import React, { useState, useMemo } from 'react';

import {
  EuiButtonGroup,
  EuiSpacer,
  EuiFormRow,
  EuiPopover,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPopoverTitle,
  EuiFormLabel,
} from '../../../../../src/components';

import DataGridStyle from './_grid';

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
  const [isToolbarPopoverOpen, setIsToolbarPopoverOpen] = useState(false);
  const [showSortSelector, setShowSortSelector] = useState(true);
  const [showDisplaySelector, setShowDisplaySelector] = useState(true);
  const [allowDensity, setAllowDensity] = useState(true);
  const [allowRowHeight, setAllowRowHeight] = useState(true);
  const [showColumnSelector, setShowColumnSelector] = useState(true);
  const [allowHideColumns, setAllowHideColumns] = useState(true);
  const [allowOrderingColumns, setAllowOrderingColumns] = useState(true);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(true);
  const [showFullScreenSelector, setShowFullScreenSelector] = useState(true);
  const [toolbarType, setToolbarType] = useState('true');

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

  const onShowKeyboardShortcutsChange = (optionId) => {
    setShowKeyboardShortcuts(optionId === 'true');
  };

  const onShowFullScreenSelectorChange = (optionId) => {
    setShowFullScreenSelector(optionId === 'true');
  };

  const onShowToolbarChange = (optionId) => {
    setToolbarType(optionId);
  };

  const onToolbarPopoverButtonClick = () => {
    setIsToolbarPopoverOpen((isOpen) => !isOpen);
  };

  const closeToolbarPopover = () => {
    setIsToolbarPopoverOpen(false);
  };

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
                    {createItem('Allow ordering', {
                      idSelected: allowOrderingColumns.toString(),
                      onChange: onAllowOrderingColumnsChange,
                    })}
                  </li>
                  <li>
                    {createItem('Allow hiding', {
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
                {createItem('Show keyboard shortcuts', {
                  idSelected: showKeyboardShortcuts.toString(),
                  onChange: onShowKeyboardShortcutsChange,
                })}
              </li>

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

      <EuiSpacer />

      <DataGridStyle
        toolbarType={toolbarType}
        showColumnSelector={showColumnSelector}
        showSortSelector={showSortSelector}
        showDisplaySelector={showDisplaySelector}
        showKeyboardShortcuts={showKeyboardShortcuts}
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
