'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiProgress = exports.POSITIONS = exports.COLORS = exports.SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var sizeToClassNameMap = {
  xs: 'kuiProgress--xs',
  s: 'kuiProgress--s',
  m: 'kuiProgress--m',
  l: 'kuiProgress--l'
};

var SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

var colorToClassNameMap = {
  primary: 'kuiProgress--primary',
  secondary: 'kuiProgress--secondary',
  danger: 'kuiProgress--danger',
  subdued: 'kuiProgress--subdued',
  accent: 'kuiProgress--accent'
};

var COLORS = exports.COLORS = Object.keys(colorToClassNameMap);

var positionsToClassNameMap = {
  fixed: 'kuiProgress--fixed',
  absolute: 'kuiProgress--absolute',
  static: ''
};

var POSITIONS = exports.POSITIONS = Object.keys(positionsToClassNameMap);

var KuiProgress = function KuiProgress(_ref) {
  var className = _ref.className,
      color = _ref.color,
      value = _ref.value,
      max = _ref.max,
      size = _ref.size,
      position = _ref.position,
      rest = _objectWithoutProperties(_ref, ['className', 'color', 'value', 'max', 'size', 'position']);

  var classes = (0, _classnames2.default)('kuiProgress', {
    'kuiProgress--indeterminate': max === null
  }, sizeToClassNameMap[size], colorToClassNameMap[color], positionsToClassNameMap[position], className);

  // Because of a FireFox issue with animation, indeterminate progress needs to use a div.
  // See https://css-tricks.com/html5-progress-element/.
  var progressType = null;
  if (max) {
    progressType = _react2.default.createElement('progress', _extends({
      value: value,
      max: max,
      className: classes
    }, rest));
  } else {
    progressType = _react2.default.createElement('div', _extends({
      className: classes
    }, rest));
  }

  return _react2.default.createElement(
    'div',
    null,
    progressType
  );
};

exports.KuiProgress = KuiProgress;
KuiProgress.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(SIZES),
  color: _propTypes2.default.oneOf(COLORS),
  position: _propTypes2.default.oneOf(POSITIONS),
  max: _propTypes2.default.number,
  indeterminate: _propTypes2.default.bool
};

KuiProgress.defaultProps = {
  max: null,
  size: 'm',
  color: 'secondary',
  position: 'static'
};
//# sourceMappingURL=progress.js.map