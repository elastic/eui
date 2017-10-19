'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiHeaderSectionItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var borderToClassNameMap = {
  left: undefined,
  right: 'kuiHeaderSectionItem--borderRight'
};

var BORDERS = Object.keys(borderToClassNameMap);

var KuiHeaderSectionItem = function KuiHeaderSectionItem(_ref) {
  var border = _ref.border,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['border', 'children', 'className']);

  var classes = (0, _classnames2.default)('kuiHeaderSectionItem', borderToClassNameMap[border], className);

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    children
  );
};

exports.KuiHeaderSectionItem = KuiHeaderSectionItem;
KuiHeaderSectionItem.propTypes = {
  border: _propTypes2.default.oneOf(BORDERS)
};

KuiHeaderSectionItem.defaultProps = {
  border: 'left'
};
//# sourceMappingURL=header_section_item.js.map