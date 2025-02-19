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

import { computed } from '../../../../services/theme/utils';
import {
  shade,
  tint,
  transparentize,
} from '../../../../services/color/manipulation';
import { makeHighContrastColor } from '../../../../services/color/contrast';

import { buttons } from './_buttons';
import { forms } from './_forms';
import { colorVis } from './_colors_vis';

const component_colors: _EuiThemeComponentColors = {
  badgeBackground: computed(
    ([lightShade]) => lightShade,
    ['colors.lightShade']
  ),
  badgeBackgroundSubdued: computed(
    ([lightShade]) => tint(lightShade, 0.3),
    ['colors.lightShade']
  ),
  badgeBorderColorHollow: computed(([color]) => color, ['border.color']),
  badgeIconButtonBackgroundHover: computed(
    ([ghost]) => transparentize(ghost, 0.8),
    ['colors.ghost']
  ),

  breadcrumbsApplicationBackground: computed(
    ([darkestShade]) => tint(darkestShade, 0.85),
    ['colors.darkestShade']
  ),
  breadcrumbsApplicationColor: computed(
    ([darkestShade]) => tint(darkestShade, 0.2),
    ['colors.darkestShade']
  ),

  buttonGroupBorderColor: computed(
    ([fullShade]) => transparentize(fullShade, 0.1),
    ['colors.fullShade']
  ),
  buttonGroupBorderColorSelected: computed(
    ([emptyShade]) => transparentize(emptyShade, 0.2),
    ['colors.emptyShade']
  ),
  buttonGroupFocusColor: computed(
    ([fullShade]) => fullShade,
    ['colors.fullShade']
  ),

  bottomBarBackground: computed(
    ([lightestShade]) => shade(lightestShade, 0.5),
    ['colors.lightestShade']
  ),

  codeBackground: computed(
    ([lightestShade]) => lightestShade,
    ['colors.lightestShade']
  ),
  codeBackgroundSelected: 'inherit',
  codeColor: computed(
    ([lightestShade, text]) => makeHighContrastColor(text)(lightestShade),
    ['colors.lightestShade', 'colors.text']
  ),
  codeInlineColor: computed(
    ([lightestShade]) =>
      makeHighContrastColor(colorVis.euiColorVis3)(lightestShade),
    ['colors.lightestShade']
  ),
  codeCommentColor: computed(
    ([lightestShade, subduedText]) =>
      makeHighContrastColor(subduedText)(lightestShade),
    ['colors.lightestShade', 'colors.subduedText']
  ),
  codeSelectorColor: 'inherit',
  codeStringColor: computed(
    ([lightestShade]) =>
      makeHighContrastColor(colorVis.euiColorVis2)(lightestShade),
    ['colors.lightestShade']
  ),
  codeTagColor: computed(
    ([lightestShade]) =>
      makeHighContrastColor(colorVis.euiColorVis1)(lightestShade),
    ['colors.lightestShade']
  ),
  codeNameColor: computed(
    ([lightestShade]) =>
      makeHighContrastColor(colorVis.euiColorVis1)(lightestShade),
    ['colors.lightestShade']
  ),
  codeNumberColor: computed(
    ([lightestShade]) =>
      makeHighContrastColor(colorVis.euiColorVis0)(lightestShade),
    ['colors.lightestShade']
  ),
  codeInlineCodeKeywordColor: computed(
    ([lightestShade]) =>
      makeHighContrastColor(colorVis.euiColorVis6)(lightestShade),
    ['colors.lightestShade']
  ),
  codeKeywordColor: computed(
    ([lightestShade]) =>
      makeHighContrastColor(colorVis.euiColorVis3)(lightestShade),
    ['colors.lightestShade']
  ),
  codeFunctionTitleColor: 'inherit',
  codeTypeColor: computed(
    ([lightestShade]) =>
      makeHighContrastColor(colorVis.euiColorVis1)(lightestShade),
    ['colors.lightestShade']
  ),
  codeAttributeColor: 'inherit',
  codeSymbolColor: computed(
    ([lightestShade]) =>
      makeHighContrastColor(colorVis.euiColorVis9)(lightestShade),
    ['colors.lightestShade']
  ),
  codeParamsColor: 'inherit',
  codeMetaColor: computed(
    ([lightestShade, subduedText]) =>
      makeHighContrastColor(subduedText)(lightestShade),
    ['colors.lightestShade', 'colors.subduedText']
  ),
  codeTitleColor: computed(
    ([lightestShade]) =>
      makeHighContrastColor(colorVis.euiColorVis7)(lightestShade),
    ['colors.lightestShade']
  ),
  codeSectionColor: computed(
    ([lightestShade]) =>
      makeHighContrastColor(colorVis.euiColorVis9)(lightestShade),
    ['colors.lightestShade']
  ),
  codeAdditionColor: computed(
    ([lightestShade]) =>
      makeHighContrastColor(colorVis.euiColorVis0)(lightestShade),
    ['colors.lightestShade']
  ),
  codeDeletionColor: computed(
    ([lightestShade, danger]) => makeHighContrastColor(danger)(lightestShade),
    ['colors.lightestShade', 'colors.danger']
  ),
  codeSelectorClassColor: 'inherit',
  codeSelectorIdColor: 'inherit',

  collapsibleNavGroupBackground: computed(([body]) => body, ['colors.body']),
  collapsibleNavGroupBackgroundDark: computed(
    ([darkestShade]) => shade(darkestShade, 0.2),
    ['colors.darkestShade']
  ),

  dataGridBorderColor: computed(([color]) => color, ['border.color']),
  dataGridVerticalLineBorderColor: computed(
    ([color]) => tint(color, 0.3),
    ['border.color']
  ),
  dataGridRowBackgroundStriped: computed(
    ([lightestShade]) => lightestShade,
    ['colors.lightestShade']
  ),
  dataGridRowBackgroundHover: computed(
    ([highlight]) => highlight,
    ['colors.highlight']
  ),
  dataGridRowBackgroundSelect: computed(
    ([highlight]) => highlight,
    ['colors.highlight']
  ),

  dragDropDraggingBackground: computed(
    ([success]) => transparentize(success, 0.1),
    ['colors.success']
  ),
  dragDropDraggingOverBackground: computed(
    ([success]) => transparentize(success, 0.25),
    ['colors.success']
  ),

  filterSelectItemBackgroundFocusDisabled: computed(
    ([disabled]) => transparentize(disabled, 0.1),
    ['colors.disabled']
  ),

  flyoutFooterBackground: computed(
    ([lightestShade]) => lightestShade,
    ['colors.lightestShade']
  ),
  flyoutCloseButtonInsideBackground: computed(
    ([emptyShade]) => transparentize(emptyShade, 0.9),
    ['colors.emptyShade']
  ),

  headerBackground: computed(
    ([emptyShade]) => emptyShade,
    ['colors.emptyShade']
  ),
  headerDarkBackground: computed(
    ([darkestShade]) => shade(darkestShade, 0.28),
    ['colors.darkestShade']
  ),
  headerDarkSearchBorderColor: computed(
    ([ghost]) => transparentize(ghost, 0.3),
    ['colors.ghost']
  ),
  headerDarkSectionItemBackgroundFocus: computed(
    ([primary]) => shade(primary, 0.5),
    ['colors.primary']
  ),

  keyPadMenuItemBackgroundDisabledSelect: computed(
    ([disabled]) => transparentize(disabled, 0.1),
    ['colors.disabled']
  ),

  listGroupItemBackgroundPrimaryActive: computed(
    ([lightShade]) => transparentize(lightShade, 0.2),
    ['colors.lightShade']
  ),
  listGroupItemBackgroundSubduedActive: computed(
    ([primary]) => transparentize(primary, 0.1),
    ['colors.primary']
  ),
  listGroupItemBackgroundHover: computed(
    ([lightShade]) => transparentize(lightShade, 0.2),
    ['colors.lightShade']
  ),
  listGroupItemBackgroundPrimaryHover: computed(
    ([primary]) => transparentize(primary, 0.1),
    ['colors.primary']
  ),

  loadingSpinnerBorder: computed(
    ([lightShade]) => lightShade,
    ['colors.lightShade']
  ),
  loadingSpinnerHighlight: computed(([primary]) => primary, ['colors.primary']),

  loadingChartMonoBackground0: computed(
    ([lightShade]) => lightShade,
    ['colors.lightShade']
  ),
  loadingChartMonoBackground1: computed(
    ([lightShade]) => shade(lightShade, 0.04),
    ['colors.lightShade']
  ),
  loadingChartMonoBackground2: computed(
    ([lightShade]) => shade(lightShade, 0.08),
    ['colors.lightShade']
  ),
  loadingChartMonoBackground3: computed(
    ([lightShade]) => shade(lightShade, 0.12),
    ['colors.lightShade']
  ),

  markBackground: computed(
    ([primary]) => transparentize(primary, 0.1),
    ['colors.primary']
  ),

  markdownFormatTableBorderColor: computed(
    ([fullShade]) => transparentize(fullShade, 0.15),
    ['colors.fullShade']
  ),

  popoverPanelBackground: computed(
    ([emptyShade]) => emptyShade,
    ['colors.emptyShade']
  ),
  popoverFooterBorderColor: computed(([color]) => color, ['border.color']),

  scrollbarTrackColor: computed(([body]) => shade(body, 0.03), ['colors.body']),

  sideNavItemEmphasizedBackground: computed(
    ([lightShade]) => transparentize(lightShade, 0.3),
    ['colors.lightShade']
  ),

  selectableListItemBorderColor: computed(
    ([color]) => transparentize(color, 0.4),
    ['border.color']
  ),

  superDatePickerBackgroundSuccees: computed(
    ([success]) => tint(success, 0.9),
    ['colors.success']
  ),

  switchBackgroundOn: computed(([primary]) => primary, ['colors.primary']),
  switchBackgroundOff: computed(
    ([lightestShade]) => shade(lightestShade, 0.4),
    ['colors.lightestShade']
  ),
  switchUncompressedBackgroundDisabled: computed(
    ([lightShade]) => tint(lightShade, 0.5),
    ['colors.lightShade']
  ),
  switchCompressedBackgroundDisabled: computed(
    ([lightShade]) => tint(lightShade, 0.25),
    ['colors.lightShade']
  ),
  switchMiniBackgroundDisabled: computed(
    ([lightShade]) => tint(lightShade, 0),
    ['colors.lightShade']
  ),
  switchThumbBackgroundDisabled: 'transparent',
  switchThumbBorderOn: computed(
    ([lightestShade]) => shade(lightestShade, 0.4),
    ['colors.lightestShade']
  ),
  switchThumbBorderOff: computed(
    ([lightestShade]) => shade(lightestShade, 0.4),
    ['colors.lightestShade']
  ),
  switchIconDisabled: computed(
    ([lightestShade]) => shade(lightestShade, 0.4),
    ['colors.lightestShade']
  ),

  tableRowBackgroundHover: computed(
    ([lightestShade]) => tint(lightestShade, 0.5),
    ['colors.lightestShade']
  ),
  tableRowBackgroundSelected: computed(
    ([primary]) => tint(primary, 0.96),
    ['colors.primary']
  ),
  tableRowBackgroundSelectedHover: computed(
    ([primary]) => tint(primary, 0.9),
    ['colors.primary']
  ),
  tableRowInteractiveBackgroundHover: computed(
    ([primary]) => transparentize(primary, 0.05),
    ['colors.primary']
  ),
  tableRowInteractiveBackgroundFocus: computed(
    ([primary]) => transparentize(primary, 0.1),
    ['colors.primary']
  ),
  tableCellSortableIconColor: computed(
    ([emptyShade, subduedText]) => {
      const color = tint(subduedText, 0.9);
      return makeHighContrastColor(
        // Tint it arbitrarily high, the contrast util will take care of lowering back down to WCAG
        color,
        3 // 3:1 ratio from https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
      )(emptyShade);
    },
    ['colors.emptyShade', 'colors.subduedText']
  ),

  tooltipBackground: computed(
    ([fullShade]) => tint(fullShade, 0.25),
    ['colors.fullShade']
  ),
  tooltipBorder: computed(
    ([fullShade]) => tint(fullShade, 0.35),
    ['colors.fullShade']
  ),
  tooltipBorderFloating: computed(
    ([borderBaseFloating]) => borderBaseFloating,
    ['colors.borderBaseFloating']
  ),

  tourFooterBackground: computed(
    ([lightestShade]) => tint(lightestShade, 0.5),
    ['colors.lightestShade']
  ),

  treeViewItemBackgroundHover: computed(
    ([text]) => transparentize(text, 0.1),
    ['colors.text']
  ),
};

export const components: _EuiThemeComponents = {
  buttons,
  forms,
  LIGHT: component_colors,
  DARK: {
    ...component_colors,

    badgeBorderColorHollow: computed(
      ([color]) => tint(color, 0.15),
      ['border.color']
    ),

    breadcrumbsApplicationBackground: computed(
      ([darkestShade]) => shade(darkestShade, 0.7),
      ['colors.darkestShade']
    ),
    breadcrumbsApplicationColor: computed(
      ([darkestShade]) => shade(darkestShade, 0.2),
      ['colors.darkestShade']
    ),

    collapsibleNavGroupBackground: computed(
      ([lightestShade]) => shade(lightestShade, 0.5),
      ['colors.lightestShade']
    ),
    collapsibleNavGroupBackgroundDark: computed(
      ([lightestShade]) => shade(lightestShade, 0.5),
      ['colors.lightestShade']
    ),

    dataGridVerticalLineBorderColor: computed(
      ([color]) => shade(color, 0.3),
      ['border.color']
    ),

    headerDarkBackground: computed(
      ([lightestShade]) => shade(lightestShade, 0.5),
      ['colors.lightestShade']
    ),

    keyPadMenuItemBackgroundDisabledSelect: computed(
      ([disabled]) => transparentize(disabled, 0.2),
      ['colors.disabled']
    ),

    listGroupItemBackgroundSubduedActive: computed(
      ([lightShade]) => transparentize(lightShade, 0.4),
      ['colors.lightShade']
    ),

    loadingChartMonoBackground0: computed(
      ([lightShade]) => lightShade,
      ['colors.lightShade']
    ),
    loadingChartMonoBackground1: computed(
      ([lightShade]) => tint(lightShade, 0.04),
      ['colors.lightShade']
    ),
    loadingChartMonoBackground2: computed(
      ([lightShade]) => tint(lightShade, 0.08),
      ['colors.lightShade']
    ),
    loadingChartMonoBackground3: computed(
      ([lightShade]) => tint(lightShade, 0.12),
      ['colors.lightShade']
    ),

    markBackground: computed(
      ([primary]) => transparentize(primary, 0.3),
      ['colors.primary']
    ),

    popoverPanelBackground: computed(
      ([emptyShade]) => tint(emptyShade, 0.025),
      ['colors.emptyShade']
    ),

    scrollbarTrackColor: computed(
      ([body]) => tint(body, 0.07),
      ['colors.body']
    ),

    superDatePickerBackgroundSuccees: computed(
      ([success]) => shade(success, 0.7),
      ['colors.success']
    ),

    switchBackgroundOff: computed(
      ([lightestShade]) => tint(lightestShade, 0.31),
      ['colors.lightestShade']
    ),
    switchUncompressedBackgroundDisabled: computed(
      ([lightShade]) => lightShade,
      ['colors.lightShade']
    ),
    switchCompressedBackgroundDisabled: computed(
      ([lightShade]) => lightShade,
      ['colors.lightShade']
    ),
    switchMiniBackgroundDisabled: computed(
      ([lightShade]) => lightShade,
      ['colors.lightShade']
    ),
    switchThumbBorderOn: computed(
      ([lightestShade]) => tint(lightestShade, 0.31),
      ['colors.lightestShade']
    ),
    switchThumbBorderOff: computed(
      ([lightestShade]) => tint(lightestShade, 0.31),
      ['colors.lightestShade']
    ),
    switchIconDisabled: computed(
      ([lightestShade]) => tint(lightestShade, 0.31),
      ['colors.lightestShade']
    ),

    tableRowBackgroundHover: computed(
      ([lightestShade]) => lightestShade,
      ['colors.lightestShade']
    ),
    tableRowBackgroundSelected: computed(
      ([primary]) => shade(primary, 0.7),
      ['colors.primary']
    ),
    tableRowBackgroundSelectedHover: computed(
      ([primary]) => shade(primary, 0.75),
      ['colors.primary']
    ),
    tableCellSortableIconColor: computed(
      ([emptyShade, subduedText]) => {
        const color = shade(subduedText, 0.9);
        return makeHighContrastColor(color, 3)(emptyShade);
      },
      ['colors.emptyShade', 'colors.subduedText']
    ),

    tooltipBackground: computed(
      ([emptyShade]) => shade(emptyShade, 1),
      ['colors.emptyShade']
    ),
    tooltipBorder: computed(
      ([fullShade]) => shade(fullShade, 0.8),
      ['colors.fullShade']
    ),

    tourFooterBackground: computed(
      ([lightestShade]) => shade(lightestShade, 0.45),
      ['colors.lightestShade']
    ),

    treeViewItemBackgroundHover: computed(
      ([text]) => transparentize(text, 0.2),
      ['colors.text']
    ),
  },
};
