/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement, useState } from 'react';
import { EuiDataGridStyle } from '../data_grid_types';
import { EuiI18n, useEuiI18n } from '../../i18n';
import { EuiPopover } from '../../popover';
import { EuiButtonIcon, EuiButtonGroup } from '../../button';
import { EuiFormRow } from '../../form';
import { EuiToolTip } from '../../tool_tip';

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

export const useDataGridStyleSelector = (
  initialStyles: EuiDataGridStyle
): [ReactElement, EuiDataGridStyle] => {
  // track styles specified by the user at run time
  const [userGridStyles, setUserGridStyles] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  // Normal is the default density
  const [gridDensity, _setGridDensity] = useState(densityOptions[1]);
  const setGridDensity = (density: string) => {
    _setGridDensity(density);
    setUserGridStyles(densityStyles[density]);
  };

  // merge the developer-specified styles with any user overrides
  const gridStyles = {
    ...initialStyles,
    ...userGridStyles,
  };

  const buttonLabel = useEuiI18n(
    'euiStyleSelector.buttonText',
    'Display options'
  );

  const styleSelector = (
    <EuiPopover
      data-test-subj="dataGridStyleSelectorPopover"
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
            data-test-subj="dataGridStyleSelectorButton"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={buttonLabel}
          />
        </EuiToolTip>
      }
    >
      <EuiI18n
        tokens={[
          'euiStyleSelector.densityLabel',
          'euiStyleSelector.labelCompact',
          'euiStyleSelector.labelNormal',
          'euiStyleSelector.labelExpanded',
        ]}
        defaults={['Density', 'Compact', 'Normal', 'Expanded']}
      >
        {([
          densityLabel,
          labelCompact,
          labelNormal,
          labelExpanded,
        ]: string[]) => (
          <EuiFormRow
            label={densityLabel}
            display="columnCompressed"
            className="euiDataGrid__displayFormRow"
          >
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
            />
          </EuiFormRow>
        )}
      </EuiI18n>
    </EuiPopover>
  );

  return [styleSelector, gridStyles];
};
