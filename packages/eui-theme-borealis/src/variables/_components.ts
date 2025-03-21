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
import { colorVis } from './colors/_colors_vis';

const component_colors: _EuiThemeComponentColors = {
  badgeBackground: background_colors.backgroundLightText,
  badgeBackgroundSubdued: background_colors.backgroundLightText,
  badgeBorderColorHollow: border_colors.borderBasePlain,
  badgeIconButtonBackgroundHover:
    background_colors.backgroundBaseInteractiveHover,

  breadcrumbsApplicationBackground: background_colors.backgroundLightText,
  breadcrumbsApplicationColor: text_colors.textSubdued,

  bottomBarBackground: SEMANTIC_COLORS.plainDark,

  buttonGroupBackgroundDisabledSelected:
    background_colors.backgroundBaseFormsControlDisabled,
  buttonGroupBorderColor: border_colors.borderBasePlain,
  buttonGroupBorderColorSelected: border_colors.borderBasePlain,
  buttonGroupFocusColor: brand_text_colors.textPrimary,

  codeBackground: background_colors.backgroundBaseHighlighted,
  codeBackgroundSelected: 'inherit',
  codeColor: text_colors.textParagraph,
  codeInlineColor: colorVis.euiColorVisAsTextLight6,
  codeCommentColor: text_colors.textSubdued,
  codeSelectorColor: 'inherit',
  codeStringColor: colorVis.euiColorVisAsTextLight2,
  codeTagColor: colorVis.euiColorVisAsTextLight1,
  codeNameColor: colorVis.euiColorVisAsTextLight1,
  codeNumberColor: colorVis.euiColorVisAsTextLight0,
  codeInlineCodeKeywordColor: colorVis.euiColorVisAsTextLight6,
  codeKeywordColor: colorVis.euiColorVisAsTextLight1,
  codeFunctionTitleColor: 'inherit',
  codeTypeColor: colorVis.euiColorVisAsTextLight1,
  codeAttributeColor: 'inherit',
  codeSymbolColor: colorVis.euiColorVisAsTextLight3,
  codeParamsColor: 'inherit',
  codeMetaColor: text_colors.textSubdued,
  codeTitleColor: colorVis.euiColorVisAsTextLight4,
  codeSectionColor: colorVis.euiColorVisAsTextLight3,
  codeAdditionColor: colorVis.euiColorVisAsTextLight0,
  codeDeletionColor: colorVis.euiColorVisAsTextLight3,
  codeSelectorClassColor: 'inherit',
  codeSelectorIdColor: 'inherit',

  collapsibleNavGroupBackground: background_colors.backgroundBaseSubdued,
  collapsibleNavGroupBackgroundDark:
    dark_background_colors.backgroundBaseSubdued,

  dataGridBorderColor: border_colors.borderBaseSubdued,
  dataGridVerticalLineBorderColor: border_colors.borderBaseSubdued,
  dataGridRowBackgroundStriped: background_colors.backgroundBaseSubdued,
  dataGridRowBackgroundHover: background_colors.backgroundBaseInteractiveHover,
  dataGridRowBackgroundSelect:
    background_colors.backgroundBaseInteractiveSelect,

  dragDropDraggingBackground: background_colors.backgroundBaseSuccess,
  dragDropDraggingOverBackground: background_colors.backgroundLightSuccess,

  filterSelectItemBackgroundFocusDisabled:
    background_colors.backgroundBaseDisabled,

  flyoutFooterBackground: background_colors.backgroundBaseHighlighted,
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

  loadingSpinnerBorder: border_colors.borderBasePlain,
  loadingSpinnerHighlight: border_colors.borderStrongPrimary,

  loadingChartMonoBackground0: SEMANTIC_COLORS.shade20,
  loadingChartMonoBackground1: SEMANTIC_COLORS.shade30,
  loadingChartMonoBackground2: SEMANTIC_COLORS.shade40,
  loadingChartMonoBackground3: SEMANTIC_COLORS.shade50,

  markBackground: background_colors.backgroundLightPrimary,

  markdownFormatTableBorderColor: border_colors.borderBasePlain,

  overlayMaskBackground: background_colors.backgroundBaseInteractiveOverlay,
  overlayMaskBackgroundHighContrast: `rgba(${SEMANTIC_COLORS.shade140RGB}, 0.9)`,

  popoverPanelBackground: background_colors.backgroundBasePlain,
  popoverFooterBorderColor: border_colors.borderBaseSubdued,

  scrollbarTrackColor: SEMANTIC_COLORS.shade15,

  sideNavItemEmphasizedBackground:
    background_colors.backgroundBaseInteractiveSelect,

  selectableListItemBorderColor: border_colors.borderBaseSubdued,

  skeletonBackgroundSkeletonMiddleHighContrast: `rgba(${SEMANTIC_COLORS.shade100RGB}, 0.04)`,

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

  tourFooterBackground: background_colors.backgroundBaseHighlighted,

  treeViewItemBackgroundHover: background_colors.backgroundBaseInteractiveHover,
};

