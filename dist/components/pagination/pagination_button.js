'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiPaginationButton = undefined;

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

var KuiPaginationButton = function KuiPaginationButton(_ref) {
  var children = _ref.children,
      className = _ref.className,
      isActive = _ref.isActive,
      isPlaceholder = _ref.isPlaceholder,
      hideOnMobile = _ref.hideOnMobile,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'isActive', 'isPlaceholder', 'hideOnMobile']);

  var classes = (0, _classnames2.default)('kuiPaginationButton', className, {
    'kuiPaginationButton-isActive': isActive,
    'kuiPaginationButton-isPlaceholder': isPlaceholder,
    'kuiPaginationButton--hideOnMobile': hideOnMobile
  });

  return _react2.default.createElement(
    _.KuiButtonEmpty,
    _extends({
      className: classes,
      size: 'small',
      type: 'text'
    }, rest),
    children
  );
};

exports.KuiPaginationButton = KuiPaginationButton;
KuiPaginationButton.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  isActive: _propTypes2.default.bool,
  isPlaceholder: _propTypes2.default.bool,
  hideOnMobile: _propTypes2.default.bool
};

KuiPaginationButton.defaultProps = {
  children: _react2.default.createElement(
    'span',
    null,
    '\u2026'
  )
};
//# sourceMappingURL=pagination_button.js.map