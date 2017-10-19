'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiGlobalToastList = undefined;

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

var KuiGlobalToastList = exports.KuiGlobalToastList = function (_Component) {
  _inherits(KuiGlobalToastList, _Component);

  function KuiGlobalToastList(props) {
    _classCallCheck(this, KuiGlobalToastList);

    var _this = _possibleConstructorReturn(this, (KuiGlobalToastList.__proto__ || Object.getPrototypeOf(KuiGlobalToastList)).call(this, props));

    _this.isScrollingToBottom = false;
    _this.isScrolledToBottom = true;
    _this.onScroll = _this.onScroll.bind(_this);
    _this.onMouseEnter = _this.onMouseEnter.bind(_this);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this);
    return _this;
  }

  _createClass(KuiGlobalToastList, [{
    key: 'startScrollingToBottom',
    value: function startScrollingToBottom() {
      var _this2 = this;

      this.isScrollingToBottom = true;

      var scrollToBottom = function scrollToBottom() {
        var position = _this2.listElement.scrollTop;
        var destination = _this2.listElement.scrollHeight - _this2.listElement.clientHeight;
        var distanceToDestination = destination - position;

        if (distanceToDestination < 5) {
          _this2.listElement.scrollTop = destination;
          _this2.isScrollingToBottom = false;
          _this2.isScrolledToBottom = true;
          return;
        }

        _this2.listElement.scrollTop = position + distanceToDestination * 0.25;

        if (_this2.isScrollingToBottom) {
          window.requestAnimationFrame(scrollToBottom);
        }
      };

      window.requestAnimationFrame(scrollToBottom);
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter() {
      // Stop scrolling to bottom if we're in mid-scroll, because the user wants to interact with
      // the list.
      this.isScrollingToBottom = false;
      this.isUserInteracting = true;
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      this.isUserInteracting = false;
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
      this.isScrolledToBottom = this.listElement.scrollHeight - this.listElement.scrollTop === this.listElement.clientHeight;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.listElement.addEventListener('scroll', this.onScroll);
      this.listElement.addEventListener('mouseenter', this.onMouseEnter);
      this.listElement.addEventListener('mouseleave', this.onMouseLeave);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!this.isUserInteracting) {
        // If the user has scrolled up the toast list then we don't want to annoy them by scrolling
        // all the way back to the bottom.
        if (this.isScrolledToBottom) {
          if (prevProps.children.length < this.props.children.length) {
            this.startScrollingToBottom();
          }
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.listElement.removeEventListener('scroll', this.onScroll);
      this.listElement.removeEventListener('mouseenter', this.onMouseEnter);
      this.listElement.removeEventListener('mouseleave', this.onMouseLeave);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          rest = _objectWithoutProperties(_props, ['children', 'className']);

      var classes = (0, _classnames2.default)('kuiGlobalToastList', className);

      return _react2.default.createElement(
        'div',
        _extends({
          ref: function ref(element) {
            _this3.listElement = element;
          },
          className: classes
        }, rest),
        children
      );
    }
  }]);

  return KuiGlobalToastList;
}(_react.Component);

KuiGlobalToastList.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};