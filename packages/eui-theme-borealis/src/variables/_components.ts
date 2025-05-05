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
  computed,
} from '@elastic/eui-theme-common';

import { SEMANTIC_COLORS } from './colors/_semantic_colors';
import {
  dark_background_colors,
  dark_border_colors,
} from './colors/_colors_dark';
import { border_colors } from './colors/_colors_light';
import { colorVis } from './colors/_colors_vis';
import { buttons } from './_buttons';
import { forms } from './_forms';

const component_colors: _EuiThemeComponentColors = {
  badgeBackground: computed(
    ([backgroundLightText]) => backgroundLightText,
    ['colors.backgroundLightText']
  ),
  badgeBackgroundSubdued: computed(
    ([backgroundLightText]) => backgroundLightText,
    ['colors.backgroundLightText']
  ),
  badgeBorderColorHollow: computed(
    ([borderBasePlain]) => borderBasePlain,
    ['colors.borderBasePlain']
  ),
  badgeIconButtonBackgroundHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),

  breadcrumbsApplicationBackground: computed(
    ([backgroundLightText]) => backgroundLightText,
    ['colors.backgroundLightText']
  ),
  breadcrumbsApplicationColor: computed(
    ([textSubdued]) => textSubdued,
    ['colors.textSubdued']
  ),

  bottomBarBackground: SEMANTIC_COLORS.plainDark,

  buttonGroupBackgroundDisabledSelected: computed(
    ([backgroundBaseDisabled]) => backgroundBaseDisabled,
    ['colors.backgroundBaseDisabled']
  ),
  buttonGroupBorderColor: computed(
    ([borderBasePlain]) => borderBasePlain,
    ['colors.borderBasePlain']
  ),
  buttonGroupBorderColorSelected: computed(
    ([borderBasePlain]) => borderBasePlain,
    ['colors.borderBasePlain']
  ),
  buttonGroupFocusColor: SEMANTIC_COLORS.plainDark,

  codeBackground: computed(
    ([backgroundBaseHighlighted]) => backgroundBaseHighlighted,
    ['colors.backgroundBaseHighlighted']
  ),
  codeBackgroundSelected: 'inherit',
  codeColor: computed(
    ([textParagraph]) => textParagraph,
    ['colors.textParagraph']
  ),
  codeInlineColor: colorVis.euiColorVisAsTextLight6,
  codeCommentColor: computed(
    ([textSubdued]) => textSubdued,
    ['colors.textSubdued']
  ),
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
  codeMetaColor: computed(
    ([textSubdued]) => textSubdued,
    ['colors.textSubdued']
  ),
  codeTitleColor: colorVis.euiColorVisAsTextLight4,
  codeSectionColor: colorVis.euiColorVisAsTextLight3,
  codeAdditionColor: colorVis.euiColorVisAsTextLight0,
  codeDeletionColor: colorVis.euiColorVisAsTextLight3,
  codeSelectorClassColor: 'inherit',
  codeSelectorIdColor: 'inherit',

  collapsibleNavGroupBackground: computed(
    ([backgroundBaseSubdued]) => backgroundBaseSubdued,
    ['colors.backgroundBaseSubdued']
  ),
  collapsibleNavGroupBackgroundDark:
    dark_background_colors.backgroundBaseSubdued,

  dataGridBorderColor: computed(
    ([borderBaseSubdued]) => borderBaseSubdued,
    ['colors.borderBaseSubdued']
  ),
  dataGridVerticalLineBorderColor: computed(
    ([borderBaseSubdued]) => borderBaseSubdued,
    ['colors.borderBaseSubdued']
  ),
  dataGridRowBackgroundStriped: computed(
    ([backgroundBaseSubdued]) => backgroundBaseSubdued,
    ['colors.backgroundBaseSubdued']
  ),
  dataGridRowBackgroundHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),
  dataGridRowBackgroundSelect: computed(
    ([backgroundBaseInteractiveSelect]) => backgroundBaseInteractiveSelect,
    ['colors.backgroundBaseInteractiveSelect']
  ),

  dragDropDraggingBackground: computed(
    ([backgroundBaseSuccess]) => backgroundBaseSuccess,
    ['colors.backgroundBaseSuccess']
  ),
  dragDropDraggingOverBackground: computed(
    ([backgroundLightSuccess]) => backgroundLightSuccess,
    ['colors.backgroundLightSuccess']
  ),

  filterButtonBadgeBackgroundHover: SEMANTIC_COLORS.shade25,

  filterSelectItemBackgroundFocusDisabled: computed(
    ([backgroundBaseDisabled]) => backgroundBaseDisabled,
    ['colors.backgroundBaseDisabled']
  ),

  flyoutFooterBackground: computed(
    ([backgroundBaseHighlighted]) => backgroundBaseHighlighted,
    ['colors.backgroundBaseHighlighted']
  ),
  flyoutCloseButtonInsideBackground: computed(
    ([backgroundBasePlain]) => backgroundBasePlain,
    ['colors.backgroundBasePlain']
  ),

  headerBackground: computed(
    ([backgroundBasePlain]) => backgroundBasePlain,
    ['colors.backgroundBasePlain']
  ),
  headerDarkBackground: dark_background_colors.backgroundBasePlain,
  headerDarkSearchBorderColor: dark_border_colors.borderBasePlain,
  headerDarkSectionItemBackgroundFocus:
    dark_background_colors.backgroundBasePrimary,

  keyPadMenuItemBackgroundDisabledSelect: computed(
    ([backgroundBaseDisabled]) => backgroundBaseDisabled,
    ['colors.backgroundBaseDisabled']
  ),

  listGroupItemBackgroundPrimaryActive: computed(
    ([backgroundBaseInteractiveSelect]) => backgroundBaseInteractiveSelect,
    ['colors.backgroundBaseInteractiveSelect']
  ),
  listGroupItemBackgroundSubduedActive: computed(
    ([backgroundBaseInteractiveSelect]) => backgroundBaseInteractiveSelect,
    ['colors.backgroundBaseInteractiveSelect']
  ),
  listGroupItemBackgroundHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),
  listGroupItemBackgroundPrimaryHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),

  // we don't want to inherit overrides (e.g. HCM)
  loadingSpinnerBorder: border_colors.borderBasePlain,
  loadingSpinnerHighlight: computed(
    ([borderStrongPrimary]) => borderStrongPrimary,
    ['colors.borderStrongPrimary']
  ),

  loadingChartMonoBackground0: SEMANTIC_COLORS.shade20,
  loadingChartMonoBackground1: SEMANTIC_COLORS.shade30,
  loadingChartMonoBackground2: SEMANTIC_COLORS.shade40,
  loadingChartMonoBackground3: SEMANTIC_COLORS.shade50,

  markBackground: computed(
    ([backgroundLightPrimary]) => backgroundLightPrimary,
    ['colors.backgroundLightPrimary']
  ),

  markdownFormatTableBorderColor: computed(
    ([borderBasePlain]) => borderBasePlain,
    ['colors.borderBasePlain']
  ),

  overlayMaskBackground: computed(
    ([backgroundBaseInteractiveOverlay]) => backgroundBaseInteractiveOverlay,
    ['colors.backgroundBaseInteractiveOverlay']
  ),
  overlayMaskBackgroundHighContrast: `rgba(${SEMANTIC_COLORS.shade140RGB}, 0.9)`,

  popoverPanelBackground: computed(
    ([backgroundBasePlain]) => backgroundBasePlain,
    ['colors.backgroundBasePlain']
  ),
  popoverFooterBorderColor: computed(
    ([borderBaseSubdued]) => borderBaseSubdued,
    ['colors.borderBaseSubdued']
  ),

  scrollbarTrackColor: SEMANTIC_COLORS.shade15,

  sideNavItemEmphasizedBackground: computed(
    ([backgroundBaseInteractiveSelect]) => backgroundBaseInteractiveSelect,
    ['colors.backgroundBaseInteractiveSelect']
  ),

  selectableListItemBorderColor: computed(
    ([borderBaseSubdued]) => borderBaseSubdued,
    ['colors.borderBaseSubdued']
  ),

  skeletonBackgroundSkeletonMiddleHighContrast: `rgba(${SEMANTIC_COLORS.shade100RGB}, 0.04)`,

  superDatePickerBackgroundSuccees: computed(
    ([backgroundBaseSuccess]) => backgroundBaseSuccess,
    ['colors.backgroundBaseSuccess']
  ),

  switchBackgroundOn: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['colors.backgroundFilledPrimary']
  ),
  switchBackgroundOff: computed(
    ([backgroundFilledText]) => backgroundFilledText,
    ['colors.backgroundFilledText']
  ),
  switchUncompressedBackgroundDisabled: computed(
    ([backgroundBaseFormsControlDisabled]) =>
      backgroundBaseFormsControlDisabled,
    ['colors.backgroundBaseFormsControlDisabled']
  ),
  switchCompressedBackgroundDisabled: computed(
    ([backgroundBaseFormsControlDisabled]) =>
      backgroundBaseFormsControlDisabled,
    ['colors.backgroundBaseFormsControlDisabled']
  ),
  switchMiniBackgroundDisabled: computed(
    ([backgroundBaseFormsControlDisabled]) =>
      backgroundBaseFormsControlDisabled,
    ['colors.backgroundBaseFormsControlDisabled']
  ),
  switchThumbBackgroundDisabled: computed(
    ([backgroundBasePlain]) => backgroundBasePlain,
    ['colors.backgroundBasePlain']
  ),
  switchThumbBorderOn: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['colors.backgroundFilledPrimary']
  ),
  switchThumbBorderOff: computed(
    ([backgroundFilledText]) => backgroundFilledText,
    ['colors.backgroundFilledText']
  ),
  switchIconDisabled: forms.LIGHT.iconDisabled,

  tableRowBackgroundHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),
  tableRowBackgroundSelected: computed(
    ([backgroundBaseInteractiveSelect]) => backgroundBaseInteractiveSelect,
    ['colors.backgroundBaseInteractiveSelect']
  ),
  tableRowBackgroundSelectedHover: computed(
    ([backgroundBaseInteractiveSelect]) => backgroundBaseInteractiveSelect,
    ['colors.backgroundBaseInteractiveSelect']
  ),
  tableRowInteractiveBackgroundHover: computed(
    ([backgroundBaseInteractiveSelect]) => backgroundBaseInteractiveSelect,
    ['colors.backgroundBaseInteractiveSelect']
  ),
  tableRowInteractiveBackgroundFocus: computed(
    ([backgroundBaseInteractiveSelect]) => backgroundBaseInteractiveSelect,
    ['colors.backgroundBaseInteractiveSelect']
  ),
  tableCellSortableIconColor: computed(
    ([backgroundFilledText]) => backgroundFilledText,
    ['colors.backgroundFilledText']
  ),

  tooltipBackground: dark_background_colors.backgroundBaseSubdued,
  tooltipBorder: dark_border_colors.borderBaseSubdued,
  tooltipBorderFloating: computed(
    ([borderBaseFloating]) => borderBaseFloating,
    ['colors.borderBaseFloating']
  ),

  tourFooterBackground: computed(
    ([backgroundBaseHighlighted]) => backgroundBaseHighlighted,
    ['colors.backgroundBaseHighlighted']
  ),

  treeViewItemBackgroundHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),
};

