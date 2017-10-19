'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _text_area = require('./text_area');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiTextArea', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_text_area.KuiTextArea, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });
});
//# sourceMappingURL=text_area.test.js.map