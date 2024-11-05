/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  _EuiThemeComponentColors,
  _EuiThemeComponents,
} from '@elastic/eui-theme-common';

import { SEMANTIC_COLORS } from './colors/_semantic_colors';
import {
  dark_background_colors,
  dark_border_colors,
  dark_brand_text_colors,
  dark_text_colors,
} from './colors/_colors_dark';

import { buttons } from './_buttons';
import { forms } from './_forms';
import {
  background_colors,
  border_colors,
  brand_text_colors,
  text_colors,
} from './colors/_colors_light';

const component_colors: _EuiThemeComponentColors = {
  badgeBackgroundSubdued: background_colors.backgroundBaseSubdued,
  badgeBorderColorHollow: border_colors.borderBasePlain,
  badgeIconButtonBackgroundHover:
    background_colors.backgroundBaseInteractiveHover,

  breadcrumbsApplicationBackground: background_colors.backgroundLightText,
  breadcrumbsApplicationColor: text_colors.textSubdued,

  bottomBarBackground: SEMANTIC_COLORS.plainDark,

  buttonGroupBorderColor: border_colors.borderBasePlain,
  buttonGroupBorderColorSelected: border_colors.borderBasePlain,
  buttonGroupFocusColor: brand_text_colors.textPrimary,

  collapsibleNavGroupBackground: background_colors.backgroundBaseSubdued,
  collapsibleNavGroupBackgroundDark:
    dark_background_colors.backgroundBaseSubdued,

  dataGridVerticalLineBorderColor: border_colors.borderBasePlain,
  dataGridRowBackgroundStriped: background_colors.backgroundBaseSubdued,
  dataGridRowBackgroundHover: background_colors.backgroundBaseInteractiveHover,

  dragDropDraggingBackground: background_colors.backgroundBaseSuccess,
  dragDropDraggingOverBackground: background_colors.backgroundLightSuccess,

  filterSelectItemBackgroundFocusDisabled:
    background_colors.backgroundBaseDisabled,

  flyoutCloseButtonInsideBackground: background_colors.backgroundBasePlain,

  headerBackground: background_colors.backgroundBasePlain,
  headerDarkBackground: dark_background_colors.backgroundBasePlain,
  headerDarkSearchBorderColor: dark_border_colors.borderBasePlain,
  headerDarkSectionItemBackgroundFocus:
    dark_background_colors.backgroundBasePrimary,

  keyPadMenuItemBackgroundDisabledSelect:
    background_colors.backgroundBaseDisabled,

  listGroupItemBackgroundPrimaryActive:
    background_colors.backgroundBaseInteractiveSelect,
  listGroupItemBackgroundSubduedActive:
    background_colors.backgroundBaseInteractiveSelect,
  listGroupItemBackgroundHover:
    background_colors.backgroundBaseInteractiveHover,
  listGroupItemBackgroundPrimaryHover:
    background_colors.backgroundBaseInteractiveHover,

  markBackground: background_colors.backgroundLightPrimary,

  markdownFormatTableBorderColor: border_colors.borderBasePlain,

  popoverPanelBackground: background_colors.backgroundBasePlain,
  popoverFooterBorderColor: border_colors.borderBaseSubdued,

  scrollbarTrackColor: SEMANTIC_COLORS.shade15,

  sideNavItemEmphasizedBackground:
    background_colors.backgroundBaseInteractiveSelect,

  selectableListItemBorderColor: border_colors.borderBaseSubdued,

  superDatePickerBackgroundSuccees: background_colors.backgroundBaseSuccess,

  switchBackgroundOn: background_colors.backgroundFilledPrimary,
  switchBackgroundOff: background_colors.backgroundFilledText,
  switchUncompressedBackgroundDisabled:
    background_colors.backgroundBaseFormsControlDisabled,
  switchCompressedBackgroundDisabled:
    background_colors.backgroundBaseFormsControlDisabled,
  switchMiniBackgroundDisabled:
    background_colors.backgroundBaseFormsControlDisabled,
  switchThumbBackgroundDisabled: background_colors.backgroundBasePlain,
  switchThumbBorderOn: background_colors.backgroundFilledPrimary,
  switchThumbBorderOff: background_colors.backgroundFilledText,
  switchIconDisabled: forms.LIGHT.iconDisabled,

  tableRowBackgroundHover: background_colors.backgroundBaseInteractiveHover,
  tableRowBackgroundSelected: background_colors.backgroundBaseInteractiveSelect,
  tableRowBackgroundSelectedHover:
    background_colors.backgroundBaseInteractiveSelect,
  tableRowInteractiveBackgroundHover:
    background_colors.backgroundBaseInteractiveSelect,
  tableRowInteractiveBackgroundFocus:
    background_colors.backgroundBaseInteractiveSelect,
  tableCellSortableIconColor: background_colors.backgroundFilledText,

  tooltipBackground: dark_background_colors.backgroundBaseSubdued,
  tooltipBorder: dark_border_colors.borderBaseSubdued,
  tooltipBorderFloating: border_colors.borderBaseFloating,

  tourFooterBackground: background_colors.backgroundBaseSubdued,

  treeViewItemBackgroundHover: background_colors.backgroundBaseInteractiveHover,
};

