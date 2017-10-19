'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiHorizontalRule = exports.MARGINS = exports.SIZES = undefined;

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
  full: 'kuiHorizontalRule--full',
  half: 'kuiHorizontalRule--half',
  quarter: 'kuiHorizontalRule--quarter'
};

var SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

var marginToClassNameMap = {
  small: 'kuiHorizontalRule--marginSmall',
  medium: 'kuiHorizontalRule--marginMedium',
  large: 'kuiHorizontalRule--marginLarge',
  XLarge: 'kuiHorizontalRule--marginXLarge',
  XXLarge: 'kuiHorizontalRule--marginXXLarge'
};

var MARGINS = exports.MARGINS = Object.keys(marginToClassNameMap);

var KuiHorizontalRule = function KuiHorizontalRule(_ref) {
  var className = _ref.className,
      size = _ref.size,
      margin = _ref.margin,
      rest = _objectWithoutProperties(_ref, ['className', 'size', 'margin']);

  var classes = (0, _classnames2.default)('kuiHorizontalRule', sizeToClassNameMap[size], marginToClassNameMap[margin], className);

  return _react2.default.createElement('hr', _extends({
    className: classes
  }, rest));
};

exports.KuiHorizontalRule = KuiHorizontalRule;
KuiHorizontalRule.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(SIZES),
  margin: _propTypes2.default.oneOf(MARGINS)
};

KuiHorizontalRule.defaultProps = {
  size: 'full',
  margin: 'large'
};