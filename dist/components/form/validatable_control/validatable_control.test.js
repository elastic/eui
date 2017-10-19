'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _validatable_control = require('./validatable_control');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiValidatableControl', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(
      _validatable_control.KuiValidatableControl,
      null,
      _react2.default.createElement('input', null)
    ));

    expect(component).toMatchSnapshot();
  });
});