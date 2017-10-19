'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _bottom_bar = require('./bottom_bar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiBottomBar', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_bottom_bar.KuiBottomBar, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });
});
//# sourceMappingURL=bottom_bar.test.js.map