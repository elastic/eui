'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiFormRow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _form_help_text = require('../form_help_text');

var _form_error_text = require('../form_error_text');

var _form_label = require('../form_label');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KuiFormRow = exports.KuiFormRow = function (_Component) {
  _inherits(KuiFormRow, _Component);

  function KuiFormRow(props) {
    _classCallCheck(this, KuiFormRow);

    var _this = _possibleConstructorReturn(this, (KuiFormRow.__proto__ || Object.getPrototypeOf(KuiFormRow)).call(this, props));

    _this.state = {
      isFocused: false
    };

    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    return _this;
  }

  _createClass(KuiFormRow, [{
    key: 'onFocus',
    value: function onFocus() {
      this.setState({
        isFocused: true
      });
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      this.setState({
        isFocused: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          helpText = _props.helpText,
          isInvalid = _props.isInvalid,
          error = _props.error,
          label = _props.label,
          id = _props.id,
          hasEmptyLabelSpace = _props.hasEmptyLabelSpace,
          fullWidth = _props.fullWidth,
          className = _props.className,
          rest = _objectWithoutProperties(_props, ['children', 'helpText', 'isInvalid', 'error', 'label', 'id', 'hasEmptyLabelSpace', 'fullWidth', 'className']);

      var classes = (0, _classnames2.default)('kuiFormRow', {
        'kuiFormRow--hasEmptyLabelSpace': hasEmptyLabelSpace,
        'kuiFormRow--fullWidth': fullWidth
      }, className);

      var optionalHelpText = void 0;

      if (helpText) {
        optionalHelpText = _react2.default.createElement(
          _form_help_text.KuiFormHelpText,
          { className: 'kuiFormRow__text' },
          helpText
        );
      }

      var optionalErrors = void 0;

      if (error) {
        var errorTexts = Array.isArray(error) ? error : [error];
        optionalErrors = errorTexts.map(function (error) {
          return _react2.default.createElement(
            _form_error_text.KuiFormErrorText,
            { key: error, className: 'kuiFormRow__text' },
            error
          );
        });
      }

      var optionalLabel = void 0;

      if (label) {
        optionalLabel = _react2.default.createElement(
          _form_label.KuiFormLabel,
          {
            isFocused: this.state.isFocused,
            isInvalid: isInvalid,
            htmlFor: id
          },
          label
        );
      }

      var field = (0, _react.cloneElement)(children, {
        id: id,
        onFocus: this.onFocus,
        onBlur: this.onBlur
      });

      return _react2.default.createElement(
        'div',
        _extends({
          className: classes
        }, rest),
        optionalLabel,
        field,
        optionalErrors,
        optionalHelpText
      );
    }
  }]);

  return KuiFormRow;
}(_react.Component);

KuiFormRow.propTypes = {
  children: _propTypes2.default.node.isRequired,
  className: _propTypes2.default.string,
  label: _propTypes2.default.string,
  id: _propTypes2.default.string,
  isInvalid: _propTypes2.default.bool,
  error: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  helpText: _propTypes2.default.node,
  hasEmptyLabelSpace: _propTypes2.default.bool,
  fullWidth: _propTypes2.default.bool
};

KuiFormRow.defaultProps = {
  hasEmptyLabelSpace: false,
  fullWidth: false
};
//# sourceMappingURL=form_row.js.map