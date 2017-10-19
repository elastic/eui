'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiSideNavItem = undefined;

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KuiSideNavItem = exports.KuiSideNavItem = function KuiSideNavItem(_ref) {
  var children = _ref.children,
      indent = _ref.indent,
      isSelected = _ref.isSelected;

  var child = _react.Children.only(children);

  var classes = (0, _classnames2.default)(child.props.className, 'kuiSideNavItem', {
    'kuiSideNavItem-isSelected': isSelected,
    'kuiSideNavItem--indent': indent
  });

  return (0, _react.cloneElement)(child, Object.assign({}, child.props, {
    className: classes
  }));
};

KuiSideNavItem.propTypes = {
  isSelected: _propTypes2.default.bool,
  indent: _propTypes2.default.bool
};