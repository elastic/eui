'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _button_empty = require('./button_empty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiButtonEmpty', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_button_empty.KuiButtonEmpty, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });
});
//# sourceMappingURL=button_empty.test.js.map