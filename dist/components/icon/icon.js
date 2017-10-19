'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiIcon = exports.SIZES = exports.TYPES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./assets/app_apm.svg');

require('./assets/app_dashboard.svg');

require('./assets/app_devtools.svg');

require('./assets/app_discover.svg');

require('./assets/app_graph.svg');

require('./assets/app_logging.svg');

require('./assets/app_ml.svg');

require('./assets/app_monitoring.svg');

require('./assets/app_timelion.svg');

require('./assets/app_visualize.svg');

require('./assets/apps.svg');

require('./assets/arrow_down.svg');

require('./assets/arrow_left.svg');

require('./assets/arrow_right.svg');

require('./assets/arrow_up.svg');

require('./assets/bolt.svg');

require('./assets/boxes_horizontal.svg');

require('./assets/boxes_vertical.svg');

require('./assets/brush.svg');

require('./assets/bullseye.svg');

require('./assets/check.svg');

require('./assets/clock.svg');

require('./assets/console.svg');

require('./assets/controls_horizontal.svg');

require('./assets/controls_vertical.svg');

require('./assets/cross.svg');

require('./assets/document.svg');

require('./assets/dot.svg');

require('./assets/empty.svg');

require('./assets/face_happy.svg');

require('./assets/face_sad.svg');

require('./assets/full_screen.svg');

require('./assets/gear.svg');

require('./assets/grid.svg');

require('./assets/help.svg');

require('./assets/link.svg');

require('./assets/list_add.svg');

require('./assets/list.svg');

require('./assets/lock.svg');

require('./assets/logo_beats.svg');

require('./assets/logo_cloud.svg');

require('./assets/logo_elastic_stack.svg');

require('./assets/logo_gmail.svg');

require('./assets/logo_logstash.svg');

require('./assets/logo_slack.svg');

require('./assets/logo_webhook.svg');

require('./assets/logo_xpack.svg');

require('./assets/logo_kibana.svg');

require('./assets/map_marker.svg');

require('./assets/node.svg');

require('./assets/pencil.svg');

require('./assets/plus_in_circle.svg');

require('./assets/search.svg');

require('./assets/shard.svg');

require('./assets/share.svg');

require('./assets/sort_down.svg');

require('./assets/sort_up.svg');

require('./assets/star_empty.svg');

require('./assets/tear.svg');

require('./assets/trash.svg');

require('./assets/user.svg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var humanizeCamelCase = function humanizeCamelCase(str) {
  return (
    // Put spaces between words in camel-cased strings.
    str.replace(/([A-Z])/g, function (g) {
      return ' ' + g[0].toLowerCase();
    })
  );
};

var typeToIconMap = {
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
  visualizeApp: 'app_visualize'
};

var TYPES = exports.TYPES = Object.keys(typeToIconMap);

var sizeToClassNameMap = {
  original: '',
  medium: 'kuiIcon--medium',
  large: 'kuiIcon--large',
  xLarge: 'kuiIcon--xLarge',
  xxLarge: 'kuiIcon--xxLarge'
};

var SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

var KuiIcon = function KuiIcon(_ref) {
  var type = _ref.type,
      size = _ref.size,
      title = _ref.title,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['type', 'size', 'title', 'className']);

  var classes = (0, _classnames2.default)('kuiIcon', className, sizeToClassNameMap[size]);

  var titleElement = title ? _react2.default.createElement(
    'title',
    null,
    title
  ) : _react2.default.createElement(
    'title',
    null,
    humanizeCamelCase(type) + ' icon'
  );
  var svgReference = _react2.default.createElement('use', { xlinkHref: '#' + typeToIconMap[type] });

  return _react2.default.createElement(
    'svg',
    _extends({
      className: classes
    }, rest),
    titleElement,
    svgReference
  );
};

exports.KuiIcon = KuiIcon;
KuiIcon.propTypes = {
  type: _propTypes2.default.oneOf(TYPES),
  size: _propTypes2.default.oneOf(SIZES),
  title: _propTypes2.default.string
};

KuiIcon.defaultProps = {
  className: 'kuiIcon--basic',
  size: 'medium'
};