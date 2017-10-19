'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiButtonIcon = exports.TYPES = undefined;

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
  primary: 'kuiButtonIcon--primary',
  danger: 'kuiButtonIcon--danger',
  disabled: 'kuiButtonIcon--disabled',
  ghost: 'kuiButtonIcon--ghost'
};

var TYPES = exports.TYPES = Object.keys(typeToClassNameMap);

var KuiButtonIcon = function KuiButtonIcon(_ref) {
  var className = _ref.className,
      iconType = _ref.iconType,
      type = _ref.type,
      isDisabled = _ref.isDisabled,
      rest = _objectWithoutProperties(_ref, ['className', 'iconType', 'type', 'isDisabled']);

  var classes = (0, _classnames2.default)('kuiButtonIcon', typeToClassNameMap[type], className);

  // Add an icon to the button if one exists.
  var buttonIcon = void 0;

  if (iconType) {
    buttonIcon = _react2.default.createElement(_icon.KuiIcon, {
      className: 'kuiButtonIcon__icon',
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
    buttonIcon
  );
};

exports.KuiButtonIcon = KuiButtonIcon;
KuiButtonIcon.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  iconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),
  type: _propTypes2.default.oneOf(TYPES),
  isDisabled: _propTypes2.default.bool
};

KuiButtonIcon.defaultProps = {
  type: 'primary'
};
//# sourceMappingURL=button_icon.js.map