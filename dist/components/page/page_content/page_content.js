'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiPageContent = exports.HORIZONTAL_POSITIONS = exports.VERTICAL_POSITIONS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _panel = require('../../panel/panel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var verticalPositionToClassNameMap = {
  center: 'kuiPageContent--verticalCenter'
};

var horizontalPositionToClassNameMap = {
  center: 'kuiPageContent--horizontalCenter'
};

var VERTICAL_POSITIONS = exports.VERTICAL_POSITIONS = Object.keys(verticalPositionToClassNameMap);
var HORIZONTAL_POSITIONS = exports.HORIZONTAL_POSITIONS = Object.keys(horizontalPositionToClassNameMap);

var KuiPageContent = function KuiPageContent(_ref) {
  var verticalPosition = _ref.verticalPosition,
      horizontalPosition = _ref.horizontalPosition,
      panelPaddingSize = _ref.panelPaddingSize,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['verticalPosition', 'horizontalPosition', 'panelPaddingSize', 'children', 'className']);

  var classes = (0, _classnames2.default)('kuiPageContent', className, verticalPositionToClassNameMap[verticalPosition], horizontalPositionToClassNameMap[horizontalPosition]);

  return _react2.default.createElement(
    _panel.KuiPanel,
    _extends({
      className: classes,
      paddingSize: panelPaddingSize
    }, rest),
    children
  );
};

exports.KuiPageContent = KuiPageContent;
KuiPageContent.propTypes = {
  panelPaddingSize: _propTypes2.default.oneOf(_panel.SIZES),
  verticalPosition: _propTypes2.default.oneOf(VERTICAL_POSITIONS),
  horizontalPosition: _propTypes2.default.oneOf(HORIZONTAL_POSITIONS)
};

KuiPageContent.defaultProps = {
  panelPaddingSize: 'l'
};
//# sourceMappingURL=page_content.js.map