export const components: _EuiThemeComponents = {
  buttons,
  forms,
  LIGHT: component_colors,
  DARK: {
    ...component_colors,

    badgeBackground: dark_background_colors.backgroundLightText,
    badgeBackgroundSubdued: dark_background_colors.backgroundLightText,
    badgeBorderColorHollow: dark_border_colors.borderBasePlain,
    badgeIconButtonBackgroundHover:
      dark_background_colors.backgroundBaseInteractiveHover,

    breadcrumbsApplicationBackground:
      dark_background_colors.backgroundLightText,
    breadcrumbsApplicationColor: dark_text_colors.textSubdued,

    buttonGroupBackgroundDisabledSelected:
      dark_background_colors.backgroundBaseFormsControlDisabled,
    buttonGroupBorderColor: dark_border_colors.borderBasePlain,
    buttonGroupBorderColorSelected: dark_border_colors.borderBasePlain,
    buttonGroupFocusColor: dark_brand_text_colors.textPrimary,

    codeBackground: dark_background_colors.backgroundBaseHighlighted,
    codeBackgroundSelected: 'inherit',
    codeColor: dark_text_colors.textParagraph,
    codeInlineColor: colorVis.euiColorVisAsTextDark6,
    codeCommentColor: dark_text_colors.textSubdued,
    codeSelectorColor: 'inherit',
    codeStringColor: colorVis.euiColorVisAsTextDark2,
    codeTagColor: colorVis.euiColorVisAsTextDark1,
    codeNameColor: colorVis.euiColorVisAsTextDark1,
    codeNumberColor: colorVis.euiColorVisAsTextDark0,
    codeKeywordColor: colorVis.euiColorVisAsTextDark6,
    codeFunctionTitleColor: 'inherit',
    codeTypeColor: colorVis.euiColorVisAsTextDark1,
    codeAttributeColor: 'inherit',
    codeSymbolColor: colorVis.euiColorVisAsTextDark3,
    codeParamsColor: 'inherit',
    codeMetaColor: dark_text_colors.textSubdued,
    codeTitleColor: colorVis.euiColorVisAsTextDark4,
    codeSectionColor: colorVis.euiColorVisAsTextDark3,
    codeAdditionColor: colorVis.euiColorVisAsTextDark0,
    codeDeletionColor: colorVis.euiColorVisAsTextDark3,
    codeSelectorClassColor: 'inherit',
    codeSelectorIdColor: 'inherit',

    collapsibleNavGroupBackground: dark_background_colors.backgroundBaseSubdued,
    collapsibleNavGroupBackgroundDark:
      dark_background_colors.backgroundBaseSubdued,

    dataGridBorderColor: dark_border_colors.borderBaseSubdued,
    dataGridVerticalLineBorderColor: dark_border_colors.borderBaseSubdued,
    dataGridRowBackgroundStriped: dark_background_colors.backgroundBaseSubdued,
    dataGridRowBackgroundHover:
      dark_background_colors.backgroundBaseInteractiveHover,
    dataGridRowBackgroundSelect:
      dark_background_colors.backgroundBaseInteractiveSelect,

    dragDropDraggingBackground: dark_background_colors.backgroundBaseSuccess,
    dragDropDraggingOverBackground:
      dark_background_colors.backgroundLightSuccess,

    filterSelectItemBackgroundFocusDisabled:
      dark_background_colors.backgroundBaseDisabled,

    flyoutFooterBackground: dark_background_colors.backgroundBaseHighlighted,
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

    loadingSpinnerBorder: dark_border_colors.borderBasePlain,
    loadingSpinnerHighlight: dark_border_colors.borderStrongPrimary,

    loadingChartMonoBackground0: SEMANTIC_COLORS.shade110,
    loadingChartMonoBackground1: SEMANTIC_COLORS.shade100,
    loadingChartMonoBackground2: SEMANTIC_COLORS.shade90,
    loadingChartMonoBackground3: SEMANTIC_COLORS.shade80,

    markBackground: dark_background_colors.backgroundLightPrimary,

    markdownFormatTableBorderColor: dark_border_colors.borderBasePlain,

    overlayMaskBackground:
      dark_background_colors.backgroundBaseInteractiveOverlay,
    overlayMaskBackgroundHighContrast: `rgba(${SEMANTIC_COLORS.shade140RGB}, 0.9)`,

    popoverPanelBackground: dark_background_colors.backgroundBasePlain,
    popoverFooterBorderColor: dark_border_colors.borderBaseSubdued,

    scrollbarTrackColor: SEMANTIC_COLORS.shade145,

    sideNavItemEmphasizedBackground:
      dark_background_colors.backgroundBaseInteractiveSelect,

    selectableListItemBorderColor: dark_border_colors.borderBaseSubdued,

    skeletonBackgroundSkeletonMiddleHighContrast: `rgba(${SEMANTIC_COLORS.plainLightRGB}, 0.3)`,

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

    tourFooterBackground: dark_background_colors.backgroundBaseHighlighted,

    treeViewItemBackgroundHover:
      dark_background_colors.backgroundBaseInteractiveHover,
  },
};
