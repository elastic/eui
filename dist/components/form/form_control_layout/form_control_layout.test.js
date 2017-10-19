'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _form_control_layout = require('./form_control_layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiFormControlLayout', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(
      _form_control_layout.KuiFormControlLayout,
      null,
      _react2.default.createElement('input', null)
    ));

    expect(component).toMatchSnapshot();
  });
});