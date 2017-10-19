'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiSideNav = exports.TYPES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var typeToClassNameMap = {
  inPanel: 'kuiSideNav--inPanel'
};

var TYPES = exports.TYPES = Object.keys(typeToClassNameMap);

var KuiSideNav = function KuiSideNav(_ref) {
  var children = _ref.children,
      type = _ref.type,
      toggleOpenOnMobile = _ref.toggleOpenOnMobile,
      isOpenOnMobile = _ref.isOpenOnMobile,
      mobileTitle = _ref.mobileTitle,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['children', 'type', 'toggleOpenOnMobile', 'isOpenOnMobile', 'mobileTitle', 'className']);

  var classes = (0, _classnames2.default)('kuiSideNav', className, typeToClassNameMap[type], {
    'kuiSideNav-isOpenMobile': isOpenOnMobile
  });

  return _react2.default.createElement(
    'nav',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement(
      'button',
      {
        className: 'kuiSideNav__mobileToggle kuiLink',
        onClick: toggleOpenOnMobile
      },
      _react2.default.createElement(
        'span',
        { className: 'kuiSideNav__mobileWrap' },
        _react2.default.createElement(
          'span',
          { className: 'kuiSideNav__mobileTitle' },
          mobileTitle
        ),
        _react2.default.createElement(_.KuiIcon, {
          className: 'kuiSideNav__mobileIcon',
          type: 'apps',
          size: 'medium',
          'aria-hidden': 'true'
        })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'kuiSideNav__content' },
      children
    )
  );
};

exports.KuiSideNav = KuiSideNav;
KuiSideNav.propTypes = {
  toggleOpenOnMobile: _propTypes2.default.func,
  isOpenOnMobile: _propTypes2.default.bool,
  type: _propTypes2.default.oneOf(TYPES),
  mobileTitle: _propTypes2.default.string
};
//# sourceMappingURL=side_nav.js.map