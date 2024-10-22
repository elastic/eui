/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeComponents } from '@elastic/eui-theme-common';

import { PRIMITIVE_COLORS } from './colors/_primitive_colors';
import { SEMANTIC_COLORS } from './colors/_semantic_colors';
import {
  dark_background_colors,
  dark_border_colors,
  dark_text_colors,
} from './colors/_colors_dark';

import { buttons } from './_buttons';
import { forms } from './_forms';
import {
  background_colors,
  border_colors,
  text_colors,
} from './colors/_colors_light';

const temporary_components = {
  shared: {
    backgroundTransparent: PRIMITIVE_COLORS.transparent.white['0'],
    backgroundTransparentPrimary: background_colors.backgroundBasePrimary,
    backgroundTransparentAccent: background_colors.backgroundBaseAccent,
    backgroundTransparentAccentSecondary:
      background_colors.backgroundBaseAccentSecondary,
    backgroundTransparentSuccess: background_colors.backgroundBaseSuccess,
    backgroundTransparentWarning: background_colors.backgroundBaseWarning,
    backgroundTransparentDanger: background_colors.backgroundBaseDanger,
    backgroundTransparentSubdued: SEMANTIC_COLORS.shade15,
    backgroundTransparentPlain: SEMANTIC_COLORS.shade15,
  },

  scrollbarTrackColor: SEMANTIC_COLORS.shade15,

  buttonGroupBorderColor: border_colors.borderBasePlain,
  buttonGroupBorderColorSelected: border_colors.borderBasePlain,

  badgeBackgroundSubdued: background_colors.backgroundBaseSubdued,
  badgeBorderColorHollow: border_colors.borderBasePlain,

  bottomBarBackground: SEMANTIC_COLORS.plainDark,

  headerBackground: background_colors.backgroundBasePlain,
  headerBackgroundDark: dark_background_colors.backgroundBasePlain,
  headerSectionItemBackgroundFocusDark:
    dark_background_colors.backgroundBasePrimary,

  breadcrumbsApplicationBackground: background_colors.backgroundLightText,
  breadcrumbsApplicationColor: text_colors.textSubdued,

  collapsibleNavGroupBackground: background_colors.backgroundBasePage,
  collapsibleNavGroupBackgroundDark: dark_background_colors.backgroundBasePage,

  switchBackgroundOff: background_colors.backgroundBaseDisabled,
  switchUncompressedBackgroundDisabled:
    background_colors.backgroundBaseDisabled,
  switchCompressedBackgroundDisabled: background_colors.backgroundBaseDisabled,
  switchMiniBackgroundDisabled: background_colors.backgroundBaseDisabled,

  superDatePickerBackgroundSuccees: background_colors.backgroundBaseSuccess,

  dataGridVerticalLineBorderColor: border_colors.borderBasePlain,
  dataGridRowBackgroundStriped: background_colors.backgroundBaseSubdued,
  dataGridRowBackgroundHover: background_colors.backgroundBaseHover,

  tableRowBackgroundHover: background_colors.backgroundBaseHover,
  tableRowBackgroundSelected: background_colors.backgroundBaseSelect,
  tableRowBackgroundSelectedHover: background_colors.backgroundBaseSelect,
  tableRowInteractiveBackgroundHover: background_colors.backgroundBaseSelect,
  tableRowInteractiveBackgroundFocus: background_colors.backgroundBaseSelect,
  tableCellSortableIconColor: background_colors.backgroundFilledText,

  popoverPanelBackground: background_colors.backgroundBasePlain,
  popoverFooterBorderColor: border_colors.borderBaseSubdued,

  tooltipBackground: dark_background_colors.backgroundBaseSubdued,
  tooltipBorder: dark_border_colors.borderBaseSubdued,
  tooltipBorderFloating: border_colors.borderBaseFloating,

  tourFooterBackground: background_colors.backgroundBaseSubdued,

  // TODO: update once aligned
  skeletonGradientStartStopBackground: SEMANTIC_COLORS.shade20,
  skeletonGradientMiddleBackground: SEMANTIC_COLORS.shade15,

  dragDropDraggingBackground: background_colors.backgroundBaseSuccess,
  dragDropDraggingOverBackground: background_colors.backgroundLightSuccess,

  listGroupItemBackgroundPrimaryActive: background_colors.backgroundBaseSelect,
  listGroupItemBackgroundSubduedActive: background_colors.backgroundBaseSelect,
  listGroupItemBackgroundHover: background_colors.backgroundBaseHover,
  listGroupItemBackgroundPrimaryHover: background_colors.backgroundBaseHover,
};

