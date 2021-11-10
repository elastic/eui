/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement, useState, useMemo, useCallback } from 'react';

import { EuiI18n, useEuiI18n } from '../../i18n';
import { EuiPopover } from '../../popover';
import { EuiButtonIcon, EuiButtonGroup } from '../../button';
import { EuiFormRow } from '../../form';
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

// These are the available options. They power the gridDensity hook and also the options in the render
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
// Used to correctly format the icon name for the grid density icon
const capitalizeDensityString = (s: string) => s[0].toUpperCase() + s.slice(1);

// Row height options and utilities
const rowHeightButtonOptions: string[] = ['undefined', 'auto', 'lineCount'];
const convertRowHeightsOptionsToSelection = (
  rowHeightsOptions?: EuiDataGridRowHeightsOptions
) => {
  if (rowHeightsOptions) {
    const { defaultHeight } = rowHeightsOptions;

    if (defaultHeight === 'auto') {
      return rowHeightButtonOptions[1];
    }
    if (typeof defaultHeight === 'object' && defaultHeight?.lineCount) {
      return rowHeightButtonOptions[2];
    }
  }
  return rowHeightButtonOptions[0];
};

export const useDataGridDisplaySelector = (
  showDisplaySelector: EuiDataGridToolBarVisibilityOptions['showDisplaySelector'],
  initialStyles: EuiDataGridStyle,
  initialRowHeightsOptions?: EuiDataGridRowHeightsOptions,
  showStyleSelector?: EuiDataGridToolBarVisibilityOptions['showStyleSelector'] // TODO: Deprecate
): [ReactElement, EuiDataGridStyle, EuiDataGridRowHeightsOptions] => {
  const [isOpen, setIsOpen] = useState(false);

  const showDensityControls =
    showStyleSelector ??
    getNestedObjectOptions(showDisplaySelector, 'allowDensity');

  const showRowHeightControls = getNestedObjectOptions(
    showDisplaySelector,
    'allowRowHeight'
  );

  // track styles specified by the user at run time
  const [userGridStyles, setUserGridStyles] = useState({});
  const [userRowHeightsOptions, setUserRowHeightsOptions] = useState(
    initialRowHeightsOptions // Set initial state from the developer-passed props
  );

  // Normal is the default density
  const [gridDensity, _setGridDensity] = useState(densityOptions[1]);
  const setGridDensity = (density: string) => {
    _setGridDensity(density);
    setUserGridStyles(densityStyles[density]);
  };

  // Row height state
  const [rowHeightSelection, setRowHeightSelection] = useState(
    convertRowHeightsOptionsToSelection(initialRowHeightsOptions)
  );
  const setRowHeight = useCallback((option: string) => {
    let rowHeightsOptions: EuiDataGridRowHeightsOptions | undefined;

    if (option === 'auto') {
      rowHeightsOptions = { defaultHeight: 'auto' };
    } else if (option === 'lineCount') {
      rowHeightsOptions = { defaultHeight: { lineCount: 3 } }; // TODO
    } else {
      rowHeightsOptions = { defaultHeight: undefined };
    }

    setRowHeightSelection(option);
    setUserRowHeightsOptions(rowHeightsOptions);
  }, []);

  // merge the developer-specified styles with any user overrides
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

  const buttonLabel = useEuiI18n(
    'euiDisplaySelector.buttonText',
    'Display options'
  );

  const displaySelector = (
    <EuiPopover
      data-test-subj="dataGridDisplaySelectorPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downRight"
      panelPaddingSize="s"
      panelClassName="euiDataGrid__displayPopoverPanel"
      button={
        <EuiToolTip content={buttonLabel} delay="long">
          <EuiButtonIcon
            size="xs"
            iconType={`tableDensity${capitalizeDensityString(gridDensity)}`}
            className="euiDataGrid__controlBtn"
            color="text"
            data-test-subj="dataGridDisplaySelectorButton"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={buttonLabel}
          />
        </EuiToolTip>
      }
    >
      {showDensityControls && (
        <EuiI18n
          tokens={[
            'euiDisplaySelector.densityLabel',
            'euiDisplaySelector.labelCompact',
            'euiDisplaySelector.labelNormal',
            'euiDisplaySelector.labelExpanded',
          ]}
          defaults={['Density', 'Compact', 'Normal', 'Expanded']}
        >
          {([
            densityLabel,
            labelCompact,
            labelNormal,
            labelExpanded,
          ]: string[]) => (
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
                onChange={setGridDensity}
                idSelected={gridDensity}
                data-test-subj="densityButtonGroup"
              />
            </EuiFormRow>
          )}
        </EuiI18n>
      )}
      {showRowHeightControls && (
        <EuiI18n
          tokens={[
            'euiDisplaySelector.rowHeightLabel',
            'euiDisplaySelector.labelSingle',
            'euiDisplaySelector.labelAuto',
            'euiDisplaySelector.labelCustom',
          ]}
          defaults={['Row height', 'Single', 'Auto fit', 'Custom']}
        >
          {([
            rowHeightLabel,
            labelSingle,
            labelAuto,
            labelCustom,
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
            </>
          )}
        </EuiI18n>
      )}
    </EuiPopover>
  );

  return [displaySelector, gridStyles, rowHeightsOptions];
};
