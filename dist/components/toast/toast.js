'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiToast = exports.TYPES = undefined;

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
  info: 'kuiToast--info',
  success: 'kuiToast--success',
  warning: 'kuiToast--warning',
  danger: 'kuiToast--danger'
};

var TYPES = exports.TYPES = Object.keys(typeToClassNameMap);

var KuiToast = function KuiToast(_ref) {
  var title = _ref.title,
      type = _ref.type,
      iconType = _ref.iconType,
      onClose = _ref.onClose,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['title', 'type', 'iconType', 'onClose', 'children', 'className']);

  var classes = (0, _classnames2.default)('kuiToast', typeToClassNameMap[type], className);
  var headerClasses = (0, _classnames2.default)('kuiToastHeader', {
    'kuiToastHeader--withBody': children
  });

  var headerIcon = void 0;

  if (iconType) {
    headerIcon = _react2.default.createElement(_icon.KuiIcon, {
      className: 'kuiToastHeader__icon',
      type: iconType,
      size: 'medium',
      'aria-hidden': 'true'
    });
  }

  var closeButton = void 0;

  if (onClose) {
    closeButton = _react2.default.createElement(
      'button',
      {
        className: 'kuiToast__closeButton',
        'aria-label': 'Dismiss toast',
        onClick: onClose
      },
      _react2.default.createElement(_icon.KuiIcon, {
        type: 'cross',
        size: 'medium',
        'aria-hidden': 'true'
      })
    );
  }

  var optionalBody = void 0;

  if (children) {
    optionalBody = _react2.default.createElement(
      _.KuiText,
      { size: 's' },
      children
    );
  }

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement(
      'div',
      { className: headerClasses },
      headerIcon,
      _react2.default.createElement(
        'span',
        { className: 'kuiToastHeader__title' },
        title
      )
    ),
    closeButton,
    optionalBody
  );
};

exports.KuiToast = KuiToast;
KuiToast.propTypes = {
  title: _propTypes2.default.node,
  iconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),
  type: _propTypes2.default.oneOf(TYPES),
  onClose: _propTypes2.default.func
};
//# sourceMappingURL=toast.js.map