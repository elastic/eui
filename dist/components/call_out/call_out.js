'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiCallOut = exports.TYPES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var typeToClassNameMap = {
  info: 'kuiCallOut--info',
  success: 'kuiCallOut--success',
  warning: 'kuiCallOut--warning',
  danger: 'kuiCallOut--danger'
};

var TYPES = exports.TYPES = Object.keys(typeToClassNameMap);

var KuiCallOut = function KuiCallOut(_ref) {
  var title = _ref.title,
      type = _ref.type,
      iconType = _ref.iconType,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['title', 'type', 'iconType', 'children', 'className']);

  var classes = (0, _classnames2.default)('kuiCallOut', typeToClassNameMap[type], className);

  var headerIcon = void 0;

  if (iconType) {
    headerIcon = _react2.default.createElement(_icon.KuiIcon, {
      className: 'kuiCallOutHeader__icon',
      type: iconType,
      size: 'medium',
      'aria-hidden': 'true'
    });
  }

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement(
      'div',
      { className: 'kuiCallOutHeader' },
      headerIcon,
      _react2.default.createElement(
        'span',
        { className: 'kuiCallOutHeader__title' },
        title
      )
    ),
    _react2.default.createElement(
      _.KuiText,
      { size: 's' },
      children
    )
  );
};

exports.KuiCallOut = KuiCallOut;
KuiCallOut.propTypes = {
  title: _propTypes2.default.node,
  iconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),
  type: _propTypes2.default.oneOf(TYPES)
};

KuiCallOut.defaultProps = {
  type: 'info'
};
//# sourceMappingURL=call_out.js.map