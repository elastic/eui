'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiFormLabel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var KuiFormLabel = function KuiFormLabel(_ref) {
  var children = _ref.children,
      isFocused = _ref.isFocused,
      isInvalid = _ref.isInvalid,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['children', 'isFocused', 'isInvalid', 'className']);

  var classes = (0, _classnames2.default)('kuiFormLabel', className, {
    'kuiFormLabel-isFocused': isFocused,
    'kuiFormLabel-isInvalid': isInvalid
  });

  return _react2.default.createElement(
    'label',
    _extends({
      className: classes
    }, rest),
    children
  );
};

exports.KuiFormLabel = KuiFormLabel;
KuiFormLabel.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  isFocused: _propTypes2.default.bool,
  isInvalid: _propTypes2.default.bool
};