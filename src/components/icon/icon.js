import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import addDataApp from './assets/app_add_data.svg';
import advancedSettingsApp from './assets/app_advanced_settings.svg';
import alert from './assets/alert.svg';
import apmApp from './assets/app_apm.svg';
import apps from './assets/apps.svg';
import arrowDown from './assets/arrow_down.svg';
import arrowLeft from './assets/arrow_left.svg';
import arrowRight from './assets/arrow_right.svg';
import arrowUp from './assets/arrow_up.svg';
import asterisk from './assets/asterisk.svg';
import bolt from './assets/bolt.svg';
import boxesHorizontal from './assets/boxes_horizontal.svg';
import boxesVertical from './assets/boxes_vertical.svg';
import broom from './assets/broom.svg';
import brush from './assets/brush.svg';
import bullseye from './assets/bullseye.svg';
import calendar from './assets/calendar.svg';
import check from './assets/check.svg';
import checkInCircleFilled from './assets/checkInCircleFilled.svg';
import clock from './assets/clock.svg';
import console from './assets/console.svg';
import consoleApp from './assets/app_console.svg';
import controlsHorizontal from './assets/controls_horizontal.svg';
import controlsVertical from './assets/controls_vertical.svg';
import copy from './assets/copy.svg';
import copyClipboard from './assets/copy_clipboard.svg';
import cross from './assets/cross.svg';
import dashboardApp from './assets/app_dashboard.svg';
import devToolsApp from './assets/app_devtools.svg';
import discoverApp from './assets/app_discover.svg';
import document from './assets/document.svg';
import dot from './assets/dot.svg';
import empty from './assets/empty.svg';
import exit from './assets/exit.svg';
import expand from './assets/expand.svg';
import faceHappy from './assets/face_happy.svg';
import faceNeutral from './assets/faceNeutral.svg';
import faceSad from './assets/face_sad.svg';
import fullScreen from './assets/full_screen.svg';
import gear from './assets/gear.svg';
import graphApp from './assets/app_graph.svg';
import grid from './assets/grid.svg';
import grokApp from './assets/app_grok.svg';
import help from './assets/help.svg';
import iInCircle from './assets/iInCircle.svg';
import indexPatternApp from './assets/app_index_pattern.svg';
import indexClose from './assets/index_close.svg';
import indexEdit from './assets/index_edit.svg';
import indexFlush from './assets/index_flush.svg';
import indexMapping from './assets/index_mapping.svg';
import indexOpen from './assets/index_open.svg';
import indexSettings from './assets/index_settings.svg';
import invert from './assets/invert.svg';
import link from './assets/link.svg';
import list from './assets/list.svg';
import listAdd from './assets/list_add.svg';
import lock from './assets/lock.svg';
import loggingApp from './assets/app_logging.svg';
import logoApache from './assets/logo_apache.svg';
import logoBeats from './assets/logo_beats.svg';
import logoCloud from './assets/logo_cloud.svg';
import logoElastic from './assets/logo_elastic.svg';
import logoElasticSearch from './assets/logo_elastic_search.svg';
import logoElasticStack from './assets/logo_elastic_stack.svg';
import logoGmail from './assets/logo_gmail.svg';
import logoKibana from './assets/logo_kibana.svg';
import logoLogstash from './assets/logo_logstash.svg';
import logoMySQL from './assets/logo_mysql.svg';
import logoNginx from './assets/logo_nginx.svg';
import logoSlack from './assets/logo_slack.svg';
import logoWebhook from './assets/logo_webhook.svg';
import logoXpack from './assets/logo_xpack.svg';
import machineLearningApp from './assets/app_ml.svg';
import managementApp from './assets/app_management.svg';
import mapMarker from './assets/map_marker.svg';
import merge from './assets/merge.svg';
import minusInCircle from './assets/minus_in_circle.svg';
import monitoringApp from './assets/app_monitoring.svg';
import node from './assets/node.svg';
import number from './assets/number.svg';
import pause from './assets/pause.svg';
import pencil from './assets/pencil.svg';
import pin from './assets/pin.svg';
import pipelineApp from './assets/app_pipeline.svg';
import play from './assets/play.svg';
import plusInCircle from './assets/plus_in_circle.svg';
import popout from './assets/popout.svg';
import questionInCircle from './assets/question_in_circle.svg';
import refresh from './assets/refresh.svg';
import reportingApp from './assets/app_reporting.svg';
import savedObjectsApp from './assets/app_saved_objects.svg';
import scale from './assets/scale.svg';
import search from './assets/search.svg';
import searchProfilerApp from './assets/app_search_profiler.svg';
import securityApp from './assets/app_security.svg';
import shard from './assets/shard.svg';
import share from './assets/share.svg';
import sortDown from './assets/sort_down.svg';
import sortLeft from './assets/sortLeft.svg';
import sortRight from './assets/sortRight.svg';
import sortUp from './assets/sort_up.svg';
import starEmpty from './assets/star_empty.svg';
import starPlusFilled from './assets/starPlusFilled.svg';
import stats from './assets/stats.svg';
import string from './assets/string.svg';
import tableOfContents from './assets/tableOfContents.svg';
import tear from './assets/tear.svg';
import timelionApp from './assets/app_timelion.svg';
import trash from './assets/trash.svg';
import upgradeAssistantApp from './assets/app_upgrade_assistant.svg';
import user from './assets/user.svg';
import usersRolesApp from './assets/app_users_roles.svg';
import visualizeApp from './assets/app_visualize.svg';
import watchesApp from './assets/app_watches.svg';
import wrench from './assets/wrench.svg';

