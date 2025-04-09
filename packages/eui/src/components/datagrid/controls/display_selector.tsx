/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ChangeEvent,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import isEqual from 'lodash/isEqual';

import { logicalStyle, mathWithUnits } from '../../../global_styling';
import { useUpdateEffect, useDeepEqual, useEuiTheme } from '../../../services';
import { EuiI18n, useEuiI18n } from '../../i18n';
import { EuiPopover, EuiPopoverFooter } from '../../popover';
import { EuiButtonIcon, EuiButtonGroup, EuiButtonEmpty } from '../../button';
import { EuiFormRow, EuiFieldNumber } from '../../form';
import { euiFormMaxWidth } from '../../form/form.styles';
import { EuiFlexGroup } from '../../flex';
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
const emptyRowHeightsOptions: EuiDataGridRowHeightsOptions = {};

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

const rowHeightSelectionOptions = ['auto', 'static'] as const;
const convertRowHeightsOptionsToSelection = (
  rowHeightsOptions: EuiDataGridRowHeightsOptions
) => {
  const { defaultHeight } = rowHeightsOptions;

  // Custom pixel row height values don't have a corresponding UI element
  if (
    typeof defaultHeight === 'number' ||
    (typeof defaultHeight === 'object' && defaultHeight.height)
  ) {
    return '';
  }

  if (defaultHeight === 'auto') {
    return rowHeightSelectionOptions[0];
  }
  return rowHeightSelectionOptions[1];
};
const RowHeightControl = ({
  rowHeightsOptions,
  onChange,
}: {
  rowHeightsOptions: EuiDataGridRowHeightsOptions;
  onChange: Function;
}) => {
  const { autoBelowLineCount } = rowHeightsOptions;

  const [lineCountInput, setLineCountInput] = useState(1);
  const setLineCountHeight = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newLineCount = Number(event.currentTarget.value);
      setLineCountInput(newLineCount);

      onChange({
        rowHeights: {}, // Unset all row-specific line counts
        defaultHeight:
          newLineCount > 1 ? { lineCount: newLineCount } : undefined, // lineCount: 1 is the same as undefined, and this helps correctly display the reset button
      });
    },
    [onChange]
  );

  useEffect(() => {
    const passedLineCount =
      typeof rowHeightsOptions?.defaultHeight === 'object'
        ? rowHeightsOptions.defaultHeight.lineCount
        : undefined;

    // If lineCount updates come in from consumer changes, update the input to reflect that
    if (passedLineCount) {
      setLineCountInput(passedLineCount);
    }
    // If set back to undefined/single line height (typically from the reset button)
    if (rowHeightsOptions?.defaultHeight === undefined) {
      setLineCountInput(1);
    }
  }, [rowHeightsOptions?.defaultHeight]);

  const rowHeightSelection = useMemo(() => {
    return convertRowHeightsOptionsToSelection(rowHeightsOptions);
  }, [rowHeightsOptions]);

  const setRowHeight = useCallback(
    (option: string) => {
      const rowHeightsOptions: EuiDataGridRowHeightsOptions = {
        rowHeights: {}, // Unset all row-specific heights
      };

      if (option === rowHeightSelectionOptions[0]) {
        rowHeightsOptions.defaultHeight = 'auto';
      } else if (option === rowHeightSelectionOptions[1]) {
        const lineCount = Number(lineCountInput);

        if (lineCount > 1) {
          rowHeightsOptions.defaultHeight = { lineCount };
        } else {
          // lineCount: 1 is the same as single/undefined
          rowHeightsOptions.defaultHeight = undefined;
        }
      }

      onChange(rowHeightsOptions);
    },
    [lineCountInput, onChange]
  );

  return (
    <EuiI18n
      tokens={[
        'euiDisplaySelector.rowHeightLabel',
        'euiDisplaySelector.labelAuto',
        'euiDisplaySelector.labelStatic',
        'euiDisplaySelector.labelMax',
      ]}
      defaults={['Lines per row', 'Auto', 'Static', 'Max']}
    >
      {([rowHeightLabel, labelAuto, labelStatic, labelMax]: string[]) => (
        <EuiFormRow label={rowHeightLabel} display="columnCompressed">
          <EuiFlexGroup gutterSize="s" responsive={false}>
            <EuiButtonGroup
              legend={rowHeightLabel}
              css={{ flexShrink: 0, flexBasis: '66.6%' }}
              buttonSize="compressed"
              isFullWidth
              options={[
                { id: rowHeightSelectionOptions[0], label: labelAuto },
                {
                  id: rowHeightSelectionOptions[1],
                  label: autoBelowLineCount ? labelMax : labelStatic,
                },
              ]}
              onChange={setRowHeight}
              idSelected={rowHeightSelection}
              data-test-subj="rowHeightButtonGroup"
            />
            <EuiFieldNumber
              aria-label={rowHeightLabel}
              compressed
              min={1}
              max={20}
              disabled={rowHeightSelection !== rowHeightSelectionOptions[1]}
              value={lineCountInput}
              onChange={setLineCountHeight}
              data-test-subj="lineCountNumber"
            />
          </EuiFlexGroup>
        </EuiFormRow>
      )}
    </EuiI18n>
  );
};

/**
 * Display settings/selector popover
 */

