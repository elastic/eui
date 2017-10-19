'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiSelect = undefined;

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

var KuiSelect = function KuiSelect(_ref) {
  var className = _ref.className,
      options = _ref.options,
      id = _ref.id,
      name = _ref.name,
      isInvalid = _ref.isInvalid,
      fullWidth = _ref.fullWidth,
      rest = _objectWithoutProperties(_ref, ['className', 'options', 'id', 'name', 'isInvalid', 'fullWidth']);

  var classes = (0, _classnames2.default)('kuiSelect', {
    'kuiSelect--fullWidth': fullWidth
  }, className);

  return _react2.default.createElement(
    _form_control_layout.KuiFormControlLayout,
    {
      icon: 'arrowDown',
      iconSide: 'right',
      fullWidth: fullWidth
    },
    _react2.default.createElement(
      _validatable_control.KuiValidatableControl,
      { isInvalid: isInvalid },
      _react2.default.createElement(
        'select',
        _extends({
          id: id,
          name: name,
          className: classes
        }, rest),
        options.map(function (option, index) {
          return _react2.default.createElement(
            'option',
            { value: option.value, key: index },
            option.text
          );
        })
      )
    )
  );
};

exports.KuiSelect = KuiSelect;
KuiSelect.propTypes = {
  name: _propTypes2.default.string,
  id: _propTypes2.default.string,
  options: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  isInvalid: _propTypes2.default.bool,
  fullWidth: _propTypes2.default.bool
};

KuiSelect.defaultProps = {
  options: [],
  fullWidth: false
};