'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiExpressionItemButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var KuiExpressionItemButton = function KuiExpressionItemButton(_ref) {
  var className = _ref.className,
      description = _ref.description,
      value = _ref.value,
      isActive = _ref.isActive,
      onClick = _ref.onClick,
      rest = _objectWithoutProperties(_ref, ['className', 'description', 'value', 'isActive', 'onClick']);

  var classes = (0, _classnames2.default)('kuiExpressionItem__button', className, {
    'kuiExpressionItem__button--isActive': isActive
  });

  return _react2.default.createElement(
    'button',
    _extends({
      className: classes,
      onClick: onClick
    }, rest),
    _react2.default.createElement(
      'span',
      { className: 'kuiExpressionItem__buttonDescription' },
      description
    ),
    ' ',
    _react2.default.createElement(
      'span',
      { className: 'kuiExpression_buttonValue' },
      value
    )
  );
};

exports.KuiExpressionItemButton = KuiExpressionItemButton;
KuiExpressionItemButton.propTypes = {
  className: _propTypes2.default.string,
  description: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.string.isRequired,
  isActive: _propTypes2.default.bool.isRequired,
  onClick: _propTypes2.default.func.isRequired
};