/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement, useState } from 'react';
import { EuiDataGridStyle } from './data_grid_types';
import { EuiI18n } from '../i18n';
import { EuiPopover } from '../popover';
import { EuiButtonEmpty, EuiButtonGroup } from '../button';

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

export const useDataGridStyleSelector = (
  initialStyles: EuiDataGridStyle
): [ReactElement, EuiDataGridStyle] => {
  // track styles specified by the user at run time
  const [userGridStyles, setUserGridStyles] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  // These are the available options. They power the gridDensity hook and also the options in the render
  const densityOptions: string[] = ['expanded', 'normal', 'compact'];

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

  const styleSelector = (
    <EuiPopover
      data-test-subj="dataGridStyleSelectorPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downCenter"
      panelPaddingSize="s"
      panelClassName="euiDataGridColumnSelectorPopover"
      button={
        <EuiButtonEmpty
          size="xs"
          iconType="tableDensityExpanded"
          className="euiDataGrid__controlBtn"
          color="text"
          data-test-subj="dataGridStyleSelectorButton"
          onClick={() => setIsOpen(!isOpen)}
        >
          <EuiI18n token="euiStyleSelector.buttonText" default="Density" />
        </EuiButtonEmpty>
      }
    >
      <EuiI18n
        tokens={[
          'euiStyleSelector.buttonLegend',
          'euiStyleSelector.labelExpanded',
          'euiStyleSelector.labelNormal',
          'euiStyleSelector.labelCompact',
        ]}
        defaults={[
          'Select the display density for the data grid',
          'Expanded density',
          'Normal density',
          'Compact density',
        ]}
      >
        {([
          buttonLegend,
          labelExpanded,
          labelNormal,
          labelCompact,
        ]: string[]) => (
          <EuiButtonGroup
            legend={buttonLegend}
            name="density"
            className="eui-displayInlineBlock"
            buttonSize="compressed"
            options={[
              {
                id: densityOptions[0],
                label: labelExpanded,
                iconType: 'tableDensityExpanded',
              },
              {
                id: densityOptions[1],
                label: labelNormal,
                iconType: 'tableDensityNormal',
              },
              {
                id: densityOptions[2],
                label: labelCompact,
                iconType: 'tableDensityCompact',
              },
            ]}
            onChange={setGridDensity}
            idSelected={gridDensity}
            isIconOnly
          />
        )}
      </EuiI18n>
    </EuiPopover>
  );

  return [styleSelector, gridStyles];
};
