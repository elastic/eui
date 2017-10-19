'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiText = exports.TEXT_SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var textSizeToClassNameMap = {
  s: 'kuiText--small'
};

var TEXT_SIZES = exports.TEXT_SIZES = Object.keys(textSizeToClassNameMap);

var KuiText = function KuiText(_ref) {
  var size = _ref.size,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['size', 'children', 'className']);

  var classes = (0, _classnames2.default)('kuiText', textSizeToClassNameMap[size], className);

  return _react2.default.createElement(
    'div',
    _extends({ className: classes }, rest),
    children
  );
};

exports.KuiText = KuiText;
KuiText.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(TEXT_SIZES)
};