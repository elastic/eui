import { EuiSelectableOption } from '../../../../src/components/selectable/selectable_option';
import { EuiSelectableTemplateSitewideSchema } from 'src/components/selectable/selectable_templates/selectable_template_sitewide';

export const Options: EuiSelectableOption[] = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus is disabled',
    disabled: true,
  },
  {
    label: 'Mimas',
    checked: 'on',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Iapetus',
    checked: 'on',
  },
  {
    label: 'Phoebe',
  },
  {
    label: 'Rhea',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
  {
    label: 'Tethys',
  },
  {
    label: 'Hyperion',
  },
];

export const recents: EuiSelectableTemplateSitewideSchema[] = [
  {
    label: 'Welcome dashboards',
    icon: {
      type: 'dashboardApp',
    },
    avatar: {
      name: 'Default Space',
    },
    meta: [
      {
        text: 'Saved dashboard',
        type: 'app',
      },
    ],
    url: 'welcome-dashboards',
  },
  {
    label:
      '[Flights] Flight Count and Average Ticket Price over the course of several years maybe even decades',
    icon: {
      type: 'visualizeApp',
    },
    avatar: {
      name: 'Default Space',
    },
    meta: [
      {
        text: 'Saved visualization',
        type: 'app',
      },
    ],
  },
  {
    label: '[Flights] Global Flight Dashboard',
    icon: {
      type: 'dashboardApp',
    },
    avatar: {
      name: 'Hello World',
    },
    meta: [
      {
        text: 'Saved dashboard',
        type: 'app',
      },
    ],
  },
  {
    label: '[Logs] Host, Visits and Bytes Table',
    icon: {
      type: 'visVisualBuilder',
    },
    meta: [
      {
        text: 'TSVB visualization',
        type: 'app',
      },
    ],
  },
  {
    label: '[Flights] Flight Log',
    icon: {
      type: 'discoverApp',
    },
    avatar: {
      name: 'Hello World',
    },
    meta: [
      {
        text: 'Saved search',
        type: 'app',
      },
    ],
  },
];

export const searchData = [
  {
    title: 'Dashboards',
    url: 'dashboards',
    type: {
      iconType: 'logoKibana',
    },
  },
  {
    title:
      'Generate HAR Archive of Network Timings/Details for Kibana requests',
    type: {
      title: 'Article',
    },
    meta:
      'https://discuss.elastic.co/t/generate-har-archive-of-network-timings',
  },
  {
    title: '[Logs] Web Traffic',
    url: 'dashboard-logs-web-traffic',
    type: {
      title: 'Saved dashboard',
      iconType: 'dashboardApp',
    },
    space: 'Another',
  },
  {
    title: 'Databoard analytics',
    type: {
      title: 'Saved discover',
      iconType: 'discoverApp',
    },
  },
  {
    title: 'Primary logs',
    type: {
      title: 'personal-databoard',
      iconType: 'logstashInput',
    },
    space: 'Hello World',
  },
  {
    title: 'SIEM',
    type: {
      title: 'personal-databoard',
      iconType: 'logoSecurity',
    },
  },
  {
    title: 'Dev tools',
    url: 'dev-tools-console',
    type: {
      title: 'Management application',
      iconType: 'devToolsApp',
    },
  },
  {
    title: 'Console',
    url: 'dev-tools-console',
    type: {
      title: 'Dev tools application',
      iconType: 'consoleApp',
    },
  },
  {
    title: 'Maps',
    url: 'maps',
    type: {
      title: 'Kibana application',
      iconType: 'gisApp',
    },
    space: 'Hello World',
  },
];
