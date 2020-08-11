import { EuiSelectableOption } from '../../../../src/components/selectable/selectable_option';
import { EuiSelectableTemplateSitewideOptionProps } from '../../../../src/components/selectable/selectable_templates/selectable_template_sitewide_option';

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

export const recents: EuiSelectableTemplateSitewideOptionProps[] = [
  {
    label: 'Welcome dashboards',
    avatar: {
      name: 'Default Space',
    },
    meta: [
      {
        text: 'Dashboard',
        type: 'application',
        highlightSearchString: true,
      },
    ],
    url: 'welcome-dashboards',
  },
  {
    label:
      '[Flights] Flight Count and Average Ticket Price over the course of several years maybe even decades',
    avatar: {
      name: 'Default Space',
    },
    meta: [
      {
        text: 'Visualization',
        type: 'application',
      },
    ],
  },
  {
    label: '[Flights] Global Flight Dashboard',
    avatar: {
      name: 'Hello World',
    },
    meta: [
      {
        text: 'Dashboard',
        type: 'application',
        highlightSearchString: true,
      },
    ],
  },
  {
    label: '[Logs] Host, Visits and Bytes Table',
    meta: [
      {
        text: 'TSVB visualization',
        type: 'application',
      },
    ],
  },
  {
    label: '[Flights] Flight Log',
    avatar: {
      name: 'Hello World',
    },
    meta: [
      {
        text: 'Discover',
        type: 'application',
      },
    ],
  },
];

export const searchData: EuiSelectableTemplateSitewideOptionProps[] = [
  {
    label: 'Dashboards',
    url: 'dashboards',
    icon: {
      type: 'logoKibana',
    },
  },
  {
    label:
      'Generate HAR Archive of Network Timings/Details for Kibana requests',
    meta: [
      {
        text: 'Article',
        type: 'article',
      },
      {
        text:
          'https://discuss.elastic.co/t/generate-har-archive-of-network-timings',
        highlightSearchString: true,
      },
    ],
  },
  {
    label: '[Logs] Web Traffic',
    url: 'dashboard-logs-web-traffic',
    meta: [
      {
        text: 'Dashboard',
        type: 'application',
        highlightSearchString: true,
      },
    ],
  },
  {
    label: 'Databoard analytics',
    title: 'Databoard analytics; Dashboard; Deployment: Flights Data',
    meta: [
      {
        text: 'Dashboard',
        type: 'application',
      },
      {
        text: 'Flights Data',
        type: 'deployment',
      },
    ],
  },
  {
    label: 'Primary logs',
    avatar: {
      name: 'Another',
    },
    meta: [
      {
        text: 'Flights Data',
        type: 'deployment',
      },
    ],
  },
  {
    label: 'SIEM',
    icon: {
      type: 'logoSecurity',
    },
    meta: [
      {
        text: 'personal-databoard',
        type: 'deployment',
      },
    ],
  },
  {
    label: 'Dev tools',
    url: 'dev-tools-console',
    meta: [
      {
        text: 'Management application',
        type: 'application',
      },
    ],
  },
  {
    label: 'Billing',
    icon: {
      type: 'user',
    },
    meta: [
      {
        text: 'Account',
        type: 'platform',
      },
    ],
  },
  {
    label: 'Maps',
    url: 'maps',
    icon: { type: 'logoKibana' },
    meta: [
      {
        text: 'Analyze application',
        type: 'application',
      },
    ],
    space: 'Hello World',
  },
  {
    label: 'Kibana monitoring with MB',
    searchableLabel: 'Kibana monitoring with MB; Case no. 00508173',
    meta: [
      {
        text: 'Case',
        type: 'case',
      },
      {
        text: '00508173',
      },
    ],
  },
  {
    label: 'My support tickets',
    icon: {
      type: 'help',
    },
    meta: [
      {
        text: 'Support',
        type: 'platform',
      },
    ],
  },
  {
    label: 'Totally custom',
    searchableLabel: 'Totally custom with pink metadata',
    icon: {
      type: 'alert',
      color: 'accent',
    },
    meta: [
      {
        text: 'I have a custom type',
        type: 'PINK',
      },
    ],
  },
];
