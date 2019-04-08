import React, {
  Component,
  HTMLAttributes,
  ReactElement,
  SVGAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

// @ts-ignore-next-line
// not generating typescript files or definitions for the generated JS components
// not typescript, because we'd need to dynamically know if we're importing the
// TS file (dev/docs) or the JS file (distributed), and it's more effort than worth
// to generate & git track a TS module definition for each icon component
import { icon as empty } from './assets/empty.js';

const typeToPathMap: { [key: string]: string } = {
  addDataApp: 'app_add_data',
  advancedSettingsApp: 'app_advanced_settings',
  alert: 'alert',
  apmApp: 'app_apm',
  apmTrace: 'apm_trace',
  apps: 'apps',
  arrowDown: 'arrow_down',
  arrowLeft: 'arrow_left',
  arrowRight: 'arrow_right',
  arrowUp: 'arrow_up',
  asterisk: 'asterisk',
  auditbeatApp: 'app_auditbeat',
  beaker: 'beaker',
  bell: 'bell',
  bolt: 'bolt',
  boxesHorizontal: 'boxes_horizontal',
  boxesVertical: 'boxes_vertical',
  branch: 'branch',
  broom: 'broom',
  brush: 'brush',
  bullseye: 'bullseye',
  calendar: 'calendar',
  canvasApp: 'app_canvas',
  codeApp: 'app_code',
  check: 'check',
  checkInCircleFilled: 'checkInCircleFilled',
  clock: 'clock',
  compute: 'compute',
  console: 'console',
  consoleApp: 'app_console',
  controlsHorizontal: 'controls_horizontal',
  controlsVertical: 'controls_vertical',
  copy: 'copy',
  copyClipboard: 'copy_clipboard',
  createAdvancedJob: 'ml_create_advanced_job',
  createMultiMetricJob: 'ml_create_multi_metric_job',
  createPopulationJob: 'ml_create_population_job',
  createSingleMetricJob: 'ml_create_single_metric_job',
  cross: 'cross',
  crossClusterReplicationApp: 'app_cross_cluster_replication',
  crosshairs: 'crosshairs',
  crossInACircleFilled: 'crossInACircleFilled',
  dashboardApp: 'app_dashboard',
  database: 'database',
  dataVisualizer: 'ml_data_visualizer',
  devToolsApp: 'app_devtools',
  discoverApp: 'app_discover',
  document: 'document',
  dot: 'dot',
  editorAlignCenter: 'editor_align_center',
  editorAlignLeft: 'editor_align_left',
  editorAlignRight: 'editor_align_right',
  editorBold: 'editor_bold',
  editorCodeBlock: 'editor_code_block',
  editorComment: 'editor_comment',
  editorHeading: 'editor_heading',
  editorItalic: 'editor_italic',
  editorLink: 'editor_link',
  editorOrderedList: 'editor_ordered_list',
  editorRedo: 'editor_redo',
  editorStrike: 'editor_strike',
  editorTable: 'editor_table',
  editorUnderline: 'editor_underline',
  editorUndo: 'editor_undo',
  editorUnorderedList: 'editor_unordered_list',
  email: 'email',
  empty: 'empty',
  emsApp: 'app_ems',
  exit: 'exit',
  expand: 'expand',
  exportAction: 'export',
  eye: 'eye',
  eyeClosed: 'eye_closed',
  faceHappy: 'face_happy',
  faceNeutral: 'faceNeutral',
  faceSad: 'face_sad',
  filebeatApp: 'app_filebeat',
  filter: 'filter',
  folderClosed: 'folder_closed',
  folderOpen: 'folder_open',
  fullScreen: 'full_screen',
  gear: 'gear',
  gisApp: 'app_gis',
  globe: 'globe',
  grab: 'grab',
  grabHorizontal: 'grab_horizontal',
  graphApp: 'app_graph',
  grid: 'grid',
  grokApp: 'app_grok',
  heartbeatApp: 'app_heartbeat',
  heatmap: 'heatmap',
  help: 'help',
  iInCircle: 'iInCircle',
  importAction: 'import',
  indexClose: 'index_close',
  indexEdit: 'index_edit',
  indexFlush: 'index_flush',
  indexManagementApp: 'app_index_management',
  indexMapping: 'index_mapping',
  indexOpen: 'index_open',
  indexPatternApp: 'app_index_pattern',
  indexRollupApp: 'app_index_rollup',
  indexSettings: 'index_settings',
  infraApp: 'app_infra',
  inputOutput: 'inputOutput',
  inspect: 'inspect',
  invert: 'invert',
  kqlField: 'kql_field',
  kqlFunction: 'kql_function',
  kqlOperand: 'kql_operand',
  kqlSelector: 'kql_selector',
  kqlValue: 'kql_value',
  link: 'link',
  list: 'list',
  listAdd: 'list_add',
  lock: 'lock',
  lockOpen: 'lockOpen',
  loggingApp: 'app_logging',
  logoAerospike: 'logo_aerospike',
  logoApache: 'logo_apache',
  logoAPM: 'logo_apm',
  logoAppSearch: 'logo_app_search',
  logoAWS: 'logo_aws',
  logoAWSMono: 'logo_aws_mono',
  logoBeats: 'logo_beats',
  logoBusinessAnalytics: 'logo_business_analytics',
  logoCeph: 'logo_ceph',
  logoCloud: 'logo_cloud',
  logoCloudEnterprise: 'logo_cloud_ece',
  logoCodesandbox: 'logo_codesandbox',
  logoCouchbase: 'logo_couchbase',
  logoDocker: 'logo_docker',
  logoDropwizard: 'logo_dropwizard',
  logoElastic: 'logo_elastic',
  logoElasticsearch: 'logo_elasticsearch',
  logoElasticStack: 'logo_elastic_stack',
  logoEnterpriseSearch: 'logo_enterprise_search',
  logoEtcd: 'logo_etcd',
  logoGCP: 'logo_gcp',
  logoGCPMono: 'logo_gcp_mono',
  logoGithub: 'logo_github',
  logoGmail: 'logo_gmail',
  logoGolang: 'logo_golang',
  logoHAproxy: 'logo_haproxy',
  logoIBM: 'logo_ibm',
  logoIBMMono: 'logo_ibm_mono',
  logoKafka: 'logo_kafka',
  logoKibana: 'logo_kibana',
  logoKubernetes: 'logo_kubernetes',
  logoLogstash: 'logo_logstash',
  logoMemcached: 'logo_memcached',
  logoMetrics: 'logo_metrics',
  logoMongodb: 'logo_mongodb',
  logoMySQL: 'logo_mysql',
  logoNginx: 'logo_nginx',
  logoOsquery: 'logo_osquery',
  logoPhp: 'logo_php',
  logoPostgres: 'logo_postgres',
  logoPrometheus: 'logo_prometheus',
  logoRabbitmq: 'logo_rabbitmq',
  logoRedis: 'logo_redis',
  logoSiteSearch: 'logo_site_search',
  logoSketch: 'logo_sketch',
  logoSlack: 'logo_slack',
  logoWebhook: 'logo_webhook',
  logoWindows: 'logo_windows',
  logoXpack: 'logo_xpack',
  logstashFilter: 'logstash_filter',
  logstashIf: 'logstash_if',
  logstashInput: 'logstash_input',
  logstashOutput: 'logstash_output',
  logstashQueue: 'logstash_queue',
  machineLearningApp: 'app_ml',
  managementApp: 'app_management',
  mapMarker: 'map_marker',
  memory: 'memory',
  merge: 'merge',
  metricbeatApp: 'app_metricbeat',
  minusInCircle: 'minus_in_circle',
  minusInCircleFilled: 'minus_in_circle_filled',
  monitoringApp: 'app_monitoring',
  node: 'node',
  notebookApp: 'app_notebook',
  number: 'number',
  offline: 'offline',
  online: 'online',
  packetbeatApp: 'app_packetbeat',
  pause: 'pause',
  pencil: 'pencil',
  pin: 'pin',
  pinFilled: 'pin_filled',
  pipelineApp: 'app_pipeline',
  play: 'play',
  plusInCircle: 'plus_in_circle',
  plusInCircleFilled: 'plus_in_circle_filled',
  popout: 'popout',
  questionInCircle: 'question_in_circle',
  refresh: 'refresh',
  reportingApp: 'app_reporting',
  save: 'save',
  savedObjectsApp: 'app_saved_objects',
  scale: 'scale',
  search: 'search',
  searchProfilerApp: 'app_search_profiler',
  securityAnalyticsApp: 'app_security_analytics',
  securityApp: 'app_security',
  shard: 'shard',
  share: 'share',
  snowflake: 'snowflake',
  sortable: 'sortable',
  sortDown: 'sort_down',
  sortLeft: 'sortLeft',
  sortRight: 'sortRight',
  sortUp: 'sort_up',
  spacesApp: 'app_spaces',
  sqlApp: 'app_sql',
  starEmpty: 'star_empty',
  starEmptySpace: 'star_empty_space',
  starFilled: 'star_filled',
  starFilledSpace: 'star_filled_space',
  starMinusEmpty: 'star_minus_empty',
  starMinusFilled: 'star_minus_filled',
  starPlusEmpty: 'starPlusEmpty',
  starPlusFilled: 'starPlusFilled',
  stats: 'stats',
  stop: 'stop',
  stopFilled: 'stop_filled',
  storage: 'storage',
  string: 'string',
  submodule: 'submodule',
  symlink: 'symlink',
  tableOfContents: 'tableOfContents',
  tag: 'tag',
  tear: 'tear',
  temperature: 'temperature',
  timelionApp: 'app_timelion',
  trash: 'trash',
  upgradeAssistantApp: 'app_upgrade_assistant',
  uptimeApp: 'app_uptime',
  user: 'user',
  usersRolesApp: 'app_users_roles',
  vector: 'vector',
  visArea: 'vis_area',
  visBarHorizontal: 'vis_bar_horizontal',
  visBarVertical: 'vis_bar_vertical',
  visControls: 'vis_controls',
  visGauge: 'vis_gauge',
  visGoal: 'vis_goal',
  visHeatmap: 'vis_heatmap',
  visLine: 'vis_line',
  visMapCoordinate: 'vis_map_coordinate',
  visMapRegion: 'vis_map_region',
  visMetric: 'vis_metric',
  visPie: 'vis_pie',
  visTable: 'vis_table',
  visTagCloud: 'vis_tag_cloud',
  visText: 'vis_text',
  visTimelion: 'vis_timelion',
  visualizeApp: 'app_visualize',
  visVega: 'vis_vega',
  visVisualBuilder: 'vis_visual_builder',
  watchesApp: 'app_watches',
  wrench: 'wrench',
  //
  // // Token Icon Imports
  tokenClass: 'tokens/tokenClass',
  tokenProperty: 'tokens/tokenProperty',
  tokenEnum: 'tokens/tokenEnum',
  tokenVariable: 'tokens/tokenVariable',
  tokenMethod: 'tokens/tokenMethod',
  tokenAnnotation: 'tokens/tokenAnnotation',
  tokenException: 'tokens/tokenException',
  tokenInterface: 'tokens/tokenInterface',
  tokenParameter: 'tokens/tokenParameter',
  tokenField: 'tokens/tokenField',
  tokenElement: 'tokens/tokenElement',
  tokenFunction: 'tokens/tokenFunction',
  tokenBoolean: 'tokens/tokenBoolean',
  tokenString: 'tokens/tokenString',
  tokenArray: 'tokens/tokenArray',
  tokenNumber: 'tokens/tokenNumber',
  tokenConstant: 'tokens/tokenConstant',
  tokenObject: 'tokens/tokenObject',
  tokenEvent: 'tokens/tokenEvent',
  tokenKey: 'tokens/tokenKey',
  tokenNull: 'tokens/tokenNull',
  tokenStruct: 'tokens/tokenStruct',
  tokenPackage: 'tokens/tokenPackage',
  tokenOperator: 'tokens/tokenOperator',
  tokenEnumMember: 'tokens/tokenEnumMember',
  tokenRepo: 'tokens/tokenRepo',
  tokenSymbol: 'tokens/tokenSymbol',
  tokenFile: 'tokens/tokenFile',
};

export const TYPES: IconType[] = keysOf(typeToPathMap);

export type IconType = keyof typeof typeToPathMap;

const colorToClassMap: { [color: string]: string | null } = {
  default: null,
  primary: 'euiIcon--primary',
  secondary: 'euiIcon--secondary',
  success: 'euiIcon--success',
  accent: 'euiIcon--accent',
  warning: 'euiIcon--warning',
  danger: 'euiIcon--danger',
  text: 'euiIcon--text',
  subdued: 'euiIcon--subdued',
  ghost: 'euiIcon--ghost',
};

export const COLORS: IconColor[] = keysOf(colorToClassMap);

// We accept arbitrary color strings, which are impossible to type.
export type IconColor = string | keyof typeof colorToClassMap;

const sizeToClassNameMap = {
  original: null,
  s: 'euiIcon--small',
  m: 'euiIcon--medium',
  l: 'euiIcon--large',
  xl: 'euiIcon--xLarge',
  xxl: 'euiIcon--xxLarge',
};

export const SIZES: IconSize[] = keysOf(sizeToClassNameMap);

export type IconSize = keyof typeof sizeToClassNameMap;

export interface EuiIconProps {
  type?: IconType | ReactElement<SVGElement>;
  /**
   * One of EUI's color palette or a valid CSS color value https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   */
  color?: IconColor;
  size?: IconSize;
}

type Props = CommonProps & SVGAttributes<SVGElement> & EuiIconProps;
interface State {
  icon: undefined | ReactElement<any>;
}

function getInitialIcon(icon: EuiIconProps['type']) {
  if (icon == null) {
    return undefined;
  }
  if (typeof icon === 'string') {
    return undefined;
  }
  return icon;
}

export class EuiIcon extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      icon: getInitialIcon(this.props.type),
    };

    if (this.state.icon === undefined && typeof this.props.type === 'string') {
      import(`./assets/${typeToPathMap[this.props.type]}.js`).then(
        ({ icon }) => {
          this.setState({ icon });
        }
      );
    }
  }

  render() {
    const {
      type,
      size = 'm',
      color,
      className,
      tabIndex,
      ...rest
    } = this.props;

    let optionalColorClass = null;
    let optionalCustomStyles = null;

    if (color) {
      if (COLORS.indexOf(color) > -1) {
        optionalColorClass = colorToClassMap[color];
      } else {
        optionalCustomStyles = { fill: color };
      }
    }

    // These icons are a little special and get some extra CSS flexibility
    const isAppIcon =
      type &&
      (/.+App$/.test(type) || /.+Job$/.test(type) || type === 'dataVisualizer');

    const classes = classNames(
      'euiIcon',
      sizeToClassNameMap[size],
      optionalColorClass,
      {
        'euiIcon--app': isAppIcon,
      },
      className
    );

    // const Svg = (type && typeToIconMap[type]) || empty;
    const Svg = this.state.icon || empty;

    // This is a fix for IE and Edge, which ignores tabindex="-1" on an SVG, but respects
    // focusable="false".
    //   - If there's no tab index specified, we'll default the icon to not be focusable,
    //     which is how SVGs behave in Chrome, Safari, and FF.
    //   - If tab index is -1, then the consumer wants the icon to not be focusable.
    //   - For all other values, the consumer wants the icon to be focusable.
    const focusable = tabIndex == null || tabIndex === -1 ? 'false' : 'true';

    if (typeof Svg === 'string') {
      // @ts-ignore
      return (
        <img
          src={Svg}
          className={classes}
          tabIndex={tabIndex}
          {...rest as HTMLAttributes<HTMLImageElement>}
        />
      );
    } else {
      return (
        <Svg
          className={classes}
          style={optionalCustomStyles}
          tabIndex={tabIndex}
          focusable={focusable}
          {...rest}
        />
      );
    }
  }
}
