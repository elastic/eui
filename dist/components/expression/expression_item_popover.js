'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiExpressionItemPopover = exports.POPOVER_ALIGN = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var POPOVER_ALIGN = ['left', 'right'];

/*
With some modification copy-pasted from
https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
*/
var outsideClickNotifier = function outsideClickNotifier(WrappedComponent) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

      _this.handleClickOutside = _this.handleClickOutside.bind(_this);
      return _this;
    }

    _createClass(_class, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
    }, {
      key: 'handleClickOutside',
      value: function handleClickOutside(event) {
        if (!this.wrapperRef) {
          return;
        }

        if (!this.props.isVisible) {
          return;
        }

        if (this.wrapperRef !== event.target && !this.wrapperRef.contains(event.target)) {
          this.props.onOutsideClick();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            onOutsideClick = _props.onOutsideClick,
            rest = _objectWithoutProperties(_props, ['onOutsideClick']); //eslint-disable-line no-unused-vars


        return _react2.default.createElement(WrappedComponent, _extends({ rootRef: function rootRef(node) {
            return _this2.wrapperRef = node;
          } }, rest));
      }
    }]);

    return _class;
  }(_react2.default.Component), _class.propTypes = {
    onOutsideClick: _propTypes2.default.func.isRequired,
    isVisible: _propTypes2.default.bool.isRequired
  }, _temp;
};

var KuiExpressionItemPopover = function KuiExpressionItemPopover(_ref) {
  var className = _ref.className,
      title = _ref.title,
      isVisible = _ref.isVisible,
      children = _ref.children,
      rootRef = _ref.rootRef,
      _ref$align = _ref.align,
      align = _ref$align === undefined ? 'left' : _ref$align,
      rest = _objectWithoutProperties(_ref, ['className', 'title', 'isVisible', 'children', 'rootRef', 'align']);

  var classes = (0, _classnames2.default)('kuiExpressionItem__popover', className, {
    'kuiExpressionItem__popover--isHidden': !isVisible,
    'kuiExpressionItem__popover--alignRight': align === 'right'
  });
  return _react2.default.createElement(
    'div',
    _extends({
      ref: rootRef,
      className: classes
    }, rest),
    _react2.default.createElement(
      'div',
      { className: 'kuiExpressionItem__popoverTitle' },
      title
    ),
    _react2.default.createElement(
      'div',
      { className: 'kuiExpressionItem__popoverContent' },
      children
    )
  );
};

KuiExpressionItemPopover.propTypes = {
  className: _propTypes2.default.string,
  title: _propTypes2.default.string.isRequired,
  isVisible: _propTypes2.default.bool.isRequired,
  children: _propTypes2.default.node,
  align: _propTypes2.default.oneOf(POPOVER_ALIGN),
  //only for outsideClickNotifier
  rootRef: _propTypes2.default.func.isRequired
};

exports.KuiExpressionItemPopover = KuiExpressionItemPopover = outsideClickNotifier(KuiExpressionItemPopover);

exports.POPOVER_ALIGN = POPOVER_ALIGN;
exports.KuiExpressionItemPopover = KuiExpressionItemPopover;