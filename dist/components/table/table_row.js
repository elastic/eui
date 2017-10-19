'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiTableRow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var KuiTableRow = function KuiTableRow(_ref) {
  var children = _ref.children,
      className = _ref.className,
      isSelected = _ref.isSelected,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'isSelected']);

  var classes = (0, _classnames2.default)('kuiTableRow', className, {
    'kuiTableRow-isSelected': isSelected
  });

  return _react2.default.createElement(
    'tr',
    _extends({
      className: classes
    }, rest),
    children
  );
};

exports.KuiTableRow = KuiTableRow;
KuiTableRow.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  isSelected: _propTypes2.default.bool
};
//# sourceMappingURL=table_row.js.map