export const components: _EuiThemeComponents = {
  buttons,
  forms,
  __TEMP_INTERNAL__: {
    LIGHT: temporary_components,
    DARK: {
      ...temporary_components,

      shared: {
        backgroundTransparent: PRIMITIVE_COLORS.transparent.white['0'],
        backgroundTransparentPrimary:
          dark_background_colors.backgroundBasePrimary,
        backgroundTransparentAccent:
          dark_background_colors.backgroundBaseAccent,
        backgroundTransparentAccentSecondary:
          dark_background_colors.backgroundBaseAccent,
        backgroundTransparentSuccess:
          dark_background_colors.backgroundBaseSuccess,
        backgroundTransparentWarning:
          dark_background_colors.backgroundBaseWarning,
        backgroundTransparentDanger:
          dark_background_colors.backgroundBaseDanger,
        backgroundTransparentSubdued:
          dark_background_colors.backgroundBaseSubdued,
        backgroundTransparentPlain: dark_background_colors.backgroundBasePlain,
      },

      buttonGroupBorderColor: dark_border_colors.borderBasePlain,
      buttonGroupBorderColorSelected: dark_border_colors.borderBasePlain,

      badgeBackgroundSubdued: dark_background_colors.backgroundBaseSubdued,
      badgeBorderColorHollow: dark_border_colors.borderBasePlain,

      scrollbarTrackColor: SEMANTIC_COLORS.shade145,

      headerBackground: dark_background_colors.backgroundBasePlain,

      breadcrumbsApplicationBackground:
        dark_background_colors.backgroundLightText,
      breadcrumbsApplicationColor: dark_text_colors.textSubdued,

      collapsibleNavGroupBackground: dark_background_colors.backgroundBasePage,
      collapsibleNavGroupBackgroundDark:
        dark_background_colors.backgroundBasePage,

      switchBackgroundOff: dark_background_colors.backgroundBaseDisabled,
      switchUncompressedBackgroundDisabled:
        dark_background_colors.backgroundBaseDisabled,
      switchCompressedBackgroundDisabled:
        dark_background_colors.backgroundBaseDisabled,
      switchMiniBackgroundDisabled:
        dark_background_colors.backgroundBaseDisabled,

      superDatePickerBackgroundSuccees:
        dark_background_colors.backgroundBaseSuccess,

      dataGridVerticalLineBorderColor: dark_border_colors.borderBasePlain,
      dataGridRowBackgroundStriped:
        dark_background_colors.backgroundBaseSubdued,
      dataGridRowBackgroundHover: dark_background_colors.backgroundBaseHover,

      tableRowBackgroundHover: dark_background_colors.backgroundBaseHover,
      tableRowBackgroundSelected: dark_background_colors.backgroundBaseSelect,
      tableRowBackgroundSelectedHover:
        dark_background_colors.backgroundBaseSelect,
      tableRowInteractiveBackgroundHover:
        dark_background_colors.backgroundBaseHover,
      tableRowInteractiveBackgroundFocus:
        dark_background_colors.backgroundBaseHover,
      tableCellSortableIconColor: dark_background_colors.backgroundFilledText,

      popoverPanelBackground: dark_background_colors.backgroundBasePlain,
      popoverFooterBorderColor: dark_border_colors.borderBaseSubdued,

      tooltipBorderFloating: dark_border_colors.borderBaseFloating,

      tourFooterBackground: dark_background_colors.backgroundBaseSubdued,

      // TODO: update once aligned
      skeletonGradientStartStopBackground: SEMANTIC_COLORS.shade120,
      skeletonGradientMiddleBackground: SEMANTIC_COLORS.shade135,

      dragDropDraggingBackground: dark_background_colors.backgroundBaseSuccess,
      dragDropDraggingOverBackground:
        dark_background_colors.backgroundLightSuccess,

      listGroupItemBackgroundPrimaryActive:
        dark_background_colors.backgroundBaseSelect,
      listGroupItemBackgroundSubduedActive:
        dark_background_colors.backgroundBaseSelect,
      listGroupItemBackgroundHover: dark_background_colors.backgroundBaseHover,
      listGroupItemBackgroundPrimaryHover:
        dark_background_colors.backgroundBaseHover,
    },
  },
};
