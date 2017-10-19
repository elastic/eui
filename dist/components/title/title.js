'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiTitle = exports.TITLE_SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var titleSizeToClassNameMap = {
  small: 'kuiTitle--small',
  large: 'kuiTitle--large'
};

var TITLE_SIZES = exports.TITLE_SIZES = Object.keys(titleSizeToClassNameMap);

var KuiTitle = function KuiTitle(_ref) {
  var size = _ref.size,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['size', 'children', 'className']);

  var classes = (0, _classnames2.default)('kuiTitle', titleSizeToClassNameMap[size], className);

  var props = _extends({
    className: classes
  }, rest);

  return (0, _react.cloneElement)(children, props);
};

exports.KuiTitle = KuiTitle;
KuiTitle.propTypes = {
  children: _propTypes2.default.element.isRequired,
  className: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(TITLE_SIZES)
};