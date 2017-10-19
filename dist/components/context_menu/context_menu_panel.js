'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiContextMenuPanel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var transitionDirectionAndTypeToClassNameMap = {
  next: {
    in: 'kuiContextMenuPanel-txInLeft',
    out: 'kuiContextMenuPanel-txOutLeft'
  },
  previous: {
    in: 'kuiContextMenuPanel-txInRight',
    out: 'kuiContextMenuPanel-txOutRight'
  }
};

var KuiContextMenuPanel = function KuiContextMenuPanel(_ref) {
  var children = _ref.children,
      className = _ref.className,
      onClose = _ref.onClose,
      title = _ref.title,
      panelRef = _ref.panelRef,
      transitionType = _ref.transitionType,
      transitionDirection = _ref.transitionDirection,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'onClose', 'title', 'panelRef', 'transitionType', 'transitionDirection']);

  var panelTitle = void 0;

  if (title) {
    if (Boolean(onClose)) {
      panelTitle = _react2.default.createElement(
        'button',
        {
          className: 'kuiContextMenuPanelTitle',
          onClick: onClose
        },
        _react2.default.createElement(
          'span',
          { className: 'kuiContextMenu__itemLayout' },
          _react2.default.createElement(_.KuiIcon, {
            type: 'arrowLeft',
            size: 'medium',
            className: 'kuiContextMenu__icon'
          }),
          title
        )
      );
    } else {
      panelTitle = _react2.default.createElement(
        _.KuiPopoverTitle,
        null,
        _react2.default.createElement(
          'span',
          { className: 'kuiContextMenu__itemLayout' },
          title
        )
      );
    }
  }

  var hasTransition = transitionDirection && transitionType;
  var classes = (0, _classnames2.default)('kuiContextMenuPanel', className, hasTransition ? transitionDirectionAndTypeToClassNameMap[transitionDirection][transitionType] : '');

  return _react2.default.createElement(
    'div',
    _extends({
      ref: panelRef,
      className: classes
    }, rest),
    panelTitle,
    children
  );
};

exports.KuiContextMenuPanel = KuiContextMenuPanel;
KuiContextMenuPanel.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  title: _propTypes2.default.string,
  onClose: _propTypes2.default.func,
  panelRef: _propTypes2.default.func,
  transitionType: _propTypes2.default.oneOf(['in', 'out']),
  transitionDirection: _propTypes2.default.oneOf(['next', 'previous'])
};
//# sourceMappingURL=context_menu_panel.js.map