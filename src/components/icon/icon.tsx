import React, { FunctionComponent, SVGAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

import addDataApp from './assets/app_add_data.svg';
import advancedSettingsApp from './assets/app_advanced_settings.svg';
import alert from './assets/alert.svg';
import apmApp from './assets/app_apm.svg';
import apmTrace from './assets/apm_trace.svg';
import apps from './assets/apps.svg';
import arrowDown from './assets/arrow_down.svg';
import arrowLeft from './assets/arrow_left.svg';
import arrowRight from './assets/arrow_right.svg';
import arrowUp from './assets/arrow_up.svg';
import asterisk from './assets/asterisk.svg';
import auditbeatApp from './assets/app_auditbeat.svg';
import beaker from './assets/beaker.svg';
import bell from './assets/bell.svg';
import bolt from './assets/bolt.svg';
import boxesHorizontal from './assets/boxes_horizontal.svg';
import boxesVertical from './assets/boxes_vertical.svg';
import branch from './assets/branch.svg';
import broom from './assets/broom.svg';
import brush from './assets/brush.svg';
import bullseye from './assets/bullseye.svg';
import calendar from './assets/calendar.svg';
import canvasApp from './assets/app_canvas.svg';
import codeApp from './assets/app_code.svg';
import check from './assets/check.svg';
import checkInCircleFilled from './assets/checkInCircleFilled.svg';
import clock from './assets/clock.svg';
import compute from './assets/compute.svg';
import console from './assets/console.svg';
import consoleApp from './assets/app_console.svg';
import controlsHorizontal from './assets/controls_horizontal.svg';
import controlsVertical from './assets/controls_vertical.svg';
import copy from './assets/copy.svg';
import copyClipboard from './assets/copy_clipboard.svg';
import createAdvancedJob from './assets/ml_create_advanced_job.svg';
import createMultiMetricJob from './assets/ml_create_multi_metric_job.svg';
import createPopulationJob from './assets/ml_create_population_job.svg';
import createSingleMetricJob from './assets/ml_create_single_metric_job.svg';
import cross from './assets/cross.svg';
import crossClusterReplicationApp from './assets/app_cross_cluster_replication.svg';
import crosshairs from './assets/crosshairs.svg';
import crossInACircleFilled from './assets/crossInACircleFilled.svg';
import cut from './assets/cut.svg';
import dashboardApp from './assets/app_dashboard.svg';
import database from './assets/database.svg';
import dataVisualizer from './assets/ml_data_visualizer.svg';
import devToolsApp from './assets/app_devtools.svg';
import discoverApp from './assets/app_discover.svg';
import document from './assets/document.svg';
import dot from './assets/dot.svg';
import editorAlignCenter from './assets/editor_align_center.svg';
import editorAlignLeft from './assets/editor_align_left.svg';
import editorAlignRight from './assets/editor_align_right.svg';
import editorBold from './assets/editor_bold.svg';
import editorCodeBlock from './assets/editor_code_block.svg';
import editorComment from './assets/editor_comment.svg';
import editorHeading from './assets/editor_heading.svg';
import editorItalic from './assets/editor_italic.svg';
import editorLink from './assets/editor_link.svg';
import editorOrderedList from './assets/editor_ordered_list.svg';
import editorRedo from './assets/editor_redo.svg';
import editorStrike from './assets/editor_strike.svg';
import editorTable from './assets/editor_table.svg';
import editorUnderline from './assets/editor_underline.svg';
import editorUndo from './assets/editor_undo.svg';
import editorUnorderedList from './assets/editor_unordered_list.svg';
import email from './assets/email.svg';
import empty from './assets/empty.svg';
import emsApp from './assets/app_ems.svg';
import exit from './assets/exit.svg';
import expand from './assets/expand.svg';
import exportAction from './assets/export.svg';
import eye from './assets/eye.svg';
import eyeClosed from './assets/eye_closed.svg';
import faceHappy from './assets/face_happy.svg';
import faceNeutral from './assets/faceNeutral.svg';
import faceSad from './assets/face_sad.svg';
import filebeatApp from './assets/app_filebeat.svg';
import filter from './assets/filter.svg';
import folderClosed from './assets/folder_closed.svg';
import folderOpen from './assets/folder_open.svg';
import fullScreen from './assets/full_screen.svg';
import gear from './assets/gear.svg';
import gisApp from './assets/app_gis.svg';
import glasses from './assets/glasses.svg';
import globe from './assets/globe.svg';
import grab from './assets/grab.svg';
import grabHorizontal from './assets/grab_horizontal.svg';
import graphApp from './assets/app_graph.svg';
import grid from './assets/grid.svg';
import grokApp from './assets/app_grok.svg';
import heartbeatApp from './assets/app_heartbeat.svg';
import heatmap from './assets/heatmap.svg';
import help from './assets/help.svg';
import iInCircle from './assets/iInCircle.svg';
import importAction from './assets/import.svg';
import indexClose from './assets/index_close.svg';
import indexEdit from './assets/index_edit.svg';
import indexFlush from './assets/index_flush.svg';
import indexManagementApp from './assets/app_index_management.svg';
import indexMapping from './assets/index_mapping.svg';
import indexOpen from './assets/index_open.svg';
import indexPatternApp from './assets/app_index_pattern.svg';
import indexRollupApp from './assets/app_index_rollup.svg';
import indexSettings from './assets/index_settings.svg';
import infraApp from './assets/app_infra.svg';
import inputOutput from './assets/inputOutput.svg';
import inspect from './assets/inspect.svg';
import invert from './assets/invert.svg';
import kqlField from './assets/kql_field.svg';
import kqlFunction from './assets/kql_function.svg';
import kqlOperand from './assets/kql_operand.svg';
import kqlSelector from './assets/kql_selector.svg';
import kqlValue from './assets/kql_value.svg';
import link from './assets/link.svg';
import list from './assets/list.svg';
import listAdd from './assets/list_add.svg';
import lock from './assets/lock.svg';
import lockOpen from './assets/lockOpen.svg';
import loggingApp from './assets/app_logging.svg';
import logoAerospike from './assets/logo_aerospike.svg';
import logoApache from './assets/logo_apache.svg';
import logoAPM from './assets/logo_apm.svg';
import logoAppSearch from './assets/logo_app_search.svg';
import logoAWS from './assets/logo_aws.svg';
import logoAWSMono from './assets/logo_aws_mono.svg';
import logoBeats from './assets/logo_beats.svg';
import logoBusinessAnalytics from './assets/logo_business_analytics.svg';
import logoCeph from './assets/logo_ceph.svg';
import logoCloud from './assets/logo_cloud.svg';
import logoCloudEnterprise from './assets/logo_cloud_ece.svg';
import logoCodesandbox from './assets/logo_codesandbox.svg';
import logoCouchbase from './assets/logo_couchbase.svg';
import logoDocker from './assets/logo_docker.svg';
import logoDropwizard from './assets/logo_dropwizard.svg';
import logoElastic from './assets/logo_elastic.svg';
import logoElasticsearch from './assets/logo_elasticsearch.svg';
import logoElasticStack from './assets/logo_elastic_stack.svg';
import logoEnterpriseSearch from './assets/logo_enterprise_search.svg';
import logoEtcd from './assets/logo_etcd.svg';
import logoGCP from './assets/logo_gcp.svg';
import logoGCPMono from './assets/logo_gcp_mono.svg';
import logoGithub from './assets/logo_github.svg';
import logoGmail from './assets/logo_gmail.svg';
import logoGolang from './assets/logo_golang.svg';
import logoHAproxy from './assets/logo_haproxy.svg';
import logoIBM from './assets/logo_ibm.svg';
import logoIBMMono from './assets/logo_ibm_mono.svg';
import logoKafka from './assets/logo_kafka.svg';
import logoKibana from './assets/logo_kibana.svg';
import logoKubernetes from './assets/logo_kubernetes.svg';
import logoLogstash from './assets/logo_logstash.svg';
import logoMemcached from './assets/logo_memcached.svg';
import logoMetrics from './assets/logo_metrics.svg';
import logoMongodb from './assets/logo_mongodb.svg';
import logoMySQL from './assets/logo_mysql.svg';
import logoNginx from './assets/logo_nginx.svg';
import logoOsquery from './assets/logo_osquery.svg';
import logoPhp from './assets/logo_php.svg';
import logoPostgres from './assets/logo_postgres.svg';
import logoPrometheus from './assets/logo_prometheus.svg';
import logoRabbitmq from './assets/logo_rabbitmq.svg';
import logoRedis from './assets/logo_redis.svg';
import logoSiteSearch from './assets/logo_site_search.svg';
import logoSketch from './assets/logo_sketch.svg';
import logoSlack from './assets/logo_slack.svg';
import logoWebhook from './assets/logo_webhook.svg';
import logoWindows from './assets/logo_windows.svg';
import logoXpack from './assets/logo_xpack.svg';
import logstashFilter from './assets/logstash_filter.svg';
import logstashIf from './assets/logstash_if.svg';
import logstashInput from './assets/logstash_input.svg';
import logstashOutput from './assets/logstash_output.svg';
import logstashQueue from './assets/logstash_queue.svg';
import machineLearningApp from './assets/app_ml.svg';
import managementApp from './assets/app_management.svg';
import mapMarker from './assets/map_marker.svg';
import memory from './assets/memory.svg';
import merge from './assets/merge.svg';
import menuLeft from './assets/menuLeft.svg';
import menuRight from './assets/menuRight.svg';
import metricbeatApp from './assets/app_metricbeat.svg';
import minusInCircle from './assets/minus_in_circle.svg';
import minusInCircleFilled from './assets/minus_in_circle_filled.svg';
import monitoringApp from './assets/app_monitoring.svg';
import node from './assets/node.svg';
import notebookApp from './assets/app_notebook.svg';
import number from './assets/number.svg';
import offline from './assets/offline.svg';
import online from './assets/online.svg';
import packetbeatApp from './assets/app_packetbeat.svg';
import pause from './assets/pause.svg';
import pencil from './assets/pencil.svg';
import pin from './assets/pin.svg';
import pinFilled from './assets/pin_filled.svg';
import pipelineApp from './assets/app_pipeline.svg';
import play from './assets/play.svg';
import plusInCircle from './assets/plus_in_circle.svg';
import plusInCircleFilled from './assets/plus_in_circle_filled.svg';
import popout from './assets/popout.svg';
import questionInCircle from './assets/question_in_circle.svg';
import refresh from './assets/refresh.svg';
import reportingApp from './assets/app_reporting.svg';
import save from './assets/save.svg';
import savedObjectsApp from './assets/app_saved_objects.svg';
import scale from './assets/scale.svg';
import search from './assets/search.svg';
import searchProfilerApp from './assets/app_search_profiler.svg';
import securityAnalyticsApp from './assets/app_security_analytics.svg';
import securityApp from './assets/app_security.svg';
import shard from './assets/shard.svg';
import share from './assets/share.svg';
import snowflake from './assets/snowflake.svg';
import sortable from './assets/sortable.svg';
import sortDown from './assets/sort_down.svg';
import sortLeft from './assets/sortLeft.svg';
import sortRight from './assets/sortRight.svg';
import sortUp from './assets/sort_up.svg';
import spacesApp from './assets/app_spaces.svg';
import sqlApp from './assets/app_sql.svg';
import starEmpty from './assets/star_empty.svg';
import starEmptySpace from './assets/star_empty_space.svg';
import starFilled from './assets/star_filled.svg';
import starFilledSpace from './assets/star_filled_space.svg';
import starMinusEmpty from './assets/star_minus_empty.svg';
import starMinusFilled from './assets/star_minus_filled.svg';
import starPlusEmpty from './assets/starPlusEmpty.svg';
import starPlusFilled from './assets/starPlusFilled.svg';
import stats from './assets/stats.svg';
import stop from './assets/stop.svg';
import stopFilled from './assets/stop_filled.svg';
import storage from './assets/storage.svg';
import string from './assets/string.svg';
import submodule from './assets/submodule.svg';
import symlink from './assets/symlink.svg';
import tableOfContents from './assets/tableOfContents.svg';
import tag from './assets/tag.svg';
import tear from './assets/tear.svg';
import temperature from './assets/temperature.svg';
import timelionApp from './assets/app_timelion.svg';
import trash from './assets/trash.svg';
import upgradeAssistantApp from './assets/app_upgrade_assistant.svg';
import uptimeApp from './assets/app_uptime.svg';
import user from './assets/user.svg';
import usersRolesApp from './assets/app_users_roles.svg';
import vector from './assets/vector.svg';
import visArea from './assets/vis_area.svg';
import visBarHorizontal from './assets/vis_bar_horizontal.svg';
import visBarVertical from './assets/vis_bar_vertical.svg';
import visControls from './assets/vis_controls.svg';
import visGauge from './assets/vis_gauge.svg';
import visGoal from './assets/vis_goal.svg';
import visHeatmap from './assets/vis_heatmap.svg';
import visLine from './assets/vis_line.svg';
import visMapCoordinate from './assets/vis_map_coordinate.svg';
import visMapRegion from './assets/vis_map_region.svg';
import visMetric from './assets/vis_metric.svg';
import visPie from './assets/vis_pie.svg';
import visTable from './assets/vis_table.svg';
import visTagCloud from './assets/vis_tag_cloud.svg';
import visText from './assets/vis_text.svg';
import visTimelion from './assets/vis_timelion.svg';
import visualizeApp from './assets/app_visualize.svg';
import visVega from './assets/vis_vega.svg';
import visVisualBuilder from './assets/vis_visual_builder.svg';
import watchesApp from './assets/app_watches.svg';
import wrench from './assets/wrench.svg';

// Token Icon Imports
import tokenClass from './assets/tokens/tokenClass.svg';
import tokenProperty from './assets/tokens/tokenProperty.svg';
import tokenEnum from './assets/tokens/tokenEnum.svg';
import tokenVariable from './assets/tokens/tokenVariable.svg';
import tokenMethod from './assets/tokens/tokenMethod.svg';
import tokenAnnotation from './assets/tokens/tokenAnnotation.svg';
import tokenException from './assets/tokens/tokenException.svg';
import tokenInterface from './assets/tokens/tokenInterface.svg';
import tokenParameter from './assets/tokens/tokenParameter.svg';
import tokenField from './assets/tokens/tokenField.svg';
import tokenElement from './assets/tokens/tokenElement.svg';
import tokenFunction from './assets/tokens/tokenFunction.svg';
import tokenBoolean from './assets/tokens/tokenBoolean.svg';
import tokenString from './assets/tokens/tokenString.svg';
import tokenArray from './assets/tokens/tokenArray.svg';
import tokenNumber from './assets/tokens/tokenNumber.svg';
import tokenConstant from './assets/tokens/tokenConstant.svg';
import tokenObject from './assets/tokens/tokenObject.svg';
import tokenEvent from './assets/tokens/tokenEvent.svg';
import tokenKey from './assets/tokens/tokenKey.svg';
import tokenNull from './assets/tokens/tokenNull.svg';
import tokenStruct from './assets/tokens/tokenStruct.svg';
import tokenPackage from './assets/tokens/tokenPackage.svg';
import tokenOperator from './assets/tokens/tokenOperator.svg';
import tokenEnumMember from './assets/tokens/tokenEnumMember.svg';
import tokenRepo from './assets/tokens/tokenRepo.svg';
import tokenSymbol from './assets/tokens/tokenSymbol.svg';
import tokenFile from './assets/tokens/tokenFile.svg';

const typeToIconMap = {
  addDataApp,
  advancedSettingsApp,
  alert,
  apmApp,
  apmTrace,
  apps,
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  asterisk,
  auditbeatApp,
  beaker,
  bell,
  bolt,
  boxesHorizontal,
  boxesVertical,
  branch,
  broom,
  brush,
  bullseye,
  calendar,
  canvasApp,
  codeApp,
  check,
  checkInCircleFilled,
  clock,
  compute,
  console,
  consoleApp,
  controlsHorizontal,
  controlsVertical,
  copy,
  copyClipboard,
  createAdvancedJob,
  createMultiMetricJob,
  createPopulationJob,
  createSingleMetricJob,
  cross,
  crossClusterReplicationApp,
  crosshairs,
  crossInACircleFilled,
  cut,
  dashboardApp,
  database,
  dataVisualizer,
  devToolsApp,
  discoverApp,
  document,
  dot,
  editorAlignCenter,
  editorAlignLeft,
  editorAlignRight,
  editorBold,
  editorCodeBlock,
  editorComment,
  editorHeading,
  editorItalic,
  editorLink,
  editorOrderedList,
  editorRedo,
  editorStrike,
  editorTable,
  editorUnderline,
  editorUndo,
  editorUnorderedList,
  email,
  empty,
  emsApp,
  exit,
  expand,
  exportAction,
  eye,
  eyeClosed,
  faceHappy,
  faceNeutral,
  faceSad,
  filebeatApp,
  filter,
  folderClosed,
  folderOpen,
  fullScreen,
  gear,
  gisApp,
  glasses,
  globe,
  grab,
  grabHorizontal,
  graphApp,
  grid,
  grokApp,
  heartbeatApp,
  heatmap,
  help,
  iInCircle,
  importAction,
  indexClose,
  indexEdit,
  indexFlush,
  indexManagementApp,
  indexMapping,
  indexOpen,
  indexPatternApp,
  indexRollupApp,
  indexSettings,
  infraApp,
  inputOutput,
  inspect,
  invert,
  kqlField,
  kqlFunction,
  kqlOperand,
  kqlSelector,
  kqlValue,
  link,
  list,
  listAdd,
  lock,
  lockOpen,
  loggingApp,
  logoAerospike,
  logoApache,
  logoAPM,
  logoAppSearch,
  logoAWS,
  logoAWSMono,
  logoBeats,
  logoBusinessAnalytics,
  logoCeph,
  logoCloud,
  logoCloudEnterprise,
  logoCodesandbox,
  logoCouchbase,
  logoDocker,
  logoDropwizard,
  logoElastic,
  logoElasticsearch,
  logoElasticStack,
  logoEnterpriseSearch,
  logoEtcd,
  logoGCP,
  logoGCPMono,
  logoGithub,
  logoGmail,
  logoGolang,
  logoHAproxy,
  logoIBM,
  logoIBMMono,
  logoKafka,
  logoKibana,
  logoKubernetes,
  logoLogstash,
  logoMemcached,
  logoMetrics,
  logoMongodb,
  logoMySQL,
  logoNginx,
  logoOsquery,
  logoPhp,
  logoPostgres,
  logoPrometheus,
  logoRabbitmq,
  logoRedis,
  logoSiteSearch,
  logoSketch,
  logoSlack,
  logoWebhook,
  logoWindows,
  logoXpack,
  logstashFilter,
  logstashIf,
  logstashInput,
  logstashOutput,
  logstashQueue,
  machineLearningApp,
  managementApp,
  mapMarker,
  memory,
  merge,
  menuLeft,
  menuRight,
  metricbeatApp,
  minusInCircle,
  minusInCircleFilled,
  monitoringApp,
  node,
  notebookApp,
  number,
  offline,
  online,
  packetbeatApp,
  pause,
  pencil,
  pin,
  pipelineApp,
  play,
  plusInCircle,
  plusInCircleFilled,
  popout,
  questionInCircle,
  refresh,
  reportingApp,
  save,
  savedObjectsApp,
  scale,
  search,
  searchProfilerApp,
  securityAnalyticsApp,
  securityApp,
  shard,
  share,
  snowflake,
  sortable,
  sortDown,
  sortLeft,
  sortRight,
  sortUp,
  spacesApp,
  sqlApp,
  starEmpty,
  starEmptySpace,
  starFilled,
  starFilledSpace,
  starMinusEmpty,
  starMinusFilled,
  starPlusEmpty,
  starPlusFilled,
  stats,
  stop,
  stopFilled,
  storage,
  string,
  submodule,
  symlink,
  tableOfContents,
  tag,
  tear,
  temperature,
  timelionApp,
  tokenAnnotation,
  tokenArray,
  tokenBoolean,
  tokenClass,
  tokenConstant,
  tokenElement,
  tokenEnum,
  tokenEnumMember,
  tokenEvent,
  tokenException,
  tokenField,
  tokenFile,
  tokenFunction,
  tokenInterface,
  tokenKey,
  tokenMethod,
  tokenNull,
  tokenNumber,
  tokenObject,
  tokenOperator,
  tokenPackage,
  tokenParameter,
  tokenProperty,
  tokenRepo,
  tokenString,
  tokenStruct,
  tokenSymbol,
  tokenVariable,
  trash,
  upgradeAssistantApp,
  pinFilled,
  uptimeApp,
  user,
  usersRolesApp,
  vector,
  visArea,
  visBarHorizontal,
  visBarVertical,
  visControls,
  visGauge,
  visGoal,
  visHeatmap,
  visLine,
  visMapCoordinate,
  visMapRegion,
  visMetric,
  visPie,
  visTable,
  visTagCloud,
  visText,
  visTimelion,
  visualizeApp,
  visVega,
  visVisualBuilder,
  watchesApp,
  wrench,
};

export const TYPES: IconType[] = keysOf(typeToIconMap);

export type IconType = keyof typeof typeToIconMap;

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
  type?: IconType;
  /**
   * One of EUI's color palette or a valid CSS color value https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   */
  color?: IconColor;
  size?: IconSize;
}

type Props = CommonProps & SVGAttributes<SVGElement> & EuiIconProps;

export const EuiIcon: FunctionComponent<Props> = ({
  type,
  size = 'm',
  color,
  className,
  tabIndex,
  ...rest
}) => {
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

  const Svg = (type && typeToIconMap[type]) || empty;

  // This is a fix for IE and Edge, which ignores tabindex="-1" on an SVG, but respects
  // focusable="false".
  //   - If there's no tab index specified, we'll default the icon to not be focusable,
  //     which is how SVGs behave in Chrome, Safari, and FF.
  //   - If tab index is -1, then the consumer wants the icon to not be focusable.
  //   - For all other values, the consumer wants the icon to be focusable.
  const focusable = tabIndex == null || tabIndex === -1 ? 'false' : 'true';

  return (
    <Svg
      className={classes}
      style={optionalCustomStyles}
      tabIndex={tabIndex}
      focusable={focusable}
      {...rest}
    />
  );
};
