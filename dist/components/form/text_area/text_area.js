'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiTextArea = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _validatable_control = require('../validatable_control');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var KuiTextArea = function KuiTextArea(_ref) {
  var children = _ref.children,
      rows = _ref.rows,
      name = _ref.name,
      id = _ref.id,
      placeholder = _ref.placeholder,
      className = _ref.className,
      isInvalid = _ref.isInvalid,
      fullWidth = _ref.fullWidth,
      rest = _objectWithoutProperties(_ref, ['children', 'rows', 'name', 'id', 'placeholder', 'className', 'isInvalid', 'fullWidth']);

  var classes = (0, _classnames2.default)('kuiTextArea', {
    'kuiTextArea--fullWidth': fullWidth
  }, className);

  return _react2.default.createElement(
    _validatable_control.KuiValidatableControl,
    { isInvalid: isInvalid },
    _react2.default.createElement(
      'textarea',
      _extends({
        className: classes
      }, rest, {
        rows: rows,
        name: name,
        id: id,
        placeholder: placeholder
      }),
      children
    )
  );
};

exports.KuiTextArea = KuiTextArea;
KuiTextArea.propTypes = {
  name: _propTypes2.default.string,
  id: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  rows: _propTypes2.default.number,
  isInvalid: _propTypes2.default.bool,
  fullWidth: _propTypes2.default.bool
};

KuiTextArea.defaultProps = {
  rows: 6,
  fullWidth: false
};