export const components: _EuiThemeComponents = {
  buttons,
  forms,
  LIGHT: component_colors,
  DARK: {
    ...component_colors,

    buttonGroupFocusColor: SEMANTIC_COLORS.plainLight,

    codeInlineColor: colorVis.euiColorVisAsTextDark6,
    codeStringColor: colorVis.euiColorVisAsTextDark2,
    codeTagColor: colorVis.euiColorVisAsTextDark1,
    codeNameColor: colorVis.euiColorVisAsTextDark1,
    codeNumberColor: colorVis.euiColorVisAsTextDark0,
    codeKeywordColor: colorVis.euiColorVisAsTextDark6,
    codeTypeColor: colorVis.euiColorVisAsTextDark1,
    codeSymbolColor: colorVis.euiColorVisAsTextDark3,
    codeTitleColor: colorVis.euiColorVisAsTextDark4,
    codeSectionColor: colorVis.euiColorVisAsTextDark3,
    codeAdditionColor: colorVis.euiColorVisAsTextDark0,
    codeDeletionColor: colorVis.euiColorVisAsTextDark3,

    filterButtonBadgeBackgroundHover: SEMANTIC_COLORS.shade105,

    loadingSpinnerBorder: dark_border_colors.borderBasePlain,

    loadingChartMonoBackground0: SEMANTIC_COLORS.shade110,
    loadingChartMonoBackground1: SEMANTIC_COLORS.shade100,
    loadingChartMonoBackground2: SEMANTIC_COLORS.shade90,
    loadingChartMonoBackground3: SEMANTIC_COLORS.shade80,

    overlayMaskBackgroundHighContrast: `rgba(${SEMANTIC_COLORS.shade140RGB}, 0.9)`,

    scrollbarTrackColor: SEMANTIC_COLORS.shade145,

    skeletonBackgroundSkeletonMiddleHighContrast: `rgba(${SEMANTIC_COLORS.plainLightRGB}, 0.3)`,

    switchIconDisabled: forms.DARK.iconDisabled,

    // TODO: align table hover states
    tableRowInteractiveBackgroundHover: computed(
      ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
      ['colors.backgroundBaseInteractiveHover']
    ),
    tableRowInteractiveBackgroundFocus: computed(
      ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
      ['colors.backgroundBaseInteractiveHover']
    ),
  },
};
