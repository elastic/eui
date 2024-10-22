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

type _InternalOnlyComponentTokens = {
  shared: {
    backgroundTransparent: ColorModeSwitch;
    backgroundTransparentPrimary: ColorModeSwitch;
    backgroundTransparentAccent: ColorModeSwitch;
    backgroundTransparentAccentSecondary: ColorModeSwitch;
    backgroundTransparentSuccess: ColorModeSwitch;
    backgroundTransparentWarning: ColorModeSwitch;
    backgroundTransparentDanger: ColorModeSwitch;
    backgroundTransparentSubdued: ColorModeSwitch;
    backgroundTransparentPlain: ColorModeSwitch;
  };

  scrollbarTrackColor: ColorModeSwitch;

  buttonGroupBorderColor: ColorModeSwitch;
  buttonGroupBorderColorSelected: ColorModeSwitch;

  badgeBackgroundSubdued: ColorModeSwitch;
  badgeBorderColorHollow: ColorModeSwitch;

  bottomBarBackground: ColorModeSwitch;

  headerBackground: ColorModeSwitch;
  headerBackgroundDark: ColorModeSwitch;
  headerSectionItemBackgroundFocusDark: ColorModeSwitch;

  breadcrumbsApplicationBackground: ColorModeSwitch;
  breadcrumbsApplicationColor: ColorModeSwitch;

  collapsibleNavGroupBackground: ColorModeSwitch;
  collapsibleNavGroupBackgroundDark: ColorModeSwitch;

  switchBackgroundOff: ColorModeSwitch;
  switchUncompressedBackgroundDisabled: ColorModeSwitch;
  switchCompressedBackgroundDisabled: ColorModeSwitch;
  switchMiniBackgroundDisabled: ColorModeSwitch;

  superDatePickerBackgroundSuccees: ColorModeSwitch;

  dataGridVerticalLineBorderColor: ColorModeSwitch;
  dataGridRowBackgroundStriped: ColorModeSwitch;
  dataGridRowBackgroundHover: ColorModeSwitch;

  tableRowBackgroundHover: ColorModeSwitch;
  tableRowBackgroundSelected: ColorModeSwitch;
  tableRowBackgroundSelectedHover: ColorModeSwitch;
  tableRowInteractiveBackgroundHover: ColorModeSwitch;
  tableRowInteractiveBackgroundFocus: ColorModeSwitch;
  tableCellSortableIconColor: ColorModeSwitch;

  popoverPanelBackground: ColorModeSwitch;
  popoverFooterBorderColor: ColorModeSwitch;

  tooltipBackground: ColorModeSwitch;
  tooltipBorder: ColorModeSwitch;
  tooltipBorderFloating: ColorModeSwitch;

  tourFooterBackground: ColorModeSwitch;

  skeletonGradientStartStopBackground: ColorModeSwitch;
  skeletonGradientMiddleBackground: ColorModeSwitch;

  dragDropDraggingBackground: ColorModeSwitch;
  dragDropDraggingOverBackground: ColorModeSwitch;

  listGroupItemBackgroundPrimaryActive: ColorModeSwitch;
  listGroupItemBackgroundSubduedActive: ColorModeSwitch;
  listGroupItemBackgroundHover: ColorModeSwitch;
  listGroupItemBackgroundPrimaryHover: ColorModeSwitch;
};

export type _EuiThemeComponents = {
  buttons: StrictColorModeSwitch<_EuiThemeButtonColors>;
  forms: StrictColorModeSwitch<_EuiThemeFormColors>;
  /**
   * internal-only key that holds temporary tokens used while migrating themes
   */
  __TEMP_INTERNAL__: StrictColorModeSwitch<_InternalOnlyComponentTokens>;
};
