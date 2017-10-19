'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiTableRowCellCheckbox = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var KuiTableRowCellCheckbox = function KuiTableRowCellCheckbox(_ref) {
  var children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['children', 'className']);

  var classes = (0, _classnames2.default)('kuiTableRowCellCheckbox', className);

  return _react2.default.createElement(
    'td',
    _extends({ className: classes }, rest),
    _react2.default.createElement(
      'div',
      { className: 'kuiTableCellContent' },
      children
    )
  );
};

exports.KuiTableRowCellCheckbox = KuiTableRowCellCheckbox;
KuiTableRowCellCheckbox.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};
//# sourceMappingURL=table_row_cell_checkbox.js.map