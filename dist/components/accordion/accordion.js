'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiAccordion = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KuiAccordion = exports.KuiAccordion = function (_Component) {
  _inherits(KuiAccordion, _Component);

  function KuiAccordion(props) {
    _classCallCheck(this, KuiAccordion);

    var _this = _possibleConstructorReturn(this, (KuiAccordion.__proto__ || Object.getPrototypeOf(KuiAccordion)).call(this, props));

    _this.state = {
      isOpen: false
    };

    _this.onToggleOpen = _this.onToggleOpen.bind(_this);
    return _this;
  }

  _createClass(KuiAccordion, [{
    key: 'onToggleOpen',
    value: function onToggleOpen() {
      var currentState = this.state.isOpen;
      var height = this.childContent.clientHeight;
      this.setState({
        isOpen: !currentState
      });

      if (!currentState) {
        this.childWrapper.setAttribute('style', 'height: ' + height + 'px');
      } else {
        this.childWrapper.setAttribute('style', 'height: 0px');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          buttonContent = _props.buttonContent,
          className = _props.className,
          buttonClassName = _props.buttonClassName,
          buttonContentClassName = _props.buttonContentClassName,
          extraAction = _props.extraAction,
          rest = _objectWithoutProperties(_props, ['children', 'buttonContent', 'className', 'buttonClassName', 'buttonContentClassName', 'extraAction']);

      var classes = (0, _classnames2.default)('kuiAccordion', {
        'kuiAccordion-isOpen': this.state.isOpen
      }, className);

      var buttonClasses = (0, _classnames2.default)('kuiAccordion__button', buttonClassName);

      var buttonContentClasses = (0, _classnames2.default)('kuiAccordion__buttonContent', buttonContentClassName);

      var icon = _react2.default.createElement(_.KuiIcon, { type: this.state.isOpen ? 'arrowDown' : 'arrowRight', size: 'medium' });

      var optionalAction = null;

      if (extraAction) {
        optionalAction = _react2.default.createElement(
          _.KuiFlexItem,
          { grow: false },
          extraAction
        );
      }

      return _react2.default.createElement(
        'div',
        _extends({
          className: classes
        }, rest),
        _react2.default.createElement(
          _.KuiFlexGroup,
          { gutterSize: 'none', alignItems: 'center' },
          _react2.default.createElement(
            _.KuiFlexItem,
            null,
            _react2.default.createElement(
              _.KuiKeyboardAccessible,
              null,
              _react2.default.createElement(
                'div',
                { onClick: this.onToggleOpen, className: buttonClasses },
                _react2.default.createElement(
                  _.KuiFlexGroup,
                  { gutterSize: 'small', alignItems: 'center' },
                  _react2.default.createElement(
                    _.KuiFlexItem,
                    { grow: false },
                    icon
                  ),
                  _react2.default.createElement(
                    _.KuiFlexItem,
                    { className: buttonContentClasses },
                    buttonContent
                  )
                )
              )
            )
          ),
          optionalAction
        ),
        _react2.default.createElement(
          'div',
          { className: 'kuiAccordion__childWrapper', ref: function ref(node) {
              _this2.childWrapper = node;
            } },
          _react2.default.createElement(
            'div',
            { ref: function ref(node) {
                _this2.childContent = node;
              } },
            children
          )
        )
      );
    }
  }]);

  return KuiAccordion;
}(_react.Component);

KuiAccordion.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};


KuiAccordion.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  buttonContentClassName: _propTypes2.default.string,
  buttonContent: _propTypes2.default.node,
  extraAction: _propTypes2.default.node
};