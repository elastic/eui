'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _checkbox_group = require('./checkbox_group');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiCheckboxGroup', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_checkbox_group.KuiCheckboxGroup, _extends({ onChange: function onChange() {} }, _required_props.requiredProps)));

    expect(component).toMatchSnapshot();
  });
});