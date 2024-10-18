import React from 'react';

import { EuiDataGridToolBarVisibilityOptions } from '!!prop-loader!../../../../../src/components/datagrid/data_grid_types';

import { DataGridPropsTable } from '../_props_table';

/* eslint-disable local/css-logical-properties */
const gridSnippets = {
  showColumnSelector: `showColumnSelector: {
  allowHide: false,
  allowReorder: false,
}`,
  showDisplaySelector: `showDisplaySelector: {
  allowDensity: false,
  allowRowHeight: false,
  allowResetButton: false,
  additionalDisplaySettings: <EuiButtonEmpty size="xs" />,
  customRender: ({ densityControl, rowHeightControl, resetButton, additionalDisplaySettings }) => (
    <>Completely custom display settings</>
  ),
}`,
  showSortSelector: 'showSortSelector: false',
  showFullScreenSelector: 'showFullScreenSelector: false',
  additionalControls: `additionalControls: {
  left: <EuiButtonEmpty size="xs" />,
  right: <EuiButtonIcon size="xs" />,
}`,
};
export default () => (
  <DataGridPropsTable
    component={EuiDataGridToolBarVisibilityOptions}
    snippets={gridSnippets}
  />
);
