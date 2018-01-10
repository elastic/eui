import React, {
  createElement,
} from 'react';

import { useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import {
  GuidePage,
  GuideSection,
} from './components';

import {
  EuiErrorBoundary,
} from '../../src/components';

import { Slugify } from './services';

// Guidelines

import WritingGuidelines
  from './views/guidelines/writing';

// Component examples

import { AccessibilityExample }
  from './views/accessibility/accessibility_example';

import { AccordionExample }
  from './views/accordion/accordion_example';

import { AvatarExample }
  from './views/avatar/avatar_example';

import { BadgeExample }
  from './views/badge/badge_example';

import { BottomBarExample }
  from './views/bottom_bar/bottom_bar_example';

import { ButtonExample }
  from './views/button/button_example';

import { CallOutExample }
  from './views/call_out/call_out_example';

import { CodeEditorExample }
  from './views/code_editor/code_editor_example';

import { CodeExample }
  from './views/code/code_example';

import { ContextMenuExample }
  from './views/context_menu/context_menu_example';

import { DescriptionListExample }
  from './views/description_list/description_list_example';

import { ErrorBoundaryExample }
  from './views/error_boundary/error_boundary_example';

import { ExpressionExample }
  from './views/expression/expression_example';

import { FlexExample }
  from './views/flex/flex_example';

import { FlyoutExample }
  from './views/flyout/flyout_example';

import { FormExample }
  from './views/form/form_example';

import { HeaderExample }
  from './views/header/header_example';

import { HealthExample }
  from './views/health/health_example';

import { HorizontalRuleExample }
  from './views/horizontal_rule/horizontal_rule_example';

import { IconExample }
  from './views/icon/icon_example';

import { ImageExample }
  from './views/image/image_example';

import { KeyPadMenuExample }
  from './views/key_pad_menu/key_pad_menu_example';

import { LinkExample }
  from './views/link/link_example';

import { LoadingExample }
  from './views/loading/loading_example';

import { ModalExample }
  from './views/modal/modal_example';

import { OutsideClickDetectorExample }
  from './views/outside_click_detector/outside_click_detector_example';

import { PageExample }
  from './views/page/page_example';

import { PaginationExample }
  from './views/pagination/pagination_example';

import { PanelExample }
  from './views/panel/panel_example';

import { PopoverExample }
  from './views/popover/popover_example';

import { ProgressExample }
  from './views/progress/progress_example';

import { SideNavExample }
  from './views/side_nav/side_nav_example';

import { SpacerExample }
  from './views/spacer/spacer_example';

import { StepsExample }
  from './views/steps/steps_example';

import { TableExample }
  from './views/table/table_example';

import { TabsExample }
  from './views/tabs/tabs_example';

import { TextExample }
  from './views/text/text_example';

import { TitleExample }
  from './views/title/title_example';

import { ToastExample }
  from './views/toast/toast_example';

import { TooltipExample }
  from './views/tooltip/tooltip_example';

// Patterns

// Sandboxes

import AdvancedSettingsSandbox
  from './views/kibana/advanced_settings_sandbox';

import WatchesSandbox
  from './views/kibana/watches_sandbox';

import TextScalingSandbox
  from './views/text_scaling/text_scaling_sandbox';

const guidelines = [{
  name: 'Writing',
  component: WritingGuidelines,
}];

const createExample = ({ title, intro, sections }) => {
  sections.forEach(section => {
    section.id = Slugify.one(section.title);
  });

  const renderedSections = sections.map(section => createElement(GuideSection, {
    key: section.title,
    ...section
  }));

  const component = () => (
    <EuiErrorBoundary>
      <GuidePage title={title}>
        {intro}
        {renderedSections}
      </GuidePage>
    </EuiErrorBoundary>
  );

  return {
    name: title,
    component,
    sections,
  };
};

// Component route names should match the component name exactly.
const components = [
  AccessibilityExample,
  AccordionExample,
  AvatarExample,
  BadgeExample,
  BottomBarExample,
  ButtonExample,
  CallOutExample,
  CodeEditorExample,
  CodeExample,
  ContextMenuExample,
  DescriptionListExample,
  ErrorBoundaryExample,
  ExpressionExample,
  FlexExample,
  FlyoutExample,
  FormExample,
  HeaderExample,
  HealthExample,
  HorizontalRuleExample,
  IconExample,
  ImageExample,
  KeyPadMenuExample,
  LinkExample,
  LoadingExample,
  ModalExample,
  OutsideClickDetectorExample,
  PageExample,
  PaginationExample,
  PanelExample,
  PopoverExample,
  ProgressExample,
  SideNavExample,
  SpacerExample,
  StepsExample,
  TableExample,
  TabsExample,
  TextExample,
  TitleExample,
  ToastExample,
  TooltipExample,
].map(example => createExample(example));

const patterns = [
].map(example => createExample(example));

const sandboxes = [{
  name: 'Advanced Settings',
  component: AdvancedSettingsSandbox,
}, {
  name: 'Watches',
  component: WatchesSandbox,
}, {
  name: 'Text scales',
  component: TextScalingSandbox,
}];

sandboxes.forEach(sandbox => { sandbox.isSandbox = true; });

const allRoutes = [
  ...guidelines,
  ...components,
  ...sandboxes,
  ...patterns,
];

export default {
  history: useRouterHistory(createHashHistory)(),
  guidelines: Slugify.each(guidelines, 'name', 'path'),
  components: Slugify.each(components, 'name', 'path'),
  patterns: Slugify.each(patterns, 'name', 'path'),
  sandboxes: Slugify.each(sandboxes, 'name', 'path'),

  getRouteForPath: path => {
    // React-router kinda sucks. Sometimes the path contains a leading slash, sometimes it doesn't.
    const normalizedPath = path[0] === '/' ? path.slice(1, path.length) : path;
    return allRoutes.find(route => normalizedPath === route.path);
  },

  getAppRoutes: function getAppRoutes() {
    return allRoutes;
  },

  getPreviousRoute: function getPreviousRoute(routeName) {
    const index = allRoutes.findIndex(item => {
      return item.name === routeName;
    });

    return index >= 0 ? allRoutes[index - 1] : undefined;
  },

  getNextRoute: function getNextRoute(routeName) {
    const index = allRoutes.findIndex(item => {
      return item.name === routeName;
    });

    return index < allRoutes.length - 1 ? allRoutes[index + 1] : undefined;
  },
};
