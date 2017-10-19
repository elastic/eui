'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiFlexGrid = exports.COLUMNS = exports.GUTTER_SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var gutterSizeToClassNameMap = {
  none: '',
  small: 'kuiFlexGrid--gutterSmall',
  medium: 'kuiFlexGrid--gutterMedium',
  large: 'kuiFlexGrid--gutterLarge',
  extraLarge: 'kuiFlexGrid--gutterXLarge'
};

var GUTTER_SIZES = exports.GUTTER_SIZES = Object.keys(gutterSizeToClassNameMap);

var columnsToClassNameMap = {
  0: 'kuiFlexGrid--wrap',
  2: 'kuiFlexGrid--halves',
  3: 'kuiFlexGrid--thirds',
  4: 'kuiFlexGrid--fourths'
};

var COLUMNS = exports.COLUMNS = Object.keys(columnsToClassNameMap).map(function (columns) {
  return parseInt(columns, 10);
});

var KuiFlexGrid = function KuiFlexGrid(_ref) {
  var children = _ref.children,
      className = _ref.className,
      gutterSize = _ref.gutterSize,
      columns = _ref.columns,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'gutterSize', 'columns']);

  var classes = (0, _classnames2.default)('kuiFlexGrid', gutterSizeToClassNameMap[gutterSize], columnsToClassNameMap[columns], className);

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    children
  );
};

exports.KuiFlexGrid = KuiFlexGrid;
KuiFlexGrid.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  gutterSize: _propTypes2.default.oneOf(GUTTER_SIZES),
  columns: _propTypes2.default.oneOf(COLUMNS).isRequired
};

KuiFlexGrid.defaultProps = {
  gutterSize: 'large',
  columns: 0
};