export const components: _EuiThemeComponents = {
  buttons,
  forms,
  LIGHT: component_colors,
  DARK: {
    ...component_colors,

    badgeBackgroundSubdued: dark_background_colors.backgroundBaseSubdued,
    badgeBorderColorHollow: dark_border_colors.borderBasePlain,
    badgeIconButtonBackgroundHover:
      dark_background_colors.backgroundBaseInteractiveHover,

    breadcrumbsApplicationBackground:
      dark_background_colors.backgroundLightText,
    breadcrumbsApplicationColor: dark_text_colors.textSubdued,

    buttonGroupBorderColor: dark_border_colors.borderBasePlain,
    buttonGroupBorderColorSelected: dark_border_colors.borderBasePlain,
    buttonGroupFocusColor: dark_brand_text_colors.textPrimary,

    collapsibleNavGroupBackground: dark_background_colors.backgroundBaseSubdued,
    collapsibleNavGroupBackgroundDark:
      dark_background_colors.backgroundBaseSubdued,

    dataGridVerticalLineBorderColor: dark_border_colors.borderBasePlain,
    dataGridRowBackgroundStriped: dark_background_colors.backgroundBaseSubdued,
    dataGridRowBackgroundHover:
      dark_background_colors.backgroundBaseInteractiveHover,

    dragDropDraggingBackground: dark_background_colors.backgroundBaseSuccess,
    dragDropDraggingOverBackground:
      dark_background_colors.backgroundLightSuccess,

    filterSelectItemBackgroundFocusDisabled:
      dark_background_colors.backgroundBaseDisabled,

    flyoutCloseButtonInsideBackground:
      dark_background_colors.backgroundBasePlain,

    headerBackground: dark_background_colors.backgroundBasePlain,

    keyPadMenuItemBackgroundDisabledSelect:
      dark_background_colors.backgroundBaseDisabled,

    listGroupItemBackgroundPrimaryActive:
      dark_background_colors.backgroundBaseInteractiveSelect,
    listGroupItemBackgroundSubduedActive:
      dark_background_colors.backgroundBaseInteractiveSelect,
    listGroupItemBackgroundHover:
      dark_background_colors.backgroundBaseInteractiveHover,
    listGroupItemBackgroundPrimaryHover:
      dark_background_colors.backgroundBaseInteractiveHover,

    markBackground: dark_background_colors.backgroundLightPrimary,

    markdownFormatTableBorderColor: dark_border_colors.borderBasePlain,

    popoverPanelBackground: dark_background_colors.backgroundBasePlain,
    popoverFooterBorderColor: dark_border_colors.borderBaseSubdued,

    scrollbarTrackColor: SEMANTIC_COLORS.shade145,

    sideNavItemEmphasizedBackground:
      dark_background_colors.backgroundBaseInteractiveSelect,

    selectableListItemBorderColor: dark_border_colors.borderBaseSubdued,

    switchBackgroundOn: dark_background_colors.backgroundFilledPrimary,
    switchBackgroundOff: dark_background_colors.backgroundFilledText,
    switchUncompressedBackgroundDisabled:
      dark_background_colors.backgroundBaseFormsControlDisabled,
    switchCompressedBackgroundDisabled:
      dark_background_colors.backgroundBaseFormsControlDisabled,
    switchMiniBackgroundDisabled:
      dark_background_colors.backgroundBaseFormsControlDisabled,
    switchThumbBackgroundDisabled: dark_background_colors.backgroundBasePlain,
    switchThumbBorderOn: dark_background_colors.backgroundFilledPrimary,
    switchThumbBorderOff: dark_background_colors.backgroundFilledText,
    switchIconDisabled: forms.DARK.iconDisabled,

    superDatePickerBackgroundSuccees:
      dark_background_colors.backgroundBaseSuccess,

    tableRowBackgroundHover:
      dark_background_colors.backgroundBaseInteractiveHover,
    tableRowBackgroundSelected:
      dark_background_colors.backgroundBaseInteractiveSelect,
    tableRowBackgroundSelectedHover:
      dark_background_colors.backgroundBaseInteractiveSelect,
    tableRowInteractiveBackgroundHover:
      dark_background_colors.backgroundBaseInteractiveHover,
    tableRowInteractiveBackgroundFocus:
      dark_background_colors.backgroundBaseInteractiveHover,
    tableCellSortableIconColor: dark_background_colors.backgroundFilledText,

    tooltipBorderFloating: dark_border_colors.borderBaseFloating,

    tourFooterBackground: dark_background_colors.backgroundBaseSubdued,

    treeViewItemBackgroundHover:
      dark_background_colors.backgroundBaseInteractiveHover,
  },
};
