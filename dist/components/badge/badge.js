'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiBadge = exports.ICON_SIDES = exports.TYPES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var typesToClassNameMap = {
  default: 'kuiBadge--default',
  primary: 'kuiBadge--primary',
  secondary: 'kuiBadge--secondary',
  accent: 'kuiBadge--accent',
  warning: 'kuiBadge--warning',
  danger: 'kuiBadge--danger'
};

var TYPES = exports.TYPES = Object.keys(typesToClassNameMap);

var iconSideToClassNameMap = {
  left: '',
  right: 'kuiBadge--iconRight'
};

var ICON_SIDES = exports.ICON_SIDES = Object.keys(iconSideToClassNameMap);

var KuiBadge = function KuiBadge(_ref) {
  var children = _ref.children,
      type = _ref.type,
      iconType = _ref.iconType,
      iconSide = _ref.iconSide,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['children', 'type', 'iconType', 'iconSide', 'className']);

  var classes = (0, _classnames2.default)('kuiBadge', typesToClassNameMap[type], iconSideToClassNameMap[iconSide], className);

  var optionalIcon = null;
  if (iconType) {
    optionalIcon = _react2.default.createElement(_icon.KuiIcon, { type: iconType, size: 'medium', className: 'kuiBadge__icon' });
  }

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement(
      'span',
      { className: 'kuiBadge__content' },
      optionalIcon,
      _react2.default.createElement(
        'span',
        null,
        children
      )
    )
  );
};

exports.KuiBadge = KuiBadge;
KuiBadge.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  iconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),
  iconSide: _propTypes2.default.string,
  type: _propTypes2.default.string
};

KuiBadge.defaultProps = {
  type: 'default',
  iconSide: 'left'
};