export const useDataGridDisplaySelector = (
  showDisplaySelector: EuiDataGridToolBarVisibilityOptions['showDisplaySelector'],
  passedGridStyles: EuiDataGridStyle,
  passedRowHeightsOptions: EuiDataGridRowHeightsOptions = emptyRowHeightsOptions
): [ReactNode, EuiDataGridStyle, EuiDataGridRowHeightsOptions] => {
  /**
   * Grid style changes
   */
  const [gridStyles, setGridStyles] =
    useState<EuiDataGridStyle>(passedGridStyles);

  // Update if consumers pass new grid style configurations
  const stablePassedGridStyles = useDeepEqual(passedGridStyles);
  useUpdateEffect(() => {
    setGridStyles(stablePassedGridStyles);
  }, [stablePassedGridStyles]);

  // Update on user display selector change
  const onUserGridStyleChange = useCallback(
    (styles: EuiDataGridRowHeightsOptions) =>
      setGridStyles((prevStyles) => {
        const changedStyles = { ...prevStyles, ...styles };
        const { onChange, ...rest } = changedStyles;
        onChange?.(rest);
        return changedStyles;
      }),
    []
  );

  const densityControl = useMemo(() => {
    const show = getNestedObjectOptions(showDisplaySelector, 'allowDensity');
    return show ? (
      <DensityControl
        gridStyles={gridStyles}
        onChange={onUserGridStyleChange}
      />
    ) : null;
  }, [showDisplaySelector, gridStyles, onUserGridStyleChange]);

  /**
   * Row height changes
   */
  const [rowHeightsOptions, setRowHeightsOptions] =
    useState<EuiDataGridRowHeightsOptions>(passedRowHeightsOptions);

  // Update if consumers pass new row height configurations
  const stablePassedRowHeights = useDeepEqual(passedRowHeightsOptions);
  useUpdateEffect(() => {
    setRowHeightsOptions(stablePassedRowHeights);
  }, [stablePassedRowHeights]);

  // Update on user display selector change
  const onUserRowHeightChange = useCallback(
    (options: EuiDataGridRowHeightsOptions) =>
      setRowHeightsOptions((prevOptions) => {
        const changedOptions = { ...prevOptions, ...options };
        const { onChange, ...rest } = changedOptions;
        onChange?.(rest);
        return changedOptions;
      }),
    []
  );

  const rowHeightControl = useMemo(() => {
    const show = getNestedObjectOptions(showDisplaySelector, 'allowRowHeight');
    return show ? (
      <RowHeightControl
        rowHeightsOptions={rowHeightsOptions}
        onChange={onUserRowHeightChange}
      />
    ) : null;
  }, [showDisplaySelector, rowHeightsOptions, onUserRowHeightChange]);

  /**
   * Reset button
   */
  const [showResetButton, setShowResetButton] = useState(false);
  const initialGridStyles = useRef<EuiDataGridStyle>(passedGridStyles);
  const initialRowHeightsOptions = useRef<EuiDataGridRowHeightsOptions>(
    passedRowHeightsOptions
  );

  const resetToInitialState = useCallback(() => {
    setGridStyles(initialGridStyles.current);
    setRowHeightsOptions(initialRowHeightsOptions.current);
  }, []);

  useUpdateEffect(() => {
    setShowResetButton(
      !isEqual(
        rowHeightsOptions.defaultHeight,
        initialRowHeightsOptions.current.defaultHeight
      ) ||
        gridStyles.fontSize !== initialGridStyles.current.fontSize ||
        gridStyles.cellPadding !== initialGridStyles.current.cellPadding
    );
  }, [
    rowHeightsOptions.defaultHeight,
    gridStyles.fontSize,
    gridStyles.cellPadding,
  ]);

  const resetButton = useMemo(() => {
    const allowed = getNestedObjectOptions(
      showDisplaySelector,
      'allowResetButton'
    );
    if (!allowed || !showResetButton) return null;

    return <ResetButton onClick={resetToInitialState} />;
  }, [showDisplaySelector, showResetButton, resetToInitialState]);

  /**
   * Display settings popover
   */
  const [isOpen, setIsOpen] = useState(false);

  const buttonLabel = useEuiI18n(
    'euiDisplaySelector.buttonText',
    'Display options'
  );

  const additionalDisplaySettings =
    typeof showDisplaySelector === 'boolean'
      ? null
      : showDisplaySelector?.additionalDisplaySettings ?? null;

  const customRender =
    typeof showDisplaySelector === 'boolean'
      ? undefined
      : showDisplaySelector?.customRender;

  const euiTheme = useEuiTheme();

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
              iconType="controls"
              color="text"
              data-test-subj="dataGridDisplaySelectorButton"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={buttonLabel}
            />
          </EuiToolTip>
        }
      >
        {customRender ? (
          customRender({
            densityControl,
            rowHeightControl,
            additionalDisplaySettings,
            resetButton,
          })
        ) : (
          <>
            {densityControl}
            {rowHeightControl}
            {additionalDisplaySettings}
            {resetButton}
          </>
        )}
      </EuiPopover>
    ) : null;
  }, [
    euiTheme,
    densityControl,
    rowHeightControl,
    additionalDisplaySettings,
    resetButton,
    customRender,
    buttonLabel,
    isOpen,
  ]);

  return [displaySelector, gridStyles, rowHeightsOptions];
};

const ResetButton = ({ onClick }: { onClick: () => void }) => {
  const resetButtonLabel = useEuiI18n(
    'euiDisplaySelector.resetButtonText',
    'Reset to default'
  );

  return (
    <EuiPopoverFooter>
      <EuiFlexGroup justifyContent="flexEnd" responsive={false}>
        <EuiButtonEmpty
          flush="both"
          size="xs"
          onClick={onClick}
          data-test-subj="resetDisplaySelector"
        >
          {resetButtonLabel}
        </EuiButtonEmpty>
      </EuiFlexGroup>
    </EuiPopoverFooter>
  );
};
