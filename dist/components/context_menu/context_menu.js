'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiContextMenu = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tabbable = require('tabbable');

var _tabbable2 = _interopRequireDefault(_tabbable);

var _services = require('../../services');

var _context_menu_panel = require('./context_menu_panel');

var _context_menu_item = require('./context_menu_item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KuiContextMenu = exports.KuiContextMenu = function (_Component) {
  _inherits(KuiContextMenu, _Component);

  function KuiContextMenu(props) {
    _classCallCheck(this, KuiContextMenu);

    var _this = _possibleConstructorReturn(this, (KuiContextMenu.__proto__ || Object.getPrototypeOf(KuiContextMenu)).call(this, props));

    _this.onKeyDown = function (e) {
      switch (e.keyCode) {
        case _services.cascadingMenuKeyCodes.UP:
          if (_this.menuItems.length) {
            e.preventDefault();
            _this.setState(function (prevState) {
              var nextFocusedMenuItemIndex = prevState.focusedMenuItemIndex - 1;
              return {
                focusedMenuItemIndex: nextFocusedMenuItemIndex < 0 ? _this.menuItems.length - 1 : nextFocusedMenuItemIndex
              };
            });
          }
          break;

        case _services.cascadingMenuKeyCodes.DOWN:
          if (_this.menuItems.length) {
            e.preventDefault();
            _this.setState(function (prevState) {
              var nextFocusedMenuItemIndex = prevState.focusedMenuItemIndex + 1;
              return {
                focusedMenuItemIndex: nextFocusedMenuItemIndex > _this.menuItems.length - 1 ? 0 : nextFocusedMenuItemIndex
              };
            });
          }
          break;

        case _services.cascadingMenuKeyCodes.LEFT:
          e.preventDefault();
          _this.showPreviousPanel();
          break;

        case _services.cascadingMenuKeyCodes.RIGHT:
          if (_this.menuItems.length) {
            e.preventDefault();
            _this.menuItems[_this.state.focusedMenuItemIndex].click();
          }
          break;

        default:
          break;
      }
    };

    _this.hasPreviousPanel = function (panelId) {
      var previousPanelId = _this.props.idToPreviousPanelIdMap[panelId];
      return typeof previousPanelId === 'number';
    };

    _this.showPreviousPanel = function () {
      // If there's a previous panel, then we can close the current panel to go back to it.
      if (_this.hasPreviousPanel(_this.state.currentPanelId)) {
        var previousPanelId = _this.props.idToPreviousPanelIdMap[_this.state.currentPanelId];
        _this.showPanel(previousPanelId, 'previous');
      }
    };

    _this.resetTransitionTimeout = undefined;
    _this.menuItems = [];

    _this.state = {
      outGoingPanelId: undefined,
      currentPanelId: props.initialPanelId,
      transitionDirection: undefined,
      isTransitioning: false,
      focusedMenuItemIndex: 0
    };
    return _this;
  }

  _createClass(KuiContextMenu, [{
    key: 'showPanel',
    value: function showPanel(panelId, direction) {
      var _this2 = this;

      clearTimeout(this.resetTransitionTimeout);

      this.setState({
        outGoingPanelId: this.state.currentPanelId,
        currentPanelId: panelId,
        transitionDirection: direction,
        isTransitioning: true
      });

      // Queue the transition to reset.
      this.resetTransitionTimeout = setTimeout(function () {
        _this2.setState({
          transitionDirection: undefined,
          isTransitioning: false,
          focusedMenuItemIndex: 0
        });
      }, 250);
    }
  }, {
    key: 'updateHeight',
    value: function updateHeight() {
      var height = this.currentPanel.clientHeight;
      this.menu.setAttribute('style', 'height: ' + height + 'px');
    }
  }, {
    key: 'updateFocusedMenuItem',
    value: function updateFocusedMenuItem() {
      // When the transition completes focus on a menu item or just the menu itself.
      if (!this.state.isTransitioning) {
        this.menuItems = this.currentPanel.querySelectorAll('[data-menu-item]');
        var focusedMenuItem = this.menuItems[this.state.focusedMenuItemIndex];
        if (focusedMenuItem) {
          focusedMenuItem.focus();
        } else {
          // Focus first tabbable item.
          var tabbableItems = (0, _tabbable2.default)(this.currentPanel);
          if (tabbableItems.length) {
            tabbableItems[0].focus();
          } else {
            document.activeElement.blur();
          }
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // If the user is opening the context menu, reset the state.
      if (nextProps.isVisible && !this.props.isVisible) {
        this.setState({
          outGoingPanelId: undefined,
          currentPanelId: nextProps.initialPanelId,
          transitionDirection: undefined,
          focusedMenuItemIndex: 0
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateHeight();
      this.updateFocusedMenuItem();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // Make sure we don't steal focus while the ContextMenu is closed.
      if (!this.props.isVisible) {
        return;
      }

      if (this.state.isTransitioning) {
        this.updateHeight();
      }

      this.updateFocusedMenuItem();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.resetTransitionTimeout);
    }
  }, {
    key: 'renderPanel',
    value: function renderPanel(panelId, transitionType) {
      var _this3 = this;

      var panel = this.props.idToPanelMap[panelId];

      if (!panel) {
        return;
      }

      var renderItems = function renderItems(items) {
        return items.map(function (item) {
          var onClick = void 0;

          if (item.onClick) {
            onClick = item.onClick;
          } else if (item.panel) {
            onClick = function onClick() {
              // This component is commonly wrapped in a KuiOutsideClickDetector, which means we'll
              // need to wait for that logic to complete before re-rendering the DOM via showPanel.
              window.requestAnimationFrame(_this3.showPanel.bind(_this3, item.panel.id, 'next'));
            };
          }

          return _react2.default.createElement(
            _context_menu_item.KuiContextMenuItem,
            {
              key: item.name,
              icon: item.icon,
              onClick: onClick,
              hasPanel: Boolean(item.panel),
              'data-menu-item': true
            },
            item.name
          );
        });
      };

      // As above, we need to wait for KuiOutsideClickDetector to complete its logic before
      // re-rendering via showPanel.
      var onClose = void 0;
      if (this.hasPreviousPanel(panelId)) {
        onClose = function onClose() {
          return window.requestAnimationFrame(_this3.showPreviousPanel);
        };
      }

      return _react2.default.createElement(
        _context_menu_panel.KuiContextMenuPanel,
        {
          panelRef: function panelRef(node) {
            if (transitionType === 'in') {
              _this3.currentPanel = node;
            }
          },
          title: panel.title,
          onClose: onClose,
          transitionType: transitionType,
          transitionDirection: this.state.transitionDirection
        },
        panel.content || renderItems(panel.items)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          idToPanelMap = _props.idToPanelMap,
          idToPreviousPanelIdMap = _props.idToPreviousPanelIdMap,
          className = _props.className,
          initialPanelId = _props.initialPanelId,
          isVisible = _props.isVisible,
          rest = _objectWithoutProperties(_props, ['idToPanelMap', 'idToPreviousPanelIdMap', 'className', 'initialPanelId', 'isVisible']);

      var currentPanel = this.renderPanel(this.state.currentPanelId, 'in');
      var outGoingPanel = void 0;

      // Hide the out-going panel ASAP, so it can't take focus.
      if (this.state.isTransitioning) {
        outGoingPanel = this.renderPanel(this.state.outGoingPanelId, 'out');
      }

      var classes = (0, _classnames2.default)('kuiContextMenu', className);

      return _react2.default.createElement(
        'div',
        _extends({
          ref: function ref(node) {
            _this4.menu = node;
          },
          className: classes,
          onKeyDown: this.onKeyDown
        }, rest),
        outGoingPanel,
        currentPanel
      );
    }
  }]);

  return KuiContextMenu;
}(_react.Component);

KuiContextMenu.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  initialPanelId: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  isVisible: _propTypes2.default.bool.isRequired,
  idToPanelMap: _propTypes2.default.object,
  idToPreviousPanelIdMap: _propTypes2.default.object
};
KuiContextMenu.defaultProps = {
  idToPanelMap: {},
  idToPreviousPanelIdMap: {},
  isVisible: true
};