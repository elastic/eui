import Slugify from '../string/slugify';

import AccordionExample
  from '../../views/accordion/accordion_example';

import AccessibilityExample
  from '../../views/accessibility/accessibility_example';

import AdvancedSettingsExample
  from '../../views/advanced_settings/advanced_settings_example';

import AvatarExample
  from '../../views/avatar/avatar_example';

import BadgeExample
  from '../../views/badge/badge_example';

import BottomBarExample
  from '../../views/bottom_bar/bottom_bar_example';

import ButtonExample
  from '../../views/button/button_example';

import CallOutExample
  from '../../views/call_out/call_out_example';

import CodeExample
  from '../../views/code/code_example';

import ContextMenuExample
  from '../../views/context_menu/context_menu_example';

import DescriptionListExample
  from '../../views/description_list/description_list_example';

import FlexExample
  from '../../views/flex/flex_example';

import FormExample
  from '../../views/form/form_example';

import IconExample
  from '../../views/icon/icon_example';

import HeaderExample
  from '../../views/header/header_example';

import HorizontalRuleExample
  from '../../views/horizontal_rule/horizontal_rule_example';

import KeyPadMenuExample
  from '../../views/key_pad_menu/key_pad_menu_example';

import KibanaSandbox
  from '../../views/kibana/kibana_sandbox';

import LinkExample
  from '../../views/link/link_example';

import ModalExample
  from '../../views/modal/modal_example';

import PageExample
  from '../../views/page/page_example';

import PanelExample
  from '../../views/panel/panel_example';

import PaginationExample
  from '../../views/pagination/pagination_example';

import LoadingExample
  from '../../views/loading/loading_example';

import PopoverExample
  from '../../views/popover/popover_example';

import ProgressExample
  from '../../views/progress/progress_example';

import SideNavExample
  from '../../views/side_nav/side_nav_example';

import SpacerExample
  from '../../views/spacer/spacer_example';

import TableExample
  from '../../views/table/table_example';

import TabsExample
  from '../../views/tabs/tabs_example';

import TextExample
  from '../../views/text/text_example';

import ToastExample
  from '../../views/toast/toast_example';

import TitleExample
  from '../../views/title/title_example';

import TextScalingSandbox
  from '../../views/text_scaling/text_scaling_sandbox';

// Component route names should match the component name exactly.
const components = [{
  name: 'Accordion',
  component: AccordionExample,
}, {
  name: 'Accessibility',
  component: AccessibilityExample,
}, {
  name: 'Avatar',
  component: AvatarExample,
}, {
  name: 'Button',
  component: ButtonExample,
}, {
  name: 'Badge',
  component: BadgeExample,
}, {
  name: 'BottomBar',
  component: BottomBarExample,
}, {
  name: 'CallOut',
  component: CallOutExample,
}, {
  name: 'Code',
  component: CodeExample,
}, {
  name: 'ContextMenu',
  component: ContextMenuExample,
}, {
  name: 'DescriptionList',
  component: DescriptionListExample,
}, {
  name: 'Flex',
  component: FlexExample,
}, {
  name: 'Form',
  component: FormExample,
}, {
  name: 'Header',
  component: HeaderExample,
}, {
  name: 'HorizontalRule',
  component: HorizontalRuleExample,
}, {
  name: 'Icon',
  component: IconExample,
}, {
  name: 'KeyPadMenu',
  component: KeyPadMenuExample,
}, {
  name: 'Link',
  component: LinkExample,
}, {
  name: 'Loading',
  component: LoadingExample,
}, {
  name: 'Modal',
  component: ModalExample,
}, {
  name: 'Page',
  component: PageExample,
}, {
  name: 'Pagination',
  component: PaginationExample,
}, {
  name: 'Panel',
  component: PanelExample,
}, {
  name: 'Popover',
  component: PopoverExample,
}, {
  name: 'Progress',
  component: ProgressExample,
}, {
  name: 'SideNav',
  component: SideNavExample,
}, {
  name: 'Spacer',
  component: SpacerExample,
}, {
  name: 'Table',
  component: TableExample,
}, {
  name: 'Tabs',
  component: TabsExample,
}, {
  name: 'Text',
  component: TextExample,
}, {
  name: 'Toast',
  component: ToastExample,
}, {
  name: 'Title',
  component: TitleExample,
}];

const sandboxes = [{
  name: 'AdvancedSettings',
  component: AdvancedSettingsExample,
}, {
  name: 'Kibana',
  component: KibanaSandbox,
}, {
  name: 'TextScalingSandbox',
  component: TextScalingSandbox,
}];

sandboxes.forEach(sandbox => { sandbox.isSandbox = true; });

const allRoutes = components.concat(sandboxes);

export default {
  components: Slugify.each(components, 'name', 'path'),
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
