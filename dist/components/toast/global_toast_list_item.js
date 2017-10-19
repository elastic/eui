'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiGlobalToastListItem = undefined;

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KuiGlobalToastListItem = exports.KuiGlobalToastListItem = function KuiGlobalToastListItem(_ref) {
  var isDismissed = _ref.isDismissed,
      children = _ref.children;

  var classes = (0, _classnames2.default)('kuiGlobalToastListItem', children.props.className, {
    'kuiGlobalToastListItem-isDismissed': isDismissed
  });

  return (0, _react.cloneElement)(children, Object.assign({}, children.props, {
    className: classes
  }));
};

KuiGlobalToastListItem.propTypes = {
  isDismissed: _propTypes2.default.bool,
  children: _propTypes2.default.node
};