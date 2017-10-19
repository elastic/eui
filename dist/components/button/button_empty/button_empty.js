'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiButtonEmpty = exports.FLUSH_TYPES = exports.ICON_SIDES = exports.SIZES = exports.TYPES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var typeToClassNameMap = {
  primary: 'kuiButtonEmpty--primary',
  danger: 'kuiButtonEmpty--danger',
  disabled: 'kuiButtonEmpty--disabled',
  text: 'kuiButtonEmpty--text',
  ghost: 'kuiButtonEmpty--ghost'
};

var TYPES = exports.TYPES = Object.keys(typeToClassNameMap);

var sizeToClassNameMap = {
  small: 'kuiButtonEmpty--small',
  large: 'kuiButtonEmpty--large'
};

var SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

var iconSideToClassNameMap = {
  left: '',
  right: 'kuiButtonEmpty--iconRight'
};

var ICON_SIDES = exports.ICON_SIDES = Object.keys(iconSideToClassNameMap);

var flushTypeToClassNameMap = {
  'left': 'kuiButtonEmpty--flushLeft',
  'right': 'kuiButtonEmpty--flushRight'
};

var FLUSH_TYPES = exports.FLUSH_TYPES = Object.keys(flushTypeToClassNameMap);

var KuiButtonEmpty = function KuiButtonEmpty(_ref) {
  var children = _ref.children,
      className = _ref.className,
      iconType = _ref.iconType,
      iconSide = _ref.iconSide,
      type = _ref.type,
      size = _ref.size,
      flush = _ref.flush,
      isDisabled = _ref.isDisabled,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'iconType', 'iconSide', 'type', 'size', 'flush', 'isDisabled']);

  var classes = (0, _classnames2.default)('kuiButtonEmpty', typeToClassNameMap[type], sizeToClassNameMap[size], iconSideToClassNameMap[iconSide], flushTypeToClassNameMap[flush], className);

  // Add an icon to the button if one exists.
  var buttonIcon = void 0;

  if (iconType) {
    buttonIcon = _react2.default.createElement(_icon.KuiIcon, {
      className: 'kuiButtonEmpty__icon',
      type: iconType,
      size: 'medium',
      'aria-hidden': 'true'
    });
  }

  return _react2.default.createElement(
    'button',
    _extends({
      disabled: isDisabled,
      className: classes
    }, rest),
    _react2.default.createElement(
      'span',
      { className: 'kuiButtonEmpty__content' },
      buttonIcon,
      _react2.default.createElement(
        'span',
        null,
        children
      )
    )
  );
};

exports.KuiButtonEmpty = KuiButtonEmpty;
KuiButtonEmpty.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  iconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),
  iconSide: _propTypes2.default.oneOf(ICON_SIDES),
  type: _propTypes2.default.oneOf(TYPES),
  size: _propTypes2.default.oneOf(SIZES),
  flush: _propTypes2.default.oneOf(FLUSH_TYPES),
  isDisabled: _propTypes2.default.bool
};

KuiButtonEmpty.defaultProps = {
  iconSide: 'left',
  type: 'primary'
};
//# sourceMappingURL=button_empty.js.map