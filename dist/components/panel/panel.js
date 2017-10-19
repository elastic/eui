'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiPanel = exports.SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var paddingSizeToClassNameMap = {
  'none': null,
  's': 'kuiPanel--paddingSmall',
  'm': 'kuiPanel--paddingMedium',
  'l': 'kuiPanel--paddingLarge'
};

var SIZES = exports.SIZES = Object.keys(paddingSizeToClassNameMap);

var KuiPanel = function KuiPanel(_ref) {
  var children = _ref.children,
      className = _ref.className,
      paddingSize = _ref.paddingSize,
      hasShadow = _ref.hasShadow,
      grow = _ref.grow,
      panelRef = _ref.panelRef,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'paddingSize', 'hasShadow', 'grow', 'panelRef']);

  var classes = (0, _classnames2.default)('kuiPanel', paddingSizeToClassNameMap[paddingSize], {
    'kuiPanel--shadow': hasShadow,
    'kuiPanel--flexGrowZero': !grow
  }, className);

  return _react2.default.createElement(
    'div',
    _extends({
      ref: panelRef,
      className: classes
    }, rest),
    children
  );
};

exports.KuiPanel = KuiPanel;
KuiPanel.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  hasShadow: _propTypes2.default.bool,
  paddingSize: _propTypes2.default.oneOf(SIZES),
  grow: _propTypes2.default.bool,
  panelRef: _propTypes2.default.func
};

KuiPanel.defaultProps = {
  paddingSize: 'm',
  hasShadow: false,
  grow: true
};