const typeToIconMap = {
  addDataApp,
  advancedSettingsApp,
  alert,
  apmApp,
  apps,
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  asterisk,
  bolt,
  boxesHorizontal,
  boxesVertical,
  broom,
  brush,
  bullseye,
  calendar,
  check,
  checkInCircleFilled,
  clock,
  console,
  consoleApp,
  controlsHorizontal,
  controlsVertical,
  copy,
  copyClipboard,
  cross,
  dashboardApp,
  devToolsApp,
  discoverApp,
  document,
  dot,
  empty,
  exit,
  expand,
  faceHappy,
  faceNeutral,
  faceSad,
  fullScreen,
  gear,
  graphApp,
  grid,
  grokApp,
  help,
  iInCircle,
  indexClose,
  indexEdit,
  indexFlush,
  indexMapping,
  indexOpen,
  indexSettings,
  indexPatternApp,
  invert,
  link,
  list,
  listAdd,
  lock,
  loggingApp,
  logoApache,
  logoBeats,
  logoCloud,
  logoElastic,
  logoElasticSearch,
  logoElasticStack,
  logoGmail,
  logoKibana,
  logoLogstash,
  logoMySQL,
  logoNginx,
  logoSlack,
  logoWebhook,
  logoXpack,
  machineLearningApp,
  managementApp,
  mapMarker,
  merge,
  minusInCircle,
  monitoringApp,
  node,
  number,
  pause,
  pencil,
  pin,
  pipelineApp,
  play,
  plusInCircle,
  popout,
  questionInCircle,
  refresh,
  reportingApp,
  savedObjectsApp,
  scale,
  search,
  searchProfilerApp,
  securityApp,
  shard,
  share,
  sortDown,
  sortLeft,
  sortRight,
  sortUp,
  starEmpty,
  starPlusFilled,
  stats,
  string,
  tableOfContents,
  tear,
  timelionApp,
  trash,
  upgradeAssistantApp,
  user,
  usersRolesApp,
  visualizeApp,
  watchesApp,
  wrench,
};

export const TYPES = Object.keys(typeToIconMap);

const colorToClassMap = {
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

export const COLORS = Object.keys(colorToClassMap);

const sizeToClassNameMap = {
  original: null,
  s: 'euiIcon--small',
  m: 'euiIcon--medium',
  l: 'euiIcon--large',
  xl: 'euiIcon--xLarge',
  xxl: 'euiIcon--xxLarge',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiIcon = ({
  type,
  size,
  color,
  className,
  ...rest
}) => {
  const classes = classNames('euiIcon', className, sizeToClassNameMap[size], colorToClassMap[color]);

  const Svg = typeToIconMap[type] || empty;

  return <Svg className={classes} {...rest} />;
};

EuiIcon.propTypes = {
  type: PropTypes.oneOf(TYPES),
  color: PropTypes.oneOf(COLORS),
  size: PropTypes.oneOf(SIZES)
};

EuiIcon.defaultProps = {
  size: 'm',
};
