'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiPopover = exports.ANCHOR_POSITIONS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _focusTrapReact = require('focus-trap-react');

var _focusTrapReact2 = _interopRequireDefault(_focusTrapReact);

var _services = require('../../services');

var _outside_click_detector = require('../outside_click_detector');

var _panel = require('../panel/panel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var anchorPositionToClassNameMap = {
  'upCenter': 'kuiPopover--anchorUpCenter',
  'upLeft': 'kuiPopover--anchorUpLeft',
  'upRight': 'kuiPopover--anchorUpRight',
  'downCenter': 'kuiPopover--anchorDownCenter',
  'downLeft': 'kuiPopover--anchorDownLeft',
  'downRight': 'kuiPopover--anchorDownRight',
  'leftCenter': 'kuiPopover--anchorLeftCenter',
  'leftUp': 'kuiPopover--anchorLeftUp',
  'leftDown': 'kuiPopover--anchorLeftDown',
  'rightCenter': 'kuiPopover--anchorRightCenter',
  'rightUp': 'kuiPopover--anchorRightUp',
  'rightDown': 'kuiPopover--anchorRightDown'
};

var ANCHOR_POSITIONS = exports.ANCHOR_POSITIONS = Object.keys(anchorPositionToClassNameMap);

var KuiPopover = exports.KuiPopover = function (_Component) {
  _inherits(KuiPopover, _Component);

  function KuiPopover(props) {
    _classCallCheck(this, KuiPopover);

    var _this = _possibleConstructorReturn(this, (KuiPopover.__proto__ || Object.getPrototypeOf(KuiPopover)).call(this, props));

    _this.onKeyDown = function (e) {
      if (e.keyCode === _services.cascadingMenuKeyCodes.ESCAPE) {
        _this.props.closePopover();
      }
    };

    _this.closingTransitionTimeout = undefined;

    _this.state = {
      isClosing: false,
      isOpening: false
    };
    return _this;
  }

  _createClass(KuiPopover, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      // The popover is being opened.
      if (!this.props.isOpen && nextProps.isOpen) {
        clearTimeout(this.closingTransitionTimeout);
        // We need to set this state a beat after the render takes place, so that the CSS
        // transition can take effect.
        window.requestAnimationFrame(function () {
          _this2.setState({
            isOpening: true
          });
        });
      }

      // The popover is being closed.
      if (this.props.isOpen && !nextProps.isOpen) {
        // If the user has just closed the popover, queue up the removal of the content after the
        // transition is complete.
        this.setState({
          isClosing: true,
          isOpening: false
        });

        this.closingTransitionTimeout = setTimeout(function () {
          _this2.setState({
            isClosing: false
          });
        }, 250);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.closingTransitionTimeout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          anchorPosition = _props.anchorPosition,
          button = _props.button,
          isOpen = _props.isOpen,
          withTitle = _props.withTitle,
          children = _props.children,
          className = _props.className,
          closePopover = _props.closePopover,
          panelClassName = _props.panelClassName,
          panelPaddingSize = _props.panelPaddingSize,
          rest = _objectWithoutProperties(_props, ['anchorPosition', 'button', 'isOpen', 'withTitle', 'children', 'className', 'closePopover', 'panelClassName', 'panelPaddingSize']);

      var classes = (0, _classnames2.default)('kuiPopover', anchorPositionToClassNameMap[anchorPosition], className, {
        'kuiPopover-isOpen': this.state.isOpening,
        'kuiPopover--withTitle': withTitle
      });

      var panelClasses = (0, _classnames2.default)('kuiPopover__panel', panelClassName);

      var panel = void 0;

      if (isOpen || this.state.isClosing) {
        panel = _react2.default.createElement(
          _focusTrapReact2.default,
          {
            focusTrapOptions: {
              clickOutsideDeactivates: true,
              fallbackFocus: function fallbackFocus() {
                return _this3.panel;
              }
            }
          },
          _react2.default.createElement(
            _panel.KuiPanel,
            {
              panelRef: function panelRef(node) {
                _this3.panel = node;
              },
              className: panelClasses,
              paddingSize: panelPaddingSize,
              hasShadow: true
            },
            children
          )
        );
      }

      return _react2.default.createElement(
        _outside_click_detector.KuiOutsideClickDetector,
        { onOutsideClick: closePopover },
        _react2.default.createElement(
          'div',
          _extends({
            className: classes,
            onKeyDown: this.onKeyDown
          }, rest),
          button,
          panel
        )
      );
    }
  }]);

  return KuiPopover;
}(_react.Component);

KuiPopover.propTypes = {
  isOpen: _propTypes2.default.bool,
  withTitle: _propTypes2.default.bool,
  closePopover: _propTypes2.default.func.isRequired,
  button: _propTypes2.default.node.isRequired,
  children: _propTypes2.default.node,
  anchorPosition: _propTypes2.default.oneOf(ANCHOR_POSITIONS),
  panelClassName: _propTypes2.default.string,
  panelPaddingSize: _propTypes2.default.oneOf(_panel.SIZES)
};

KuiPopover.defaultProps = {
  isOpen: false,
  anchorPosition: 'downCenter',
  panelPaddingSize: 'm'
};