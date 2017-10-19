'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiTableHeaderCell = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require('..');

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ALIGNMENT = [_services.LEFT_ALIGNMENT, _services.RIGHT_ALIGNMENT];

var KuiTableHeaderCell = function KuiTableHeaderCell(_ref) {
  var children = _ref.children,
      align = _ref.align,
      onSort = _ref.onSort,
      isSorted = _ref.isSorted,
      isSortAscending = _ref.isSortAscending,
      className = _ref.className,
      ariaLabel = _ref.ariaLabel,
      rest = _objectWithoutProperties(_ref, ['children', 'align', 'onSort', 'isSorted', 'isSortAscending', 'className', 'ariaLabel']);

  var classes = (0, _classnames2.default)('kuiTableHeaderCell', className);

  var contentClasses = (0, _classnames2.default)('kuiTableCellContent', className, {
    'kuiTableCellContent--alignRight': align === _services.RIGHT_ALIGNMENT
  });

  if (onSort) {
    var sortIcon = _react2.default.createElement(_.KuiIcon, {
      className: 'kuiTableSortIcon',
      type: isSortAscending ? 'sortUp' : 'sortDown',
      size: 'medium'
    });

    var buttonClasses = (0, _classnames2.default)('kuiTableHeaderButton', {
      'kuiTableHeaderButton-isSorted': isSorted
    });

    var columnTitle = ariaLabel ? ariaLabel : children;
    var statefulAriaLabel = 'Sort ' + columnTitle + ' ' + (isSortAscending ? 'descending' : 'ascending');

    return _react2.default.createElement(
      'th',
      _extends({
        className: classes
      }, rest),
      _react2.default.createElement(
        'button',
        {
          className: buttonClasses,
          onClick: onSort,
          'aria-label': statefulAriaLabel
        },
        _react2.default.createElement(
          'span',
          { className: contentClasses },
          children,
          sortIcon
        )
      )
    );
  }

  return _react2.default.createElement(
    'th',
    _extends({
      className: classes,
      'aria-label': ariaLabel
    }, rest),
    _react2.default.createElement(
      'div',
      { className: contentClasses },
      children
    )
  );
};

exports.KuiTableHeaderCell = KuiTableHeaderCell;
KuiTableHeaderCell.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  align: _propTypes2.default.oneOf(ALIGNMENT),
  onSort: _propTypes2.default.func,
  isSorted: _propTypes2.default.bool,
  isSortAscending: _propTypes2.default.bool
};

KuiTableHeaderCell.defaultProps = {
  align: _services.LEFT_ALIGNMENT
};
//# sourceMappingURL=table_header_cell.js.map