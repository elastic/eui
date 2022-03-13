import React from 'react';
import { EuiDataGrid } from '../../../../../src/components';

import { DataGridPropsTable } from '../_props_table';
import { gridSnippets } from '../_snippets';

const gridLinks = {
  rowHeightsOptions:
    '/#/tabular-content/data-grid-style-display#row-heights-options',
  gridStyle: '/#/tabular-content/data-grid-style-display#grid-style',
  inMemory: '/#/tabular-content/data-grid-in-memory',
  leadingControlColumns:
    '/#/tabular-content/data-grid-columns-cells#control-columns',
  trailingControlColumns:
    '/#/tabular-content/data-grid-columns-cells#control-columns',
  renderCellPopover:
    '/#/tabular-content/data-grid-data#completely-customizing-cell-popover-rendering',
  renderFooterCellValue: '/#/tabular-content/data-grid-data#footer-row',
  schemaDetectors: '/#/tabular-content/data-grid-data#schemas',
  toolbarVisibility: '/#/tabular-content/data-grid-toolbar#toolbar-visibility',
};

export const DataGridTopProps = () => {
  return (
    <DataGridPropsTable
      component={EuiDataGrid}
      exclude={[
        'className',
        'data-test-subj',
        'aria-label',
        'width',
        'height',
        'minSizeForControls',
        'ref',
      ]}
      snippets={gridSnippets}
      links={gridLinks}
    />
  );
};
