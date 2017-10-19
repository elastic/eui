'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiKeyPadMenuItemButton = exports.KuiKeyPadMenuItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var renderContent = function renderContent(children, label) {
  return _react2.default.createElement(
    'div',
    { className: 'kuiKeyPadMenuItem__inner' },
    _react2.default.createElement(
      'div',
      { className: 'kuiKeyPadMenuItem__icon' },
      children
    ),
    _react2.default.createElement(
      'p',
      { className: 'kuiKeyPadMenuItem__label' },
      label
    )
  );
};

var commonPropTypes = {
  children: _propTypes2.default.node.isRequired,
  label: _propTypes2.default.string.isRequired
};

var KuiKeyPadMenuItem = function KuiKeyPadMenuItem(_ref) {
  var href = _ref.href,
      label = _ref.label,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['href', 'label', 'children', 'className']);

  var classes = (0, _classnames2.default)('kuiKeyPadMenuItem', className);

  return _react2.default.createElement(
    'a',
    _extends({
      href: href,
      className: classes
    }, rest),
    renderContent(children, label)
  );
};

exports.KuiKeyPadMenuItem = KuiKeyPadMenuItem;
KuiKeyPadMenuItem.propTypes = Object.assign({
  href: _propTypes2.default.string
}, commonPropTypes);

var KuiKeyPadMenuItemButton = function KuiKeyPadMenuItemButton(_ref2) {
  var onClick = _ref2.onClick,
      label = _ref2.label,
      children = _ref2.children,
      className = _ref2.className,
      rest = _objectWithoutProperties(_ref2, ['onClick', 'label', 'children', 'className']);

  var classes = (0, _classnames2.default)('kuiKeyPadMenuItem', className);

  return _react2.default.createElement(
    'button',
    _extends({
      onClick: onClick,
      className: classes
    }, rest),
    renderContent(children, label)
  );
};

exports.KuiKeyPadMenuItemButton = KuiKeyPadMenuItemButton;
KuiKeyPadMenuItemButton.propTypes = Object.assign({
  onClick: _propTypes2.default.func
}, commonPropTypes);