'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiRange = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var KuiRange = function KuiRange(_ref) {
  var className = _ref.className,
      id = _ref.id,
      name = _ref.name,
      min = _ref.min,
      max = _ref.max,
      fullWidth = _ref.fullWidth,
      value = _ref.value,
      rest = _objectWithoutProperties(_ref, ['className', 'id', 'name', 'min', 'max', 'fullWidth', 'value']);

  var classes = (0, _classnames2.default)('kuiRange', {
    'kuiRange--fullWidth': fullWidth
  }, className);

  return _react2.default.createElement('input', _extends({
    type: 'range',
    id: id,
    name: name,
    className: classes,
    min: min,
    max: max,
    value: value
  }, rest));
};

exports.KuiRange = KuiRange;
KuiRange.propTypes = {
  name: _propTypes2.default.string,
  id: _propTypes2.default.string,
  min: _propTypes2.default.number.isRequired,
  max: _propTypes2.default.number.isRequired,
  value: _propTypes2.default.string,
  fullWidth: _propTypes2.default.bool
};

KuiRange.defaultProps = {
  min: 1,
  max: 100,
  fullWidth: false
};
//# sourceMappingURL=range.js.map