import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './assets/alert.svg';
import './assets/app_add_data.svg';
import './assets/app_advanced_settings.svg';
import './assets/app_apm.svg';
import './assets/app_console.svg';
import './assets/app_dashboard.svg';
import './assets/app_devtools.svg';
import './assets/app_discover.svg';
import './assets/app_graph.svg';
import './assets/app_grok.svg';
import './assets/app_index_pattern.svg';
import './assets/app_logging.svg';
import './assets/app_management.svg';
import './assets/app_ml.svg';
import './assets/app_monitoring.svg';
import './assets/app_pipeline.svg';
import './assets/app_reporting.svg';
import './assets/app_saved_objects.svg';
import './assets/app_search_profiler.svg';
import './assets/app_security.svg';
import './assets/app_timelion.svg';
import './assets/app_upgrade_assistant.svg';
import './assets/app_users_roles.svg';
import './assets/app_visualize.svg';
import './assets/app_watches.svg';
import './assets/apps.svg';
import './assets/arrow_down.svg';
import './assets/arrow_left.svg';
import './assets/arrow_right.svg';
import './assets/arrow_up.svg';
import './assets/bolt.svg';
import './assets/boxes_horizontal.svg';
import './assets/boxes_vertical.svg';
import './assets/brush.svg';
import './assets/bullseye.svg';
import './assets/check.svg';
import './assets/clock.svg';
import './assets/console.svg';
import './assets/controls_horizontal.svg';
import './assets/controls_vertical.svg';
import './assets/copy.svg';
import './assets/copy_clipboard.svg';
import './assets/cross.svg';
import './assets/document.svg';
import './assets/dot.svg';
import './assets/empty.svg';
import './assets/face_happy.svg';
import './assets/face_sad.svg';
import './assets/full_screen.svg';
import './assets/gear.svg';
import './assets/grid.svg';
import './assets/help.svg';
import './assets/invert.svg';
import './assets/link.svg';
import './assets/list_add.svg';
import './assets/list.svg';
import './assets/lock.svg';
import './assets/logo_beats.svg';
import './assets/logo_cloud.svg';
import './assets/logo_elastic.svg';
import './assets/logo_elastic_search.svg';
import './assets/logo_elastic_stack.svg';
import './assets/logo_gmail.svg';
import './assets/logo_logstash.svg';
import './assets/logo_slack.svg';
import './assets/logo_webhook.svg';
import './assets/logo_xpack.svg';
import './assets/logo_kibana.svg';
import './assets/map_marker.svg';
import './assets/minus_in_circle.svg';
import './assets/node.svg';
import './assets/pencil.svg';
import './assets/pin.svg';
import './assets/plus_in_circle.svg';
import './assets/question_in_circle.svg';
import './assets/search.svg';
import './assets/shard.svg';
import './assets/share.svg';
import './assets/sort_down.svg';
import './assets/sort_up.svg';
import './assets/star_empty.svg';
import './assets/tear.svg';
import './assets/trash.svg';
import './assets/user.svg';
import './assets/wrench.svg';

const humanizeCamelCase = str => (
  // Put spaces between words in camel-cased strings.
  str.replace(/([A-Z])/g, g => ` ${g[0].toLowerCase()}`)
);

const typeToIconMap = {
  alert: 'alert',
  addDataApp: 'app_add_data',
  advancedSettingsApp: 'app_advanced_settings',
  apmApp: 'app_apm',
  apps: 'apps',
  arrowDown: 'arrow_down',
  arrowLeft: 'arrow_left',
  arrowRight: 'arrow_right',
  arrowUp: 'arrow_up',
  bolt: 'bolt',
  boxesHorizontal: 'boxes_horizontal',
  boxesVertical: 'boxes_vertical',
  brush: 'brush',
  bullseye: 'bullseye',
  check: 'check',
  clock: 'clock',
  console: 'console',
  consoleApp: 'app_console',
  controlsHorizontal: 'controls_horizontal',
  controlsVertical: 'controls_vertical',
  copy: 'copy',
  copyClipboard: 'copy_clipboard',
  cross: 'cross',
  dashboardApp: 'app_dashboard',
  devToolsApp: 'app_devtools',
  discoverApp: 'app_discover',
  document: 'document',
  dot: 'dot',
  empty: 'empty',
  faceHappy: 'face_happy',
  faceSad: 'face_sad',
  fullScreen: 'full_screen',
  gear: 'gear',
  graphApp: 'app_graph',
  grid: 'grid',
  grokApp: 'app_grok',
  help: 'help',
  indexPatternApp: 'app_index_pattern',
  invert: 'invert',
  link: 'link',
  list: 'list',
  listAdd: 'list_add',
  lock: 'lock',
  loggingApp: 'app_logging',
  logoBeats: 'logo_beats',
  logoCloud: 'logo_cloud',
  logoElastic: 'logo_elastic',
  logoElasticSearch: 'logo_elastic_search',
  logoElasticStack: 'logo_elastic_stack',
  logoGmail: 'logo_gmail',
  logoKibana: 'logo_kibana',
  logoLogstash: 'logo_logstash',
  logoSlack: 'logo_slack',
  logoWebhook: 'logo_webhook',
  logoXpack: 'logo_xpack',
  machineLearningApp: 'app_ml',
  managementApp: 'app_management',
  mapMarker: 'map_marker',
  minusInCircle: 'minus_in_circle',
  monitoringApp: 'app_monitoring',
  node: 'node',
  pencil: 'pencil',
  pin: 'pin',
  pipelineApp: 'app_pipeline',
  plusInCircle: 'plus_in_circle',
  questionInCircle: 'question_in_circle',
  reportingApp: 'app_reporting',
  savedObjectsApp: 'app_saved_objects',
  search: 'search',
  searchProfilerApp: 'app_search_profiler',
  securityApp: 'app_security',
  shard: 'shard',
  share: 'share',
  share: 'share',
  sortDown: 'sort_down',
  sortUp: 'sort_up',
  starEmpty: 'star_empty',
  tear: 'tear',
  timelionApp: 'app_timelion',
  trash: 'trash',
  usersRolesApp: 'app_users_roles',
  upgradeAssistantApp: 'app_upgrade_assistant',
  user: 'user',
  visualizeApp: 'app_visualize',
  watchesApp: 'app_watches',
  wrench: 'wrench',
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
};

export const COLORS = Object.keys(colorToClassMap);

const sizeToClassNameMap = {
  original: null,
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
  title,
  className,
  ...rest
}) => {
  const classes = classNames('euiIcon', className, sizeToClassNameMap[size], colorToClassMap[color]);

  const titleText = title
    ? title
    : `${humanizeCamelCase(type)} icon`;

  const svgReference = <use xlinkHref={`#${typeToIconMap[type]}`} />;

  return (
    <svg
      className={classes}
      {...rest}
    >
      <title>{titleText}</title>
      {svgReference}
    </svg>
  );
};

EuiIcon.propTypes = {
  type: PropTypes.oneOf(TYPES),
  color: PropTypes.oneOf(COLORS),
  size: PropTypes.oneOf(SIZES),
  title: PropTypes.string,
};

EuiIcon.defaultProps = {
  size: 'm',
};
