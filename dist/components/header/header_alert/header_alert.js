'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiHeaderAlert = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require('../..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var KuiHeaderAlert = function KuiHeaderAlert(_ref) {
  var action = _ref.action,
      className = _ref.className,
      date = _ref.date,
      text = _ref.text,
      title = _ref.title,
      rest = _objectWithoutProperties(_ref, ['action', 'className', 'date', 'text', 'title']);

  var classes = (0, _classnames2.default)('kuiHeaderAlert', className);

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement(_.KuiButtonIcon, { iconType: 'cross', size: 'small', className: 'kuiHeaderAlert__dismiss' }),
    _react2.default.createElement(
      'p',
      { className: 'kuiHeaderAlert__title' },
      title
    ),
    _react2.default.createElement(
      'p',
      { className: 'kuiHeaderAlert__text' },
      text
    ),
    _react2.default.createElement(
      _.KuiFlexGroup,
      { justifyContent: 'spaceBetween' },
      _react2.default.createElement(
        _.KuiFlexItem,
        { grow: false },
        _react2.default.createElement(
          'div',
          { className: 'kuiHeaderAlert__action kuiLink' },
          action
        )
      ),
      _react2.default.createElement(
        _.KuiFlexItem,
        { grow: false },
        _react2.default.createElement(
          'div',
          { className: 'kuiHeaderAlert__date' },
          date
        )
      )
    )
  );
};

exports.KuiHeaderAlert = KuiHeaderAlert;
KuiHeaderAlert.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  date: _propTypes2.default.string.isRequired,
  text: _propTypes2.default.string,
  title: _propTypes2.default.string.isRequired
};
//# sourceMappingURL=header_alert.js.map