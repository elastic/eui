/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors used by the Component Objects, one constant object per
 * component. `*_SELECTOR` values are CSS class selectors EUI renders,
 * `*_TEST_SUBJ` values are `data-test-subj` names EUI sets itself.
 *
 * Prefer the Component Objects. These are exported for tooling (for example
 * lint rules that flag hand-written EUI selectors in consumer tests) and for
 * the rare scoping need an object does not cover yet.
 */
export { EuiAccordionSelectors } from './components/accordion/selectors';
export { EuiBasicTableSelectors } from './components/basic_table/selectors';
export { EuiColorPickerSelectors } from './components/color_picker/selectors';
export { EuiComboBoxSelectors } from './components/combo_box/selectors';
export { EuiContextMenuSelectors } from './components/context_menu/selectors';
export { EuiDataGridSelectors } from './components/datagrid/selectors';
export { EuiDraggableSelectors } from './components/drag_and_drop/selectors';
export { EuiFilterButtonSelectors } from './components/filter_button/selectors';
export { EuiFlyoutSelectors } from './components/flyout/selectors';
export { EuiRangeSelectors } from './components/form/range/selectors';
export { EuiSuperSelectSelectors } from './components/form/super_select/selectors';
export { EuiModalSelectors } from './components/modal/selectors';
export { EuiPopoverSelectors } from './components/popover/selectors';
export { EuiSelectableSelectors } from './components/selectable/selectors';
export { EuiGlobalToastListSelectors } from './components/toast/selectors';
export { EuiToolTipSelectors } from './components/tool_tip/selectors';
export { EuiTreeViewSelectors } from './components/tree_view/selectors';
