'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _form_row = require('./form_row');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiFormRow', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(
      _form_row.KuiFormRow,
      _required_props.requiredProps,
      _react2.default.createElement('input', null)
    ));

    expect(component).toMatchSnapshot();
  });
});
//# sourceMappingURL=form_row.test.js.map