'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiTab = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var KuiTab = function KuiTab(_ref) {
  var isSelected = _ref.isSelected,
      onClick = _ref.onClick,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['isSelected', 'onClick', 'children', 'className']);

  var classes = (0, _classnames2.default)('kuiTab', className, {
    'kuiTab-isSelected': isSelected
  });

  return _react2.default.createElement(
    'button',
    _extends({
      className: classes,
      onClick: onClick
    }, rest),
    _react2.default.createElement(
      'span',
      { className: 'kuiTab__content' },
      children
    )
  );
};

exports.KuiTab = KuiTab;
KuiTab.defaultProps = {
  isSelected: false
};

KuiTab.propTypes = {
  isSelected: _propTypes2.default.bool,
  onClick: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};
//# sourceMappingURL=tab.js.map