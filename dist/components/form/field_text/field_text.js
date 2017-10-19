'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiFieldText = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _form_control_layout = require('../form_control_layout');

var _validatable_control = require('../validatable_control');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var KuiFieldText = function KuiFieldText(_ref) {
  var id = _ref.id,
      name = _ref.name,
      placeholder = _ref.placeholder,
      value = _ref.value,
      className = _ref.className,
      icon = _ref.icon,
      isInvalid = _ref.isInvalid,
      inputRef = _ref.inputRef,
      fullWidth = _ref.fullWidth,
      rest = _objectWithoutProperties(_ref, ['id', 'name', 'placeholder', 'value', 'className', 'icon', 'isInvalid', 'inputRef', 'fullWidth']);

  var classes = (0, _classnames2.default)('kuiFieldText', className, {
    'kuiFieldText--withIcon': icon,
    'kuiFieldText--fullWidth': fullWidth
  });

  return _react2.default.createElement(
    _form_control_layout.KuiFormControlLayout,
    {
      icon: icon,
      fullWidth: fullWidth
    },
    _react2.default.createElement(
      _validatable_control.KuiValidatableControl,
      {
        isInvalid: isInvalid
      },
      _react2.default.createElement('input', _extends({
        type: 'text',
        id: id,
        name: name,
        placeholder: placeholder,
        className: classes,
        value: value,
        ref: inputRef
      }, rest))
    )
  );
};

exports.KuiFieldText = KuiFieldText;
KuiFieldText.propTypes = {
  name: _propTypes2.default.string,
  id: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  value: _propTypes2.default.string,
  icon: _propTypes2.default.string,
  isInvalid: _propTypes2.default.bool,
  inputRef: _propTypes2.default.func,
  fullWidth: _propTypes2.default.bool
};

KuiFieldText.defaultProps = {
  value: undefined,
  fullWidth: false
};