/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import { logicalStyle, mathWithUnits } from '../../../global_styling';
import { useUpdateEffect, useEuiTheme } from '../../../services';
import { EuiI18n, useEuiI18n } from '../../i18n';
import { EuiPopover, EuiPopoverFooter } from '../../popover';
import { EuiButtonIcon, EuiButtonGroup, EuiButtonEmpty } from '../../button';
import { EuiFormRow, EuiRange, EuiRangeProps } from '../../form';
import { euiFormMaxWidth } from '../../form/form.styles';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiToolTip } from '../../tool_tip';

import {
  EuiDataGridToolBarVisibilityOptions,
  EuiDataGridStyle,
  EuiDataGridRowHeightsOptions,
} from '../data_grid_types';
import { getNestedObjectOptions } from './data_grid_toolbar';

export const startingStyles: EuiDataGridStyle = {
  cellPadding: 'm',
  fontSize: 'm',
  border: 'all',
  stripes: false,
  rowHover: 'highlight',
  header: 'shade',
  footer: 'overline',
  stickyFooter: true,
};

/**
 * Cell density
 */

const densityOptions: string[] = ['compact', 'normal', 'expanded'];
const densityStyles: { [key: string]: Partial<EuiDataGridStyle> } = {
  expanded: {
    fontSize: 'l',
    cellPadding: 'l',
  },
  normal: {
    fontSize: 'm',
    cellPadding: 'm',
  },
  compact: {
    fontSize: 's',
    cellPadding: 's',
  },
};
const convertGridStylesToSelection = (gridStyles: EuiDataGridStyle) => {
  if (gridStyles.fontSize === 's' && gridStyles.cellPadding === 's')
    return 'compact';
  if (gridStyles.fontSize === 'm' && gridStyles.cellPadding === 'm')
    return 'normal';
  if (gridStyles.fontSize === 'l' && gridStyles.cellPadding === 'l')
    return 'expanded';
  return '';
};
const DensityControl = ({
  gridStyles,
  onChange,
}: {
  gridStyles: EuiDataGridStyle;
  onChange: Function;
}) => {
  const getDensity = useMemo(() => {
    return convertGridStylesToSelection(gridStyles);
  }, [gridStyles]);

  const setDensity = useCallback(
    (density: string) => {
      onChange(densityStyles[density]);
    },
    [onChange]
  );

  return (
    <EuiI18n
      tokens={[
        'euiDisplaySelector.densityLabel',
        'euiDisplaySelector.labelCompact',
        'euiDisplaySelector.labelNormal',
        'euiDisplaySelector.labelExpanded',
      ]}
      defaults={['Density', 'Compact', 'Normal', 'Expanded']}
    >
      {([densityLabel, labelCompact, labelNormal, labelExpanded]: string[]) => (
        <EuiFormRow label={densityLabel} display="columnCompressed">
          <EuiButtonGroup
            legend={densityLabel}
            buttonSize="compressed"
            isFullWidth
            options={[
              {
                id: densityOptions[0],
                label: labelCompact,
              },
              {
                id: densityOptions[1],
                label: labelNormal,
              },
              {
                id: densityOptions[2],
                label: labelExpanded,
              },
            ]}
            onChange={setDensity}
            idSelected={getDensity}
            data-test-subj="densityButtonGroup"
          />
        </EuiFormRow>
      )}
    </EuiI18n>
  );
};

/**
 * Row heights
 */

