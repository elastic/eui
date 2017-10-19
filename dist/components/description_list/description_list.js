'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiDescriptionList = exports.ALIGNMENTS = exports.TYPES = undefined;

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

var typesToClassNameMap = {
  row: 'kuiDescriptionList--row',
  column: 'kuiDescriptionList--column',
  inline: 'kuiDescriptionList--inline'
};

var TYPES = exports.TYPES = Object.keys(typesToClassNameMap);

var alignmentsToClassNameMap = {
  center: 'kuiDescriptionList--center',
  left: ''
};

var ALIGNMENTS = exports.ALIGNMENTS = Object.keys(alignmentsToClassNameMap);

var KuiDescriptionList = function KuiDescriptionList(_ref) {
  var children = _ref.children,
      className = _ref.className,
      listItems = _ref.listItems,
      align = _ref.align,
      compressed = _ref.compressed,
      type = _ref.type,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'listItems', 'align', 'compressed', 'type']);

  var classes = (0, _classnames2.default)('kuiDescriptionList', typesToClassNameMap[type], alignmentsToClassNameMap[align], {
    'kuiDescriptionList--compressed': compressed
  }, className);

  var childrenOrListItems = null;
  if (listItems) {
    childrenOrListItems = listItems.map(function (item) {
      return [_react2.default.createElement(
        _.KuiDescriptionListTitle,
        null,
        item.title
      ), _react2.default.createElement(
        _.KuiDescriptionListDescription,
        null,
        item.description
      )];
    });
  } else {
    childrenOrListItems = children;
  }

  return _react2.default.createElement(
    'dl',
    _extends({
      className: classes
    }, rest),
    childrenOrListItems
  );
};

exports.KuiDescriptionList = KuiDescriptionList;
KuiDescriptionList.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  compressed: _propTypes2.default.bool,
  type: _propTypes2.default.oneOf(TYPES),
  align: _propTypes2.default.oneOf(ALIGNMENTS)
};

KuiDescriptionList.defaultProps = {
  type: 'row',
  align: 'left',
  compressed: false
};