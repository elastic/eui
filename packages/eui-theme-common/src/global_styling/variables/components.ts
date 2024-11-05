/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ColorModeSwitch, StrictColorModeSwitch } from '../types';
import { _EuiThemeButtonColors } from './buttons';
import { _EuiThemeFormColors } from './forms';

export type _EuiThemeComponentColors = {
  buttonGroupBorderColor: ColorModeSwitch;
  buttonGroupBorderColorSelected: ColorModeSwitch;
  buttonGroupFocusColor: ColorModeSwitch;

  badgeBackgroundSubdued: ColorModeSwitch;
  badgeBorderColorHollow: ColorModeSwitch;
  badgeIconButtonBackgroundHover: ColorModeSwitch;

  bottomBarBackground: ColorModeSwitch;

  breadcrumbsApplicationBackground: ColorModeSwitch;
  breadcrumbsApplicationColor: ColorModeSwitch;

  collapsibleNavGroupBackground: ColorModeSwitch;
  collapsibleNavGroupBackgroundDark: ColorModeSwitch;

  dataGridVerticalLineBorderColor: ColorModeSwitch;
  dataGridRowBackgroundStriped: ColorModeSwitch;
  dataGridRowBackgroundHover: ColorModeSwitch;

  dragDropDraggingBackground: ColorModeSwitch;
  dragDropDraggingOverBackground: ColorModeSwitch;

  headerBackground: ColorModeSwitch;
  headerDarkBackground: ColorModeSwitch;
  headerDarkSearchBorderColor: ColorModeSwitch;
  headerDarkSectionItemBackgroundFocus: ColorModeSwitch;

  filterSelectItemBackgroundFocusDisabled: ColorModeSwitch;

  flyoutCloseButtonInsideBackground: ColorModeSwitch;

  keyPadMenuItemBackgroundDisabledSelect: ColorModeSwitch;

  listGroupItemBackgroundPrimaryActive: ColorModeSwitch;
  listGroupItemBackgroundSubduedActive: ColorModeSwitch;
  listGroupItemBackgroundHover: ColorModeSwitch;
  listGroupItemBackgroundPrimaryHover: ColorModeSwitch;

  markBackground: ColorModeSwitch;

  markdownFormatTableBorderColor: ColorModeSwitch;

  popoverPanelBackground: ColorModeSwitch;
  popoverFooterBorderColor: ColorModeSwitch;

  scrollbarTrackColor: ColorModeSwitch;

  sideNavItemEmphasizedBackground: ColorModeSwitch;

  selectableListItemBorderColor: ColorModeSwitch;

  superDatePickerBackgroundSuccees: ColorModeSwitch;

  switchBackgroundOn: ColorModeSwitch;
  switchBackgroundOff: ColorModeSwitch;
  switchUncompressedBackgroundDisabled: ColorModeSwitch;
  switchCompressedBackgroundDisabled: ColorModeSwitch;
  switchMiniBackgroundDisabled: ColorModeSwitch;
  switchThumbBackgroundDisabled: ColorModeSwitch;
  switchThumbBorderOn: ColorModeSwitch;
  switchThumbBorderOff: ColorModeSwitch;
  switchIconDisabled: ColorModeSwitch;

  tableRowBackgroundHover: ColorModeSwitch;
  tableRowBackgroundSelected: ColorModeSwitch;
  tableRowBackgroundSelectedHover: ColorModeSwitch;
  tableRowInteractiveBackgroundHover: ColorModeSwitch;
  tableRowInteractiveBackgroundFocus: ColorModeSwitch;
  tableCellSortableIconColor: ColorModeSwitch;

  tooltipBackground: ColorModeSwitch;
  tooltipBorder: ColorModeSwitch;
  tooltipBorderFloating: ColorModeSwitch;

  tourFooterBackground: ColorModeSwitch;

  treeViewItemBackgroundHover: ColorModeSwitch;
};

export type _EuiThemeComponents = {
  buttons: StrictColorModeSwitch<_EuiThemeButtonColors>;
  forms: StrictColorModeSwitch<_EuiThemeFormColors>;
  /**
   * internal-only key that holds temporary tokens used while migrating themes
   */
  LIGHT: _EuiThemeComponentColors;
  DARK: _EuiThemeComponentColors;
};