const rowHeightButtonOptions: string[] = ['undefined', 'auto', 'lineCount'];
const convertRowHeightsOptionsToSelection = (
  rowHeightsOptions: EuiDataGridRowHeightsOptions
) => {
  const { defaultHeight } = rowHeightsOptions;

  if (defaultHeight === 'auto') {
    return rowHeightButtonOptions[1];
  }
  if (typeof defaultHeight === 'object' && defaultHeight?.lineCount) {
    return rowHeightButtonOptions[2];
  }
  if (
    typeof defaultHeight === 'number' ||
    (typeof defaultHeight === 'object' && defaultHeight.height)
  ) {
    return '';
  }
  return rowHeightButtonOptions[0];
};
const defaultLineCountValue = String(2);
const RowHeightControl = ({
  rowHeightsOptions,
  onChange,
}: {
  rowHeightsOptions: EuiDataGridRowHeightsOptions;
  onChange: Function;
}) => {
  const [lineCountInput, setLineCountInput] = useState(defaultLineCountValue);
  const setLineCountHeight = useCallback<
    NonNullable<EuiRangeProps['onChange']>
  >(
    (event) => {
      setLineCountInput(event.currentTarget.value);
      const newLineCount = Number(event.currentTarget.value);

      // Don't let users set a 0 or negative line count
      if (newLineCount > 0) {
        onChange({
          rowHeights: {}, // Unset all row-specific line counts
          defaultHeight: { lineCount: newLineCount },
        });
      }
    },
    [onChange]
  );

  useEffect(() => {
    setLineCountInput(
      // @ts-ignore - optional chaining operator handles types & cases that aren't lineCount
      rowHeightsOptions?.defaultHeight?.lineCount || defaultLineCountValue
    );
    // @ts-ignore - same as above
  }, [rowHeightsOptions?.defaultHeight?.lineCount]);

  const rowHeightSelection = useMemo(() => {
    return convertRowHeightsOptionsToSelection(rowHeightsOptions);
  }, [rowHeightsOptions]);

  const setRowHeight = useCallback(
    (option: string) => {
      const rowHeightsOptions: EuiDataGridRowHeightsOptions = {
        rowHeights: {}, // Unset all row-specific heights
      };

      if (option === 'auto') {
        rowHeightsOptions.defaultHeight = 'auto';
      } else if (option === 'lineCount') {
        rowHeightsOptions.defaultHeight = { lineCount: Number(lineCountInput) };
      } else {
        rowHeightsOptions.defaultHeight = undefined;
      }

      onChange(rowHeightsOptions);
    },
    [lineCountInput, onChange]
  );

  return (
    <EuiI18n
      tokens={[
        'euiDisplaySelector.rowHeightLabel',
        'euiDisplaySelector.labelSingle',
        'euiDisplaySelector.labelAuto',
        'euiDisplaySelector.labelCustom',
        'euiDisplaySelector.lineCountLabel',
      ]}
      defaults={['Row height', 'Single', 'Auto fit', 'Custom', 'Lines per row']}
    >
      {([
        rowHeightLabel,
        labelSingle,
        labelAuto,
        labelCustom,
        lineCountLabel,
      ]: string[]) => (
        <>
          <EuiFormRow label={rowHeightLabel} display="columnCompressed">
            <EuiButtonGroup
              legend={rowHeightLabel}
              buttonSize="compressed"
              isFullWidth
              options={[
                {
                  id: rowHeightButtonOptions[0],
                  label: labelSingle,
                },
                {
                  id: rowHeightButtonOptions[1],
                  label: labelAuto,
                },
                {
                  id: rowHeightButtonOptions[2],
                  label: labelCustom,
                },
              ]}
              onChange={setRowHeight}
              idSelected={rowHeightSelection}
              data-test-subj="rowHeightButtonGroup"
            />
          </EuiFormRow>
          {rowHeightSelection === rowHeightButtonOptions[2] && (
            <EuiFormRow label={lineCountLabel} display="columnCompressed">
              <EuiRange
                compressed
                fullWidth
                showInput
                min={1}
                max={20}
                step={1}
                required
                value={lineCountInput}
                onChange={setLineCountHeight}
                data-test-subj="lineCountNumber"
              />
            </EuiFormRow>
          )}
        </>
      )}
    </EuiI18n>
  );
};

/**
 * Display settings/selector popover
 */

