'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _header_logo = require('./header_logo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiHeaderLogo', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_header_logo.KuiHeaderLogo, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });

  test('renders href', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_header_logo.KuiHeaderLogo, { href: '#' }));

    expect(component).toMatchSnapshot();
  });
});
//# sourceMappingURL=header_logo.test.js.map