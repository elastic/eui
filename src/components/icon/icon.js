import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './assets/app_apm.svg';
import './assets/app_dashboard.svg';
import './assets/app_devtools.svg';
import './assets/app_discover.svg';
import './assets/app_graph.svg';
import './assets/app_logging.svg';
import './assets/app_ml.svg';
import './assets/app_monitoring.svg';
import './assets/app_timelion.svg';
import './assets/app_visualize.svg';
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
import './assets/link.svg';
import './assets/list_add.svg';
import './assets/list.svg';
import './assets/lock.svg';
import './assets/logo_beats.svg';
import './assets/logo_cloud.svg';
import './assets/logo_elastic_stack.svg';
import './assets/logo_gmail.svg';
import './assets/logo_logstash.svg';
import './assets/logo_slack.svg';
import './assets/logo_webhook.svg';
import './assets/logo_xpack.svg';
import './assets/logo_kibana.svg';
import './assets/map_marker.svg';
import './assets/node.svg';
import './assets/pencil.svg';
import './assets/plus_in_circle.svg';
import './assets/search.svg';
import './assets/shard.svg';
import './assets/share.svg';
import './assets/sort_down.svg';
import './assets/sort_up.svg';
import './assets/star_empty.svg';
import './assets/tear.svg';
import './assets/trash.svg';
import './assets/user.svg';

const humanizeCamelCase = str => (
  // Put spaces between words in camel-cased strings.
  str.replace(/([A-Z])/g, g => ` ${g[0].toLowerCase()}`)
);

const typeToIconMap = {
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
  controlsHorizontal: 'controls_horizontal',
  controlsVertical: 'controls_vertical',
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
  help: 'help',
  link: 'link',
  list: 'list',
  listAdd: 'list_add',
  lock: 'lock',
  loggingApp: 'app_logging',
  logoBeats: 'logo_beats',
  logoCloud: 'logo_cloud',
  logoElasticStack: 'logo_elastic_stack',
  logoGmail: 'logo_gmail',
  logoKibana: 'logo_kibana',
  logoLogstash: 'logo_logstash',
  logoSlack: 'logo_slack',
  logoWebhook: 'logo_webhook',
  logoXpack: 'logo_xpack',
  machineLearningApp: 'app_ml',
  mapMarker: 'map_marker',
  monitoringApp: 'app_monitoring',
  node: 'node',
  pencil: 'pencil',
  plusInCircle: 'plus_in_circle',
  search: 'search',
  shard: 'shard',
  share: 'share',
  sortDown: 'sort_down',
  sortUp: 'sort_up',
  starEmpty: 'star_empty',
  tear: 'tear',
  timelionApp: 'app_timelion',
  trash: 'trash',
  user: 'user',
  visualizeApp: 'app_visualize',
};

export const TYPES = Object.keys(typeToIconMap);

const sizeToClassNameMap = {
  original: '',
  medium: 'kuiIcon--medium',
  large: 'kuiIcon--large',
  xLarge: 'kuiIcon--xLarge',
  xxLarge: 'kuiIcon--xxLarge',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const KuiIcon = ({
  type,
  size,
  title,
  className,
  ...rest,
}) => {
  const classes = classNames('kuiIcon', className, sizeToClassNameMap[size]);

  const titleElement =
    title
    ? <title>{title}</title>
    : <title>{`${humanizeCamelCase(type)} icon`}</title>;
  const svgReference = <use xlinkHref={`#${typeToIconMap[type]}`} />;

  return (
    <svg
      className={classes}
      {...rest}
    >
      {titleElement}
      {svgReference}
    </svg>
  );
};

KuiIcon.propTypes = {
  type: PropTypes.oneOf(TYPES),
  size: PropTypes.oneOf(SIZES),
  title: PropTypes.string,
};

KuiIcon.defaultProps = {
  className: 'kuiIcon--basic',
  size: 'medium',
};