export const useDataGridDisplaySelector = (
  showDisplaySelector: EuiDataGridToolBarVisibilityOptions['showDisplaySelector'],
  initialStyles: EuiDataGridStyle,
  initialRowHeightsOptions?: EuiDataGridRowHeightsOptions
): [ReactNode, EuiDataGridStyle, EuiDataGridRowHeightsOptions] => {
  const [isOpen, setIsOpen] = useState(false);

  const allowResetButton = getNestedObjectOptions(
    showDisplaySelector,
    'allowResetButton'
  );

  const additionalDisplaySettings =
    typeof showDisplaySelector === 'boolean'
      ? null
      : showDisplaySelector?.additionalDisplaySettings ?? null;

  // Track styles specified by the user at run time
  const [userGridStyles, setUserGridStyles] = useState({});
  const [userRowHeightsOptions, setUserRowHeightsOptions] = useState({});

  // Merge the developer-specified configurations with user overrides
  const gridStyles = useMemo(() => {
    return {
      ...initialStyles,
      ...userGridStyles,
    };
  }, [initialStyles, userGridStyles]);

  const rowHeightsOptions = useMemo(() => {
    return {
      ...initialRowHeightsOptions,
      ...userRowHeightsOptions,
    };
  }, [initialRowHeightsOptions, userRowHeightsOptions]);

  // Show a reset button whenever users manually change settings, and
  // invoke onChange callbacks (removing the callback value itself, so that only configuration values are returned)
  const [showResetButton, setShowResetButton] = useState(false);

  useUpdateEffect(() => {
    if (allowResetButton) {
      const hasUserChanges = Object.keys(userGridStyles).length > 0;
      if (hasUserChanges) setShowResetButton(true);
    }

    const { onChange, ...currentGridStyles } = gridStyles;
    initialStyles?.onChange?.(currentGridStyles);
  }, [userGridStyles, allowResetButton]);

  useUpdateEffect(() => {
    if (allowResetButton) {
      const hasUserChanges = Object.keys(userRowHeightsOptions).length > 0;
      if (hasUserChanges) setShowResetButton(true);
    }

    const { onChange, ...currentRowHeightsOptions } = rowHeightsOptions;
    initialRowHeightsOptions?.onChange?.(currentRowHeightsOptions);
  }, [userRowHeightsOptions, allowResetButton]);

  // Allow resetting to initial developer-specified configurations
  const resetToInitialState = useCallback(() => {
    setUserGridStyles({});
    setUserRowHeightsOptions({});
    setShowResetButton(false);
  }, []);

  const buttonLabel = useEuiI18n(
    'euiDisplaySelector.buttonText',
    'Display options'
  );
  const resetButtonLabel = useEuiI18n(
    'euiDisplaySelector.resetButtonText',
    'Reset to default'
  );

  const euiTheme = useEuiTheme();

  const densityControl = useMemo(() => {
    const show = getNestedObjectOptions(showDisplaySelector, 'allowDensity');
    return show ? (
      <DensityControl gridStyles={gridStyles} onChange={setUserGridStyles} />
    ) : null;
  }, [showDisplaySelector, gridStyles, setUserGridStyles]);

  const rowHeightControl = useMemo(() => {
    const show = getNestedObjectOptions(showDisplaySelector, 'allowRowHeight');
    return show ? (
      <RowHeightControl
        rowHeightsOptions={rowHeightsOptions}
        onChange={setUserRowHeightsOptions}
      />
    ) : null;
  }, [showDisplaySelector, rowHeightsOptions, setUserRowHeightsOptions]);

  const displaySelector = useMemo(() => {
    const paddingSize = 's';
    const formMaxWidth = euiFormMaxWidth(euiTheme);
    const popoverWidth = mathWithUnits(
      [formMaxWidth, euiTheme.euiTheme.size[paddingSize]],
      (x, y) => x + y * 2
    );

    return densityControl || rowHeightControl || additionalDisplaySettings ? (
      <EuiPopover
        data-test-subj="dataGridDisplaySelectorPopover"
        isOpen={isOpen}
        closePopover={() => setIsOpen(false)}
        anchorPosition="downRight"
        panelPaddingSize={paddingSize}
        panelProps={{ css: logicalStyle('width', popoverWidth) }}
        panelClassName="euiDataGrid__displayPopoverPanel"
        button={
          <EuiToolTip content={buttonLabel} delay="long">
            <EuiButtonIcon
              size="xs"
              iconType="controlsHorizontal"
              color="text"
              data-test-subj="dataGridDisplaySelectorButton"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={buttonLabel}
            />
          </EuiToolTip>
        }
      >
        {densityControl}
        {rowHeightControl}
        {additionalDisplaySettings}
        {showResetButton && (
          <EuiPopoverFooter>
            <EuiFlexGroup justifyContent="flexEnd" responsive={false}>
              <EuiFlexItem grow={false}>
                <div>
                  <EuiButtonEmpty
                    flush="both"
                    size="xs"
                    onClick={resetToInitialState}
                    data-test-subj="resetDisplaySelector"
                  >
                    {resetButtonLabel}
                  </EuiButtonEmpty>
                </div>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPopoverFooter>
        )}
      </EuiPopover>
    ) : null;
  }, [
    euiTheme,
    densityControl,
    rowHeightControl,
    additionalDisplaySettings,
    buttonLabel,
    isOpen,
    resetButtonLabel,
    showResetButton,
    resetToInitialState,
  ]);

  return [displaySelector, gridStyles, rowHeightsOptions];
};
