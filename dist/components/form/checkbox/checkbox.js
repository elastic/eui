'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiCheckbox = exports.TYPES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var typeToClassNameMap = {
  inList: 'kuiCheckbox--inList'
};

var TYPES = exports.TYPES = Object.keys(typeToClassNameMap);

var KuiCheckbox = function KuiCheckbox(_ref) {
  var className = _ref.className,
      id = _ref.id,
      checked = _ref.checked,
      label = _ref.label,
      onChange = _ref.onChange,
      type = _ref.type,
      rest = _objectWithoutProperties(_ref, ['className', 'id', 'checked', 'label', 'onChange', 'type']);

  var classes = (0, _classnames2.default)('kuiCheckbox', typeToClassNameMap[type], className);

  var optionalLabel = void 0;

  if (label) {
    optionalLabel = _react2.default.createElement(
      'label',
      {
        className: 'kuiCheckbox__label',
        htmlFor: id
      },
      label
    );
  }

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement('input', {
      className: 'kuiCheckbox__input',
      type: 'checkbox',
      id: id,
      checked: checked,
      onChange: onChange
    }),
    _react2.default.createElement(
      'div',
      { className: 'kuiCheckbox__square' },
      _react2.default.createElement('div', { className: 'kuiCheckbox__check' })
    ),
    optionalLabel
  );
};

exports.KuiCheckbox = KuiCheckbox;
KuiCheckbox.propTypes = {
  className: _propTypes2.default.string,
  id: _propTypes2.default.string,
  checked: _propTypes2.default.bool.isRequired,
  label: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired,
  type: _propTypes2.default.oneOf(TYPES)
};

KuiCheckbox.defaultProps = {
  checked: false
};