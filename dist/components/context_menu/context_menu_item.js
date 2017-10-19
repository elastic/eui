'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiContextMenuItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var KuiContextMenuItem = function KuiContextMenuItem(_ref) {
  var children = _ref.children,
      className = _ref.className,
      hasPanel = _ref.hasPanel,
      icon = _ref.icon,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'hasPanel', 'icon']);

  var iconInstance = void 0;

  if (icon) {
    switch (typeof icon === 'undefined' ? 'undefined' : _typeof(icon)) {
      case 'string':
        iconInstance = _react2.default.createElement(_.KuiIcon, {
          type: icon,
          size: 'medium',
          className: 'kuiContextMenu__icon'
        });
        break;

      default:
        // Assume it's already an instance of an icon.
        iconInstance = (0, _react.cloneElement)(icon, {
          className: 'kuiContextMenu__icon'
        });
    }
  }

  var arrow = void 0;

  if (hasPanel) {
    arrow = _react2.default.createElement(_.KuiIcon, {
      type: 'arrowRight',
      size: 'medium',
      className: 'kuiContextMenu__arrow'
    });
  }

  var classes = (0, _classnames2.default)('kuiContextMenuItem', className);

  return _react2.default.createElement(
    'button',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement(
      'span',
      { className: 'kuiContextMenu__itemLayout' },
      iconInstance,
      _react2.default.createElement(
        'span',
        { className: 'kuiContextMenuItem__text' },
        children
      ),
      arrow
    )
  );
};

exports.KuiContextMenuItem = KuiContextMenuItem;
KuiContextMenuItem.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  icon: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string]),
  onClick: _propTypes2.default.func,
  hasPanel: _propTypes2.default.bool
};
//# sourceMappingURL=context_menu_item.js.map