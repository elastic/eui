import React, { createElement, Fragment } from 'react';

import { slugify } from '../../src/services';

import { GuideSection, GuideMarkdownFormat } from './components';

import { GuideTabbedPage } from './components/guide_tabbed_page';

import { EuiErrorBoundary } from '../../src/components';

import { playgroundCreator } from './services/playground';

// Guidelines
import { GettingStarted } from './views/guidelines/getting_started/getting_started';

import AccessibilityGuidelines from './views/guidelines/accessibility';

import {
  WritingGuidelines,
  writingGuidelinesSections,
} from './views/guidelines/writing_guidelines';
import {
  WritingExamples,
  writingExamplesSections,
} from './views/guidelines/writing_examples';

// Templates

import {
  PageTemplateGuidelines,
  pageTemplateGuidelinesSections,
} from './views/page_template/guidelines';
import {
  PageTemplateInfo,
  PageTemplateExample,
  pageTemplateExamplesSections,
} from './views/page_template/examples';

import { SitewideSearchExample } from './views/selectable/selectable_templates/sitewide_example';

// Services

import { ColorPaletteExample } from './views/color_palette/color_palette_example';

import { PrettyDurationExample } from './views/pretty_duration/pretty_duration_example';

import { UtilityClassesExample } from './views/utility_classes/utility_classes_example';

// Component examples

import { AccessibilityExample } from './views/accessibility/accessibility_example';

import { AccordionExample } from './views/accordion/accordion_example';

import { AspectRatioExample } from './views/aspect_ratio/aspect_ratio_example';

import { AutoRefreshExample } from './views/auto_refresh/auto_refresh_example';

import { AutoSizerExample } from './views/auto_sizer/auto_sizer_example';

import { AvatarExample } from './views/avatar/avatar_example';

import { BadgeExample } from './views/badge/badge_example';

import { BeaconExample } from './views/beacon/beacon_example';

import { BottomBarExample } from './views/bottom_bar/bottom_bar_example';

import { BreadcrumbsExample } from './views/breadcrumbs/breadcrumbs_example';

import { ButtonExample } from './views/button/button_example';

import { CardExample } from './views/card/card_example';

import { CallOutExample } from './views/call_out/call_out_example';

import { CodeExample } from './views/code/code_example';

import { CollapsibleNavExample } from './views/collapsible_nav/collapsible_nav_example';

import { ColorPickerExample } from './views/color_picker/color_picker_example';

import { ComboBoxExample } from './views/combo_box/combo_box_example';

import { CommentListExample } from './views/comment/comment_example';

import { ContextMenuExample } from './views/context_menu/context_menu_example';

import { CopyExample } from './views/copy/copy_example';

import { DataGridExample } from './views/datagrid/basics/datagrid_example';
import { DataGridCellsExample } from './views/datagrid/cells_popovers/datagrid_cells_example';
import { DataGridToolbarExample } from './views/datagrid/toolbar/datagrid_toolbar_example';
import { DataGridColumnsExample } from './views/datagrid/schema_columns/datagrid_columns_example';
import { DataGridStylingExample } from './views/datagrid/styling/datagrid_styling_example';
import { DataGridAdvancedExample } from './views/datagrid/advanced/datagrid_advanced_example';

import { DatePickerExample } from './views/date_picker/date_picker_example';

import { DelayRenderExample } from './views/delay_render/delay_render_example';

import { DescriptionListExample } from './views/description_list/description_list_example';

import { DragAndDropExample } from './views/drag_and_drop/drag_and_drop_example';

import { EmptyPromptExample } from './views/empty_prompt/empty_prompt_example';

import { ErrorBoundaryExample } from './views/error_boundary/error_boundary_example';

import { ExpressionExample } from './views/expression/expression_example';

import { FacetExample } from './views/facet/facet_example';

import { FilterGroupExample } from './views/filter_group/filter_group_example';

import { FlexExample } from './views/flex/flex_example';

import { FlyoutExample } from './views/flyout/flyout_example';

import { FocusTrapExample } from './views/focus_trap/focus_trap_example';

import { FormControlsExample } from './views/form_controls/form_controls_example';

import { SelectionControlsExample } from './views/selection_controls/selection_controls_example';

import { FormLayoutsExample } from './views/form_layouts/form_layouts_example';

import { FormCompressedExample } from './views/form_compressed/form_compressed_example';

import { FormValidationExample } from './views/form_validation/form_validation_example';

import { HeaderExample } from './views/header/header_example';

import { HealthExample } from './views/health/health_example';

import { HighlightAndMarkExample } from './views/highlight_and_mark/highlight_and_mark_example';

import { HorizontalRuleExample } from './views/horizontal_rule/horizontal_rule_example';

import { HtmlIdGeneratorExample } from './views/html_id_generator/html_id_generator_example';

import { I18nExample } from './views/i18n/i18n_example';

import { IconExample } from './views/icon/icon_example';

import { ImageExample } from './views/image/image_example';

import { InnerTextExample } from './views/inner_text/inner_text_example';

import { InlineEditExample } from './views/inline_edit/inline_edit_example';

import { KeyPadMenuExample } from './views/key_pad_menu/key_pad_menu_example';

import { LinkExample } from './views/link/link_example';

import { ListGroupExample } from './views/list_group/list_group_example';

import { LoadingExample } from './views/loading/loading_example';

import { MarkdownEditorExample } from './views/markdown_editor/markdown_editor_example';

import { MarkdownFormatExample } from './views/markdown_editor/markdown_format_example';

import { MarkdownPluginExample } from './views/markdown_editor/markdown_plugin_example';

import { ModalExample } from './views/modal/modal_example';

import { MutationObserverExample } from './views/mutation_observer/mutation_observer_example';

import { OutsideClickDetectorExample } from './views/outside_click_detector/outside_click_detector_example';

import { OverlayMaskExample } from './views/overlay_mask/overlay_mask_example';

import { PageExample } from './views/page_components/page_example';

import { PageHeaderExample } from './views/page_header/page_header_example';

import { PaginationExample } from './views/pagination/pagination_example';

import { PanelExample } from './views/panel/panel_example';

import { PopoverExample } from './views/popover/popover_example';

import { PortalExample } from './views/portal/portal_example';

import { ProgressExample } from './views/progress/progress_example';

import { ProviderExample } from './views/provider/provider_example';

import { RangeControlExample } from './views/range/range_example';

import { TreeViewExample } from './views/tree_view/tree_view_example';

import { ResizeObserverExample } from './views/resize_observer/resize_observer_example';

import { ResizableContainerExample } from './views/resizable_container/resizable_container_example';

import { ScrollExample } from './views/scroll/scroll_example';

import { SearchBarExample } from './views/search_bar/search_bar_example';

import { SelectableExample } from './views/selectable/selectable_example';

import { SideNavExample } from './views/side_nav/side_nav_example';

import { SkeletonExample } from './views/skeleton/skeleton_example';

import { SpacerExample } from './views/spacer/spacer_example';

import { StatExample } from './views/stat/stat_example';

import { StepsExample } from './views/steps/steps_example';

import { SuperDatePickerExample } from './views/super_date_picker/super_date_picker_example';

import { TableExample } from './views/tables/tables_example';

import { TableInMemoryExample } from './views/tables/tables_in_memory_example';

import { TabsExample } from './views/tabs/tabs_example';

import { TextDiffExample } from './views/text_diff/text_diff_example';

import { TextTruncateExample } from './views/text_truncate/text_truncate_example';

import { TextExample } from './views/text/text_example';

import { TimelineExample } from './views/timeline/timeline_example';

import { TitleExample } from './views/title/title_example';

import { ToastExample } from './views/toast/toast_example';

import { ToolTipExample } from './views/tool_tip/tool_tip_example';

import { TourExample } from './views/tour/tour_example';

import { WindowEventExample } from './views/window_event/window_event_example';

import { Changelog } from './views/package/changelog';

import { I18nTokens } from './views/package/i18n_tokens';

import { SuperSelectExample } from './views/super_select/super_select_example';

import { ThemeExample } from './views/theme/theme_example';
import { ColorModeExample } from './views/theme/color_mode/color_mode_example';
import { HighContrastModeExample } from './views/theme/high_contrast_mode/high_contrast_mode_example';
import { BreakpointsExample } from './views/theme/breakpoints/breakpoints_example';
import Borders, { bordersSections } from './views/theme/borders/borders';
import Color, { colorsInfo, colorsSections } from './views/theme/color/tokens';
import ColorContrast, { contrastSections } from './views/theme/color/contrast';
import ColorFunctions, {
  colorsFunctionsSections,
} from './views/theme/color/functions';
import Sizing, {
  sizingInfo,
  sizingSections,
} from './views/theme/sizing/tokens';
import SizingFunctions, {
  sizingFunctionSections,
} from './views/theme/sizing/functions';
import Typography, {
  typographyInfo,
  typographySections,
} from './views/theme/typography/values';
import TextUtilities, {
  textUtilitiesSections,
} from './views/theme/typography/utilities';
import Other, { otherSections } from './views/theme/other/other';
import ThemeValues from './views/theme/customizing/values';

/** Elastic Charts */

import { ElasticChartsThemingExample } from './views/elastic_charts/theming_example';

import { ElasticChartsTimeExample } from './views/elastic_charts/time_example';

import { ElasticChartsCategoryExample } from './views/elastic_charts/category_example';

import { ElasticChartsSparklinesExample } from './views/elastic_charts/sparklines_example';

import { ElasticChartsPieExample } from './views/elastic_charts/pie_example';

import { ElasticChartsAccessibilityExample } from './views/elastic_charts/accessibility_example';

import { MetricChartExample } from './views/elastic_charts/metric/metric_chart_example';

const createExample = (example, customTitle) => {
  if (!example) {
    throw new Error(
      'One of your example pages is undefined. This usually happens when you export or import it with the wrong name.'
    );
  }

  const {
    title,
    sections,
    isBeta,
    isNew,
    isDeprecated,
    playground,
    guidelines,
    ...rest
  } = example;
  const filteredSections = sections.filter((section) => section !== undefined);

  filteredSections.forEach((section) => {
    section.id = section.title ? slugify(section.title) : undefined;
  });

  const renderedSections = filteredSections.map((section, index) =>
    createElement(GuideSection, {
      // Using index as the key because not all require a `title`
      key: index,
      ...section,
    })
  );

  let playgroundComponent;
  if (playground) {
    if (Array.isArray(playground)) {
      playgroundComponent = playground.map((elm, idx) => {
        return <Fragment key={idx}>{playgroundCreator(elm())}</Fragment>;
      });
    } else playgroundComponent = playgroundCreator(playground());
  }

  const component = () => (
    <EuiErrorBoundary>
      <GuideTabbedPage
        title={title}
        isBeta={isBeta}
        isNew={isNew}
        isDeprecated={isDeprecated}
        playground={playgroundComponent}
        guidelines={guidelines}
        {...rest}
      >
        {renderedSections}
      </GuideTabbedPage>
    </EuiErrorBoundary>
  );

  return {
    name: customTitle || title,
    component,
    sections: filteredSections,
    isBeta,
    isNew,
    isDeprecated,
    hasGuidelines: typeof guidelines !== 'undefined',
  };
};

const createTabbedPage = ({
  title,
  pages,
  isBeta,
  isNew,
  isDeprecated,
  ...rest
}) => {
  const component = () => (
    <GuideTabbedPage title={title} pages={pages} {...rest} />
  );

  const pagesSections = pages.map((page, index) => {
    return {
      id: slugify(page.title),
      title: page.title,
      sections: pages[index].sections,
    };
  });

  return {
    name: title,
    component,
    sections: pagesSections,
    isBeta,
    isNew,
    isDeprecated,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createMarkdownExample = (file, name, intro) => {
  const headings = file.default.match(/^(##) (.*)/gm);

  const sections = headings.map((heading) => {
    const title = heading.replace('## ', '');

    return { id: slugify(title), title: title };
  });

  return {
    name,
    component: () => (
      <GuideTabbedPage title={name}>
        <GuideMarkdownFormat grow={false}>{file.default}</GuideMarkdownFormat>
      </GuideTabbedPage>
    ),
    sections: sections,
  };
};

const navigation = [
  {
    name: 'Guidelines',
    items: [
      createExample(GettingStarted, 'Getting started'),
      createExample(AccessibilityGuidelines, 'Accessibility'),
      createTabbedPage({
        title: 'Writing',
        pages: [
          {
            title: 'Guidelines',
            page: WritingGuidelines,
            sections: writingGuidelinesSections,
          },
          {
            title: 'Examples',
            page: WritingExamples,
            sections: writingExamplesSections,
          },
        ],
      }),
    ],
  },
  {
    name: 'Theming',
    items: [
      createExample(ThemeExample, 'Theme provider'),
      createExample(ColorModeExample),
      createExample(HighContrastModeExample),
      createTabbedPage(BreakpointsExample),
      {
        name: 'Borders',
        component: Borders,
        sections: bordersSections,
      },
      createTabbedPage({
        ...colorsInfo,
        pages: [
          {
            title: 'Values',
            page: Color,
            sections: colorsSections,
          },
          {
            title: 'Utilities',
            page: ColorFunctions,
            sections: colorsFunctionsSections,
          },
          {
            title: 'Contrast',
            page: ColorContrast,
            sections: contrastSections,
          },
        ],
      }),
      createTabbedPage({
        ...sizingInfo,
        pages: [
          {
            title: 'Values',
            page: Sizing,
            sections: sizingSections,
          },
          {
            title: 'Utilities',
            page: SizingFunctions,
            sections: sizingFunctionSections,
          },
        ],
      }),
      createTabbedPage({
        ...typographyInfo,
        pages: [
          {
            title: 'Values',
            page: Typography,
            sections: typographySections,
          },
          {
            title: 'Utilities',
            page: TextUtilities,
            sections: textUtilitiesSections,
          },
        ],
      }),
      {
        name: 'More tokens',
        component: Other,
        sections: otherSections,
      },
      {
        name: 'Customizing themes',
        component: ThemeValues,
      },
    ],
  },
  {
    name: 'Templates',
    items: [
      createTabbedPage({
        ...PageTemplateInfo,
        pages: [
          {
            title: 'Examples',
            page: PageTemplateExample,
            sections: pageTemplateExamplesSections,
          },
          {
            title: 'Guidelines',
            page: PageTemplateGuidelines,
            sections: pageTemplateGuidelinesSections,
          },
        ],
      }),
      createExample(SitewideSearchExample),
      createExample(SuperDatePickerExample),
    ],
  },
  {
    name: 'Layout',
    items: [
      AccordionExample,
      BottomBarExample,
      FlexExample,
      FlyoutExample,
      HeaderExample,
      HorizontalRuleExample,
      ModalExample,
      PageExample,
      PageHeaderExample,
      PanelExample,
      PopoverExample,
      ResizableContainerExample,
      SpacerExample,
    ].map((example) => createExample(example)),
  },
  {
    name: 'Navigation',
    items: [
      BreadcrumbsExample,
      ButtonExample,
      CollapsibleNavExample,
      ContextMenuExample,
      FacetExample,
      KeyPadMenuExample,
      LinkExample,
      PaginationExample,
      SideNavExample,
      StepsExample,
      TabsExample,
      TreeViewExample,
    ].map((example) => createExample(example)),
  },
  {
    name: 'Display',
    items: [
      AspectRatioExample,
      AvatarExample,
      BadgeExample,
      CallOutExample,
      CardExample,
      CommentListExample,
      DescriptionListExample,
      DragAndDropExample,
      EmptyPromptExample,
      HealthExample,
      IconExample,
      ImageExample,
      ListGroupExample,
      LoadingExample,
      ProgressExample,
      SkeletonExample,
      StatExample,
      TextExample,
      TimelineExample,
      TitleExample,
      ToastExample,
      ToolTipExample,
      TourExample,
    ].map((example) => createExample(example)),
  },
  {
    name: 'Forms',
    items: [
      FormControlsExample,
      SelectionControlsExample,
      FormLayoutsExample,
      FormCompressedExample,
      FormValidationExample,
      AutoRefreshExample,
      ComboBoxExample,
      ColorPickerExample,
      DatePickerExample,
      ExpressionExample,
      FilterGroupExample,
      InlineEditExample,
      RangeControlExample,
      SearchBarExample,
      SelectableExample,
      SuperSelectExample,
    ].map((example) => createExample(example)),
  },
  {
    name: 'Tabular content',
    items: [
      DataGridExample,
      DataGridColumnsExample,
      DataGridCellsExample,
      DataGridToolbarExample,
      DataGridStylingExample,
      DataGridAdvancedExample,
      TableExample,
      TableInMemoryExample,
    ].map((example) => createExample(example)),
  },
  {
    name: 'Editors & syntax',
    items: [
      MarkdownFormatExample,
      MarkdownEditorExample,
      MarkdownPluginExample,
      CodeExample,
    ].map((example) => createExample(example)),
  },
  {
    name: 'Elastic Charts',
    items: [
      ElasticChartsThemingExample,
      ElasticChartsSparklinesExample,
      ElasticChartsTimeExample,
      ElasticChartsCategoryExample,
      ElasticChartsPieExample,
      MetricChartExample,
      ElasticChartsAccessibilityExample,
    ].map((example) => createExample(example)),
  },
  {
    name: 'Utilities',
    items: [
      ...[
        AccessibilityExample,
        AutoSizerExample,
        BeaconExample,
        ColorPaletteExample,
        CopyExample,
        UtilityClassesExample,
        DelayRenderExample,
        ErrorBoundaryExample,
        FocusTrapExample,
        HighlightAndMarkExample,
        HtmlIdGeneratorExample,
        InnerTextExample,
        I18nExample,
        MutationObserverExample,
        OutsideClickDetectorExample,
        OverlayMaskExample,
        PortalExample,
        PrettyDurationExample,
        ProviderExample,
        ResizeObserverExample,
        ScrollExample,
        TextDiffExample,
      ].map((example) => createExample(example)),
      createTabbedPage(TextTruncateExample),
      createExample(WindowEventExample),
    ],
  },
  {
    name: 'Package',
    items: [Changelog, I18nTokens],
  },
].map(({ name, items, ...rest }) => ({
  name,
  type: slugify(name),
  items: items.map(
    ({ name: itemName, hasGuidelines, isTabbedPage, sections, ...rest }) => {
      const item = {
        name: itemName,
        path: `${slugify(name)}/${slugify(itemName)}`,
        sections,
        ...rest,
      };

      if (hasGuidelines) {
        item.from = `guidelines/${slugify(itemName)}`;
        item.to = `${slugify(name)}/${slugify(itemName)}/guidelines`;
      }

      return item;
    }
  ),
  ...rest,
}));

const allRoutes = navigation.reduce((accummulatedRoutes, section) => {
  accummulatedRoutes.push(...section.items);
  return accummulatedRoutes;
}, []);

export default {
  navigation,

  getAppRoutes: function getAppRoutes() {
    return allRoutes;
  },
};
