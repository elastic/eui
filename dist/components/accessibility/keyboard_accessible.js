'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiKeyboardAccessible = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _services = require('../../services');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Interactive elements must be able to receive focus.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Ideally, this means using elements that are natively keyboard accessible (<a href="">,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * <input type="button">, or <button>). Note that links should be used when navigating and buttons
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * should be used when performing an action on the page.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * If, however, you need to use elements that aren't natively keyboard accessible (for example, <div>,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * <p>, or <a> without the href attribute), then you need to allow them to receive focus and to
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * respond to keyboard input. The workaround is to:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   - Give the element tabindex="0" so that it can receive keyboard focus.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   - Add a JavaScript onkeyup event handler that triggers element functionality if the Enter key
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     is pressed while the element is focused. This is necessary because some browsers do not trigger
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    onclick events for such elements when activated via the keyboard.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   - If the item is meant to function as a button, the onkeyup event handler should also detect the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     Spacebar in addition to the Enter key, and the element should be given role="button".
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Wrap any such elements that aren't natively keyboard accessible in this component to automatically
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * apply the above workaround to them.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var KuiKeyboardAccessible = exports.KuiKeyboardAccessible = function (_Component) {
  _inherits(KuiKeyboardAccessible, _Component);

  function KuiKeyboardAccessible() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, KuiKeyboardAccessible);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = KuiKeyboardAccessible.__proto__ || Object.getPrototypeOf(KuiKeyboardAccessible)).call.apply(_ref, [this].concat(args))), _this), _this.onKeyDown = function (e) {
      // Prevent a scroll from occurring if the user has hit space.
      if (e.keyCode === _services.keyCodes.SPACE) {
        e.preventDefault();
      }
    }, _this.onKeyUp = function (e) {
      // Support keyboard accessibility by emulating mouse click on ENTER or SPACE keypress.
      if (e.keyCode === _services.keyCodes.ENTER || e.keyCode === _services.keyCodes.SPACE) {
        // Delegate to the click handler on the element.
        _this.props.children.props.onClick(e);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(KuiKeyboardAccessible, [{
    key: 'applyKeyboardAccessibility',
    value: function applyKeyboardAccessibility(child) {
      // Add attributes required for accessibility unless they are already specified.
      var props = _extends({
        tabIndex: '0',
        role: 'button'
      }, child.props, {
        onKeyDown: this.onKeyDown,
        onKeyUp: this.onKeyUp
      });

      return (0, _react.cloneElement)(child, props);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.applyKeyboardAccessibility(this.props.children);
    }
  }]);

  return KuiKeyboardAccessible;
}(_react.Component);

var keyboardInaccessibleElement = function keyboardInaccessibleElement(props, propName, componentName) {
  var child = props.children;

  if (!child) {
    throw new Error(componentName + ' needs to wrap an element with which the user interacts.');
  }

  // The whole point of this component is to hack in functionality that native buttons provide
  // by default.
  if (child.type === 'button') {
    throw new Error(componentName + ' doesn\'t need to be used on a button.');
  }

  if (child.type === 'a' && child.props.href !== undefined) {
    throw new Error(componentName + ' doesn\'t need to be used on a link if it has a href attribute.');
  }

  // We're emulating a click action, so we should already have a regular click handler defined.
  if (!child.props.onClick) {
    throw new Error(componentName + ' needs to wrap an element which has an onClick prop assigned.');
  }

  if (typeof child.props.onClick !== 'function') {
    throw new Error(componentName + '\'s child\'s onClick prop needs to be a function.');
  }

  if (child.props.onKeyDown) {
    throw new Error(componentName + '\'s child can\'t have an onKeyDown prop because the implementation will override it.');
  }

  if (child.props.onKeyUp) {
    throw new Error(componentName + '\'s child can\'t have an onKeyUp prop because the implementation will override it.');
  }
};

KuiKeyboardAccessible.propTypes = {
  children: keyboardInaccessibleElement
};