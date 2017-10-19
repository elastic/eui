'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiSideNavTitle = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var KuiSideNavTitle = function KuiSideNavTitle(_ref) {
  var children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['children', 'className']);

  var classes = (0, _classnames2.default)('kuiSideNavTitle', className);

  return _react2.default.createElement(
    _.KuiTitle,
    _extends({
      size: 'small',
      className: classes
    }, rest),
    _react2.default.createElement(
      'p',
      null,
      children
    )
  );
};

exports.KuiSideNavTitle = KuiSideNavTitle;
KuiSideNavTitle.propTypes = {};