'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiFormControlLayout = exports.ICON_SIDES = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require('../..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconSideToClassNameMap = {
  left: '',
  right: 'kuiFormControlLayout__icon--right'
};

var ICON_SIDES = exports.ICON_SIDES = Object.keys(iconSideToClassNameMap);

var KuiFormControlLayout = exports.KuiFormControlLayout = function KuiFormControlLayout(_ref) {
  var children = _ref.children,
      icon = _ref.icon,
      fullWidth = _ref.fullWidth,
      iconSide = _ref.iconSide,
      className = _ref.className;


  var classes = (0, _classnames2.default)('kuiFormControlLayout', {
    'kuiFormControlLayout--fullWidth': fullWidth
  }, className);

  if (icon) {
    var iconClasses = (0, _classnames2.default)('kuiFormControlLayout__icon', iconSideToClassNameMap[iconSide]);

    var optionalIcon = _react2.default.createElement(_.KuiIcon, {
      className: iconClasses,
      type: icon,
      size: 'medium'
    });

    return _react2.default.createElement(
      'div',
      { className: classes },
      children,
      optionalIcon
    );
  }

  return children;
};

KuiFormControlLayout.propTypes = {
  children: _propTypes2.default.node,
  icon: _propTypes2.default.string,
  iconSide: _propTypes2.default.oneOf(ICON_SIDES)
};

KuiFormControlLayout.defaultProps = {
  iconSide: 'left'
};
//# sourceMappingURL=form_control_layout.js.map