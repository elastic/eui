/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiAccordionSelectors } from './components/accordion/selectors';
import { EuiBasicTableSelectors } from './components/basic_table/selectors';
import { EuiColorPickerSelectors } from './components/color_picker/selectors';
import { EuiComboBoxSelectors } from './components/combo_box/selectors';
import { EuiContextMenuSelectors } from './components/context_menu/selectors';
import { EuiDataGridSelectors } from './components/datagrid/selectors';
import { EuiDraggableSelectors } from './components/drag_and_drop/selectors';
import { EuiFilterButtonSelectors } from './components/filter_button/selectors';
import { EuiFlyoutSelectors } from './components/flyout/selectors';
import { EuiModalSelectors } from './components/modal/selectors';
import { EuiPopoverSelectors } from './components/popover/selectors';
import { EuiRangeSelectors } from './components/form/range/selectors';
import { EuiSelectableSelectors } from './components/selectable/selectors';
import { EuiSuperSelectSelectors } from './components/form/super_select/selectors';
import { EuiGlobalToastListSelectors } from './components/toast/selectors';
import { EuiToolTipSelectors } from './components/tool_tip/selectors';
import { EuiTreeViewSelectors } from './components/tree_view/selectors';

/**
 * Stable selectors of every Component Object, keyed by component.
 * `*_SELECTOR` values are CSS classes, `*_TEST_SUBJ` values are `data-test-subj` names.
 *
 * @example page.locator(selectors.comboBox.PILL_SELECTOR)
 */
export const selectors = {
  accordion: EuiAccordionSelectors,
  basicTable: EuiBasicTableSelectors,
  colorPicker: EuiColorPickerSelectors,
  comboBox: EuiComboBoxSelectors,
  contextMenu: EuiContextMenuSelectors,
  dataGrid: EuiDataGridSelectors,
  draggable: EuiDraggableSelectors,
  filterButton: EuiFilterButtonSelectors,
  flyout: EuiFlyoutSelectors,
  modal: EuiModalSelectors,
  popover: EuiPopoverSelectors,
  range: EuiRangeSelectors,
  selectable: EuiSelectableSelectors,
  superSelect: EuiSuperSelectSelectors,
  toast: EuiGlobalToastListSelectors,
  toolTip: EuiToolTipSelectors,
  treeView: EuiTreeViewSelectors,
} as const;
