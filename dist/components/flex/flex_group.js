'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiFlexGroup = exports.JUSTIFY_CONTENTS = exports.ALIGN_ITEMS = exports.GUTTER_SIZES = undefined;

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
  small: 'kuiFlexGroup--gutterSmall',
  medium: 'kuiFlexGroup--gutterMedium',
  large: 'kuiFlexGroup--gutterLarge',
  extraLarge: 'kuiFlexGroup--gutterExtraLarge'
};

var GUTTER_SIZES = exports.GUTTER_SIZES = Object.keys(gutterSizeToClassNameMap);

var alignItemsToClassNameMap = {
  stretch: '',
  flexStart: 'kuiFlexGroup--alignItemsStart',
  flexEnd: 'kuiFlexGroup--alignItemsEnd',
  center: 'kuiFlexGroup--alignItemsCenter'
};

var ALIGN_ITEMS = exports.ALIGN_ITEMS = Object.keys(alignItemsToClassNameMap);

var justifyContentToClassNameMap = {
  flexStart: '',
  flexEnd: 'kuiFlexGroup--justifyContentFlexEnd',
  center: 'kuiFlexGroup--justifyContentCenter',
  spaceBetween: 'kuiFlexGroup--justifyContentSpaceBetween',
  spaceAround: 'kuiFlexGroup--justifyContentSpaceAround'
};

var JUSTIFY_CONTENTS = exports.JUSTIFY_CONTENTS = Object.keys(justifyContentToClassNameMap);

var KuiFlexGroup = function KuiFlexGroup(_ref) {
  var children = _ref.children,
      className = _ref.className,
      gutterSize = _ref.gutterSize,
      alignItems = _ref.alignItems,
      justifyContent = _ref.justifyContent,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'gutterSize', 'alignItems', 'justifyContent']);

  var classes = (0, _classnames2.default)('kuiFlexGroup', gutterSizeToClassNameMap[gutterSize], alignItemsToClassNameMap[alignItems], justifyContentToClassNameMap[justifyContent], className);

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    children
  );
};

exports.KuiFlexGroup = KuiFlexGroup;
KuiFlexGroup.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  gutterSize: _propTypes2.default.oneOf(GUTTER_SIZES),
  alignItems: _propTypes2.default.oneOf(ALIGN_ITEMS),
  justifyContent: _propTypes2.default.oneOf(JUSTIFY_CONTENTS)
};

KuiFlexGroup.defaultProps = {
  gutterSize: 'large',
  alignItems: 'stretch',
  justifyContent: 'flexStart'
};
//# sourceMappingURL=flex_group.js.map