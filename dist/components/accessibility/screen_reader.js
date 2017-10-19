'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiScreenReaderOnly = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KuiScreenReaderOnly = exports.KuiScreenReaderOnly = function KuiScreenReaderOnly(_ref) {
  var children = _ref.children;

  var classes = (0, _classnames2.default)('kuiScreenReaderOnly', children.props.className);

  var props = Object.assign({}, children.props, {
    className: classes
  });

  return (0, _react.cloneElement)(children, props);
};

KuiScreenReaderOnly.propTypes = {
  children: _propTypes2.default.node
};
//# sourceMappingURL=screen_